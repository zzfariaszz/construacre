import { NextRequest, NextResponse } from 'next/server'
import { excluirProduto } from '@/lib/db/produtos'
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