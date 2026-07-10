import { NextRequest, NextResponse } from 'next/server'
import { buscarProdutos } from '@/lib/db/produtos'

export async function GET(request: NextRequest) {
  const termo = request.nextUrl.searchParams.get('q') ?? ''

  if (!termo.trim()) {
    return NextResponse.json([])
  }

  try {
    const produtos = await buscarProdutos(termo)
    return NextResponse.json(produtos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro na busca' }, { status: 500 })
  }
}