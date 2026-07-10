import { sql } from '@vercel/postgres'

export type Vendedor = {
  id: number
  nome: string
  foto_url: string | null
  whatsapp: string
}

export async function getVendedores(): Promise<Vendedor[]> {
  const { rows } = await sql<Vendedor>`
    SELECT id, nome, foto_url, whatsapp FROM vendedores ORDER BY nome ASC
  `
  return rows
}

type NovoVendedor = {
  nome: string
  whatsapp: string
  fotoUrl?: string
}

export async function criarVendedor(dados: NovoVendedor) {
  const { rows } = await sql<Vendedor>`
    INSERT INTO vendedores (nome, whatsapp, foto_url)
    VALUES (${dados.nome}, ${dados.whatsapp}, ${dados.fotoUrl ?? null})
    RETURNING *
  `
  return rows[0]
}

export async function excluirVendedor(id: number) {
  await sql`DELETE FROM vendedores WHERE id = ${id}`
}