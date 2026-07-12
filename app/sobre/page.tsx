export const dynamic = 'force-dynamic'

import { getFotosGaleria } from '@/lib/db/galeria'
import SobreConteudo from '@/components/SobreConteudo'

export default async function SobrePage() {
  const fotos = await getFotosGaleria()

  return <SobreConteudo fotos={fotos} />
}