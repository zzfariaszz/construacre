export const dynamic = 'force-dynamic'

import { getProdutos } from '@/lib/db/produtos'
import FavoritosConteudo from '@/components/FavoritosConteudo'

export default async function FavoritosPage() {
  const produtos = await getProdutos()
  return <FavoritosConteudo produtos={produtos} />
}