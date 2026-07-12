import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { verificarSessao } from '@/lib/auth'

export async function GET() {
  try {
    const { rows } = await sql`
      SELECT arquivo_url, atualizado_em FROM catalogo ORDER BY atualizado_em DESC LIMIT 1
    `
    return NextResponse.json(rows[0] ?? null)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar catálogo' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { arquivoUrl } = await request.json()

    if (!arquivoUrl) {
      return NextResponse.json({ error: 'URL do arquivo é obrigatória' }, { status: 400 })
    }

    await sql`DELETE FROM catalogo`
    const { rows } = await sql`
      INSERT INTO catalogo (arquivo_url)
      VALUES (${arquivoUrl})
      RETURNING *
    `

    return NextResponse.json(rows[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao salvar catálogo' }, { status: 500 })
  }
}