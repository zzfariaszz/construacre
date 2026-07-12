export const dynamic = 'force-dynamic'

import { getProdutos } from '@/lib/db/produtos'
import { getCategorias } from '@/lib/db/categorias'
import ProdutosListagem from '@/components/ProdutosListagem'

export default async function ProdutosPage() {
  const [produtos, categorias] = await Promise.all([getProdutos(), getCategorias()])

  return (
    <ProdutosListagem titulo="Nossos Produtos" produtosIniciais={produtos} categorias={categorias} />
  )
}