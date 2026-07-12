import { MetadataRoute } from 'next'
import { getCategorias } from '@/lib/db/categorias'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://construacre.vercel.app'
  const categorias = await getCategorias()

  const paginasFixas: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/produtos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/equipe`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/sobre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contato`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const paginasCategorias: MetadataRoute.Sitemap = categorias.map((cat) => ({
    url: `${baseUrl}/produtos/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...paginasFixas, ...paginasCategorias]
}