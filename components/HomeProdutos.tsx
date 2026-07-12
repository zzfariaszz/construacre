'use client'

import { useState } from 'react'
import styled from 'styled-components'
import ProdutoCard, { Produto as ProdutoCardType } from '@/components/ProdutoCard'

const ProdutosGrid = styled.div`
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

type ProdutoDB = {
  id: number
  codigo_interno: string
  nome: string
  foto_url: string | null
  disponivel: boolean
}

export default function HomeProdutos({ produtos }: { produtos: ProdutoDB[] }) {
  const [favoritos, setFavoritos] = useState<number[]>([])

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
  }

  if (produtos.length === 0) {
    return null
  }

  return (
    <ProdutosGrid>
      {produtos.map((produto) => {
        const produtoFormatado: ProdutoCardType = {
          id: produto.id,
          codigoInterno: produto.codigo_interno,
          nome: produto.nome,
          categoria: '',
          fotoUrl: produto.foto_url ?? undefined,
          disponivel: produto.disponivel,
        }

        return (
          <ProdutoCard
            key={produto.id}
            produto={produtoFormatado}
            favorito={favoritos.includes(produto.id)}
            onToggleFavorito={toggleFavorito}
          />
        )
      })}
    </ProdutosGrid>
  )
}