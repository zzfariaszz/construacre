import { sql } from '@vercel/postgres'

export type Produto = {
  id: number
  codigo_interno: string
  nome: string
  categoria_id: number | null
  categoria_nome?: string
  categoria_slug?: string
  foto_url: string | null
  destaque: boolean
  disponivel: boolean
}

export async function getProdutos(): Promise<Produto[]> {
  const { rows } = await sql<Produto>`
    SELECT p.*, c.nome as categoria_nome, c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    ORDER BY p.criado_em DESC
  `
  return rows
}

export async function getProdutosDestaque(): Promise<Produto[]> {
  const { rows } = await sql<Produto>`
    SELECT p.*, c.nome as categoria_nome, c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.destaque = true
    ORDER BY p.criado_em DESC
    LIMIT 8
  `
  return rows
}

export async function getProdutosPorCategoria(slug: string): Promise<Produto[]> {
  const { rows } = await sql<Produto>`
    SELECT p.*, c.nome as categoria_nome, c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE c.slug = ${slug}
    ORDER BY p.criado_em DESC
  `
  return rows
}

type NovoProduto = {
  codigoInterno: string
  nome: string
  categoriaId: number
  fotoUrl?: string
  destaque?: boolean
  disponivel?: boolean
}

export async function criarProduto(dados: NovoProduto) {
  const { rows } = await sql<Produto>`
    INSERT INTO produtos (codigo_interno, nome, categoria_id, foto_url, destaque, disponivel)
    VALUES (
      ${dados.codigoInterno},
      ${dados.nome},
      ${dados.categoriaId},
      ${dados.fotoUrl ?? null},
      ${dados.destaque ?? false},
      ${dados.disponivel ?? true}
    )
    RETURNING *
  `
  return rows[0]
}

export async function excluirProduto(id: number) {
  await sql`DELETE FROM produtos WHERE id = ${id}`
}

export async function buscarProdutos(termo: string): Promise<Produto[]> {
  const { rows } = await sql<Produto>`
    SELECT p.*, c.nome as categoria_nome, c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.nome ILIKE ${'%' + termo + '%'}
    ORDER BY p.criado_em DESC
  `
  return rows
}