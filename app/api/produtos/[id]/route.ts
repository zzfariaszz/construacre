import { NextRequest, NextResponse } from 'next/server'
import { excluirProduto, editarProduto } from '@/lib/db/produtos'
import { verificarSessao } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = await params

  try {
    await excluirProduto(Number(id))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao excluir produto' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const { id } = await params

  try {
    const dados = await request.json()

    if (!dados.codigoInterno || !dados.nome || !dados.categoriaId) {
      return NextResponse.json(
        { error: 'Código, nome e categoria são obrigatórios' },
        { status: 400 }
      )
    }

    const produto = await editarProduto(Number(id), dados)
    return NextResponse.json(produto)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao editar produto' }, { status: 500 })
  }
}