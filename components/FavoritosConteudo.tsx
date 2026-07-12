'use client'

import styled from 'styled-components'
import ProdutoCard, { Produto as ProdutoCardType } from '@/components/ProdutoCard'
import { useFavoritos } from '@/lib/favoritos/FavoritosContext'
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
  padding: 60px 0;
`

export default function FavoritosConteudo({ produtos }: { produtos: ProdutoDB[] }) {
  const { favoritos } = useFavoritos()
  const produtosFavoritados = produtos.filter((p) => favoritos.includes(p.id))

  return (
    <PageWrapper>
      <Title>Meus favoritos</Title>

      {produtosFavoritados.length === 0 ? (
        <VazioMsg>Você ainda não favoritou nenhum produto.</VazioMsg>
      ) : (
        <Grid>
          {produtosFavoritados.map((produto) => {
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