import { sql } from '@vercel/postgres'

export type Categoria = {
  id: number
  nome: string
  slug: string
  icone: string
}

export async function getCategorias(): Promise<Categoria[]> {
  const { rows } = await sql<Categoria>`
    SELECT id, nome, slug, icone FROM categorias ORDER BY nome ASC
  `
  return rows
}

export async function criarCategoria(nome: string, slug: string, icone: string) {
  const { rows } = await sql<Categoria>`
    INSERT INTO categorias (nome, slug, icone)
    VALUES (${nome}, ${slug}, ${icone})
    RETURNING id, nome, slug, icone
  `
  return rows[0]
}

export async function excluirCategoria(id: number) {
  await sql`DELETE FROM categorias WHERE id = ${id}`
}