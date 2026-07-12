export const dynamic = 'force-dynamic'

import { sql } from '@vercel/postgres'
import { getCategorias } from '@/lib/db/categorias'
import { getProdutosDestaque } from '@/lib/db/produtos'
import HomeHero from '@/components/HomeHero'

async function getCatalogoAtual() {
  const { rows } = await sql`
    SELECT arquivo_url FROM catalogo ORDER BY atualizado_em DESC LIMIT 1
  `
  return rows[0]?.arquivo_url as string | undefined
}

export default async function Home() {
  const [categorias, produtosDestaque, catalogoUrl] = await Promise.all([
    getCategorias(),
    getProdutosDestaque(),
    getCatalogoAtual(),
  ])

  return (
    <HomeHero categorias={categorias} produtosDestaque={produtosDestaque} catalogoUrl={catalogoUrl} />
  )
}