import { getProdutosPorCategoria } from '@/lib/db/produtos'
import { getCategorias } from '@/lib/db/categorias'
import ProdutosListagem from '@/components/ProdutosListagem'
import TintaCTA from '@/components/TintaCTA'

type PageProps = {
  params: Promise<{ categoria: string }>
}

export default async function ProdutosCategoriaPage({ params }: PageProps) {
  const { categoria } = await params
  const [produtos, categorias] = await Promise.all([
    getProdutosPorCategoria(categoria),
    getCategorias(),
  ])

  const categoriaAtual = categorias.find((c) => c.slug === categoria)

  return (
    <ProdutosListagem
      titulo={categoriaAtual?.nome ?? 'Produtos'}
      produtosIniciais={produtos}
      categorias={categorias}
      categoriaSelecionadaInicial={categoria}
      banner={categoria === 'tintas' ? <TintaCTA /> : undefined}
    />
  )
}