import { sql } from '@vercel/postgres'

export type FotoGaleria = {
  id: number
  foto_url: string
}

export async function getFotosGaleria(): Promise<FotoGaleria[]> {
  const { rows } = await sql<FotoGaleria>`
    SELECT id, foto_url FROM galeria_loja ORDER BY criado_em DESC
  `
  return rows
}

export async function criarFotoGaleria(fotoUrl: string) {
  const { rows } = await sql<FotoGaleria>`
    INSERT INTO galeria_loja (foto_url)
    VALUES (${fotoUrl})
    RETURNING *
  `
  return rows[0]
}

export async function excluirFotoGaleria(id: number) {
  await sql`DELETE FROM galeria_loja WHERE id = ${id}`
}