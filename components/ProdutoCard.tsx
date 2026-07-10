'use client'

import styled from 'styled-components'
import { Heart, ImageOff, Check, Clock } from 'lucide-react'

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 12px;
  background: #ffffff;
  position: relative;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  }
`

const CodigoBadge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 4px;
  z-index: 2;
`

const FavButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  display: flex;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: #dc2626;
  }
`

const ImagemWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 24px 0 10px;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Nome = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px;
`

const Disponibilidade = styled.span<{ $disponivel: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  background: ${({ theme, $disponivel }) =>
    $disponivel ? theme.colors.successBg : theme.colors.warningBg};
  color: ${({ theme, $disponivel }) =>
    $disponivel ? theme.colors.success : theme.colors.warning};
`

export type Produto = {
  id: number
  codigoInterno: string
  nome: string
  categoria: string
  fotoUrl?: string
  disponivel: boolean
}

type ProdutoCardProps = {
  produto: Produto
  favorito: boolean
  onToggleFavorito: (id: number) => void
}

export default function ProdutoCard({ produto, favorito, onToggleFavorito }: ProdutoCardProps) {
  return (
    <Card>
      <CodigoBadge>COD {produto.codigoInterno}</CodigoBadge>

      <FavButton onClick={() => onToggleFavorito(produto.id)} aria-label="Favoritar produto">
        <Heart size={18} fill={favorito ? '#dc2626' : 'none'} color={favorito ? '#dc2626' : 'currentColor'} />
      </FavButton>

      <ImagemWrapper>
        {produto.fotoUrl ? (
          <img src={produto.fotoUrl} alt={produto.nome} loading="lazy" />
        ) : (
          <ImageOff size={28} strokeWidth={1.5} />
        )}
      </ImagemWrapper>

      <Nome>{produto.nome}</Nome>
      <Disponibilidade $disponivel={produto.disponivel}>
        {produto.disponivel ? <Check size={12} /> : <Clock size={12} />}
        {produto.disponivel ? 'Disponível' : 'Sob consulta'}
      </Disponibilidade>
    </Card>
  )
}