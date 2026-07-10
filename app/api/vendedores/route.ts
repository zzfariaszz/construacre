import { NextRequest, NextResponse } from 'next/server'
import { getVendedores, criarVendedor } from '@/lib/db/vendedores'
import { verificarSessao } from '@/lib/auth'

export async function GET() {
  try {
    const vendedores = await getVendedores()
    return NextResponse.json(vendedores)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar vendedores' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const dados = await request.json()

    if (!dados.nome || !dados.whatsapp) {
      return NextResponse.json({ error: 'Nome e WhatsApp são obrigatórios' }, { status: 400 })
    }

    const vendedor = await criarVendedor(dados)
    return NextResponse.json(vendedor, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar vendedor' }, { status: 500 })
  }
}