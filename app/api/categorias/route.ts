import { NextRequest, NextResponse } from 'next/server'
import { getCategorias, criarCategoria } from '@/lib/db/categorias'
import { verificarSessao } from '@/lib/auth'

export async function GET() {
  try {
    const categorias = await getCategorias()
    return NextResponse.json(categorias)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar categorias' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { nome, icone } = await request.json()

    if (!nome || !icone) {
      return NextResponse.json({ error: 'Nome e ícone são obrigatórios' }, { status: 400 })
    }

    const slug = nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') 
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const categoria = await criarCategoria(nome, slug, icone)
    return NextResponse.json(categoria, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar categoria' }, { status: 500 })
  }
}