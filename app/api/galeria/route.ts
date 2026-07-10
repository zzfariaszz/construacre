import { NextRequest, NextResponse } from 'next/server'
import { getFotosGaleria, criarFotoGaleria } from '@/lib/db/galeria'
import { verificarSessao } from '@/lib/auth'

export async function GET() {
  try {
    const fotos = await getFotosGaleria()
    return NextResponse.json(fotos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao buscar fotos' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const autorizado = await verificarSessao(request)
  if (!autorizado) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  try {
    const { fotoUrl } = await request.json()

    if (!fotoUrl) {
      return NextResponse.json({ error: 'URL da foto é obrigatória' }, { status: 400 })
    }

    const foto = await criarFotoGaleria(fotoUrl)
    return NextResponse.json(foto, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar foto' }, { status: 500 })
  }
}