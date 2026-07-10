import { NextRequest, NextResponse } from 'next/server'
import { verificarSenha, criarToken, SESSION_COOKIE_NAME } from '@/lib/auth'

// Controle simples de tentativas
const tentativas = new Map<string, { count: number; bloqueadoAte: number }>()
const LIMITE_TENTATIVAS = 5
const BLOQUEIO_MS = 15 * 60 * 1000 

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'local'
  const agora = Date.now()
  const registro = tentativas.get(ip)

  if (registro && registro.count >= LIMITE_TENTATIVAS && agora < registro.bloqueadoAte) {
    const minutosRestantes = Math.ceil((registro.bloqueadoAte - agora) / 60000)
    return NextResponse.json(
      { error: `Muitas tentativas. Tente novamente em ${minutosRestantes} min.` },
      { status: 429 }
    )
  }

  const { senha } = await request.json()
  const senhaCorreta = await verificarSenha(senha)
  if (!senhaCorreta) {
    const atual = tentativas.get(ip) ?? { count: 0, bloqueadoAte: 0 }
    atual.count += 1
    if (atual.count >= LIMITE_TENTATIVAS) {
      atual.bloqueadoAte = agora + BLOQUEIO_MS
    }
    tentativas.set(ip, atual)
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  tentativas.delete(ip)
  const token = criarToken()

  const response = NextResponse.json({ success: true })
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 8, // 8 horas
    path: '/',
  })

  return response
}