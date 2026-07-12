import { sql } from '@vercel/postgres'

export type StatusProduto = 'disponivel' | 'indisponivel' | 'aguardando_estoque'
export type UnidadeProduto = 'unidade' | 'caixa' | 'metro' | 'kg'

export const UNIDADE_ABREVIACAO: Record<UnidadeProduto, string> = {
  unidade: 'uni',
  caixa: 'cx',
  metro: 'met',
  kg: 'kg',
}

export const STATUS_LABEL: Record<StatusProduto, string> = {
  disponivel: 'Disponível',
  indisponivel: 'Indisponível',
  aguardando_estoque: 'Aguardando estoque',
}

export type Produto = {
  id: number
  codigo_interno: string
  nome: string
  categoria_id: number | null
  categoria_nome?: string
  categoria_slug?: string
  foto_url: string | null
  destaque: boolean
  status: StatusProduto
  unidade: UnidadeProduto
  marca: string | null
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

export async function buscarProdutos(termo: string): Promise<Produto[]> {
  const { rows } = await sql<Produto>`
    SELECT p.*, c.nome as categoria_nome, c.slug as categoria_slug
    FROM produtos p
    LEFT JOIN categorias c ON p.categoria_id = c.id
    WHERE p.nome ILIKE ${'%' + termo + '%'} OR p.marca ILIKE ${'%' + termo + '%'}
    ORDER BY p.criado_em DESC
  `
  return rows
}

export async function getMarcas(): Promise<string[]> {
  const { rows } = await sql<{ marca: string }>`
    SELECT DISTINCT marca FROM produtos WHERE marca IS NOT NULL AND marca != '' ORDER BY marca ASC
  `
  return rows.map((r) => r.marca)
}

type NovoProduto = {
  codigoInterno: string
  nome: string
  categoriaId: number
  fotoUrl?: string
  destaque?: boolean
  status?: StatusProduto
  unidade?: UnidadeProduto
  marca?: string
}

export async function criarProduto(dados: NovoProduto) {
  const { rows } = await sql<Produto>`
    INSERT INTO produtos (codigo_interno, nome, categoria_id, foto_url, destaque, status, unidade, marca)
    VALUES (
      ${dados.codigoInterno},
      ${dados.nome},
      ${dados.categoriaId},
      ${dados.fotoUrl ?? null},
      ${dados.destaque ?? false},
      ${dados.status ?? 'disponivel'},
      ${dados.unidade ?? 'unidade'},
      ${dados.marca ?? null}
    )
    RETURNING *
  `
  return rows[0]
}

type EditarProduto = {
  codigoInterno: string
  nome: string
  categoriaId: number
  fotoUrl?: string
  destaque: boolean
  status: StatusProduto
  unidade: UnidadeProduto
  marca?: string
}

export async function editarProduto(id: number, dados: EditarProduto) {
  const { rows } = await sql<Produto>`
    UPDATE produtos SET
      codigo_interno = ${dados.codigoInterno},
      nome = ${dados.nome},
      categoria_id = ${dados.categoriaId},
      foto_url = ${dados.fotoUrl ?? null},
      destaque = ${dados.destaque},
      status = ${dados.status},
      unidade = ${dados.unidade},
      marca = ${dados.marca ?? null}
    WHERE id = ${id}
    RETURNING *
  `
  return rows[0]
}

export async function excluirProduto(id: number) {
  await sql`DELETE FROM produtos WHERE id = ${id}`
}