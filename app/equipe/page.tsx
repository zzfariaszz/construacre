export const dynamic = 'force-dynamic'

import { getVendedores } from '@/lib/db/vendedores'
import EquipeGrid from '@/components/EquipeGrid'

export default async function EquipePage() {
  const vendedores = await getVendedores()

  return <EquipeGrid vendedores={vendedores} />
}