import { NextRequest, NextResponse } from 'next/server'
import { getProdutos, criarProduto } from '@/lib/db/produtos'
import { verificarSessao } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const produtos = await getProdutos()
    return NextResponse.json(produtos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const dados = await request.json()

    if (!dados.codigoInterno || !dados.nome || !dados.categoriaId) {
      return NextResponse.json(
        { error: 'Código, nome e categoria são obrigatórios' },
        { status: 400 }
      )
    }

    const produto = await criarProduto(dados)
    return NextResponse.json(produto, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar produto' }, { status: 500 })
  }
}