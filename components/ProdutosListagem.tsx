'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import BuscaProdutos from '@/components/BuscaProdutos'
import CategoriaFiltro from '@/components/CategoriaFiltro'
import ProdutoCard, { Produto as ProdutoCardType } from '@/components/ProdutoCard'
import type { Produto as ProdutoDB } from '@/lib/db/produtos'

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 20px;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`

const VazioMsg = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 40px 0;
`

type Categoria = {
  id: number
  nome: string
  slug: string
}

type ProdutosListagemProps = {
  produtosIniciais: ProdutoDB[]
  categorias: Categoria[]
  categoriaSelecionadaInicial?: string | null
  banner?: React.ReactNode
}

export default function ProdutosListagem({
  produtosIniciais,
  categorias,
  categoriaSelecionadaInicial = null,
  banner,
}: ProdutosListagemProps) {
  const router = useRouter()
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(categoriaSelecionadaInicial)
  const [resultadosBusca, setResultadosBusca] = useState<ProdutoDB[] | null>(null)

  const tituloExibido = useMemo(() => {
    if (!categoriaAtiva) return 'Nossos Produtos'
    const cat = categorias.find((c) => c.slug === categoriaAtiva)
    return cat?.nome ?? 'Produtos'
  }, [categoriaAtiva, categorias])

  const handleSelecionarCategoria = (slug: string | null) => {
    setCategoriaAtiva(slug)
    router.push(slug ? `/produtos/${slug}` : '/produtos', { scroll: false })
  }

  const handleBuscar = async (termo: string) => {
    if (!termo.trim()) {
      setResultadosBusca(null)
      return
    }
    const res = await fetch(`/api/produtos/buscar?q=${encodeURIComponent(termo)}`)
    const data = await res.json()
    setResultadosBusca(data)
  }

  const produtosFiltrados = useMemo(() => {
    const base = resultadosBusca ?? produtosIniciais
    if (!categoriaAtiva) return base
    return base.filter((p) => p.categoria_slug === categoriaAtiva)
  }, [resultadosBusca, produtosIniciais, categoriaAtiva])

  return (
    <PageWrapper>
      <Title>{tituloExibido}</Title>
      {banner}

      <TopBar>
        <BuscaProdutos onBuscar={handleBuscar} />
      </TopBar>

      <CategoriaFiltro
        categorias={categorias}
        categoriaAtiva={categoriaAtiva}
        onSelecionar={handleSelecionarCategoria}
      />

      {produtosFiltrados.length === 0 ? (
        <VazioMsg>Nenhum produto encontrado.</VazioMsg>
      ) : (
        <Grid>
          {produtosFiltrados.map((produto) => {
            const produtoFormatado: ProdutoCardType = {
              id: produto.id,
              codigoInterno: produto.codigo_interno,
              nome: produto.nome,
              categoria: produto.categoria_slug ?? '',
              fotoUrl: produto.foto_url ?? undefined,
              marca: produto.marca,
              status: produto.status,
              unidade: produto.unidade,
            }
            return <ProdutoCard key={produto.id} produto={produtoFormatado} />
          })}
        </Grid>
      )}
    </PageWrapper>
  )
}