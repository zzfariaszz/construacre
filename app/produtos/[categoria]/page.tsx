export const dynamic = 'force-dynamic'

import { getProdutos } from '@/lib/db/produtos'
import { getCategorias } from '@/lib/db/categorias'
import ProdutosListagem from '@/components/ProdutosListagem'
import TintaCTA from '@/components/TintaCTA'

type PageProps = {
  params: Promise<{ categoria: string }>
}

export default async function ProdutosCategoriaPage({ params }: PageProps) {
  const { categoria } = await params
  const [produtos, categorias] = await Promise.all([getProdutos(), getCategorias()])

  return (
    <ProdutosListagem
      produtosIniciais={produtos}
      categorias={categorias}
      categoriaSelecionadaInicial={categoria}
      banner={categoria === 'tintas' ? <TintaCTA /> : undefined}
    />
  )
}