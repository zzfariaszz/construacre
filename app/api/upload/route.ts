import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { verificarSessao } from '@/lib/auth'

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
const TAMANHO_MAXIMO = 10 * 1024 * 1024 

export async function POST(request: NextRequest) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('arquivo') as File | null

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
    }

    if (!TIPOS_PERMITIDOS.includes(file.type)) {
      return NextResponse.json(
        { error: 'Formato não permitido. Use JPG, PNG, WebP ou PDF.' },
        { status: 400 }
      )
    }

    if (file.size > TAMANHO_MAXIMO) {
      return NextResponse.json({ error: 'Arquivo muito grande (máx 10MB).' }, { status: 400 })
    }

    const nomeUnico = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
    const blob = await put(nomeUnico, file, { access: 'public' })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao subir arquivo' }, { status: 500 })
  }
}