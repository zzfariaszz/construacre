'use client'

import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Heart, ImageOff, Check, Clock, Share2 } from 'lucide-react'
import { useCart } from '@/lib/cart/CartContext'

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

const AcoesTopo = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  gap: 6px;
  z-index: 2;
`

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  color: ${({ theme }) => theme.colors.textSecondary};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const FavButton = styled(IconButton)`
  &:hover {
    color: #dc2626;
  }
`

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
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
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const Skeleton = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.primaryLight};
  animation: ${pulse} 1.4s ease-in-out infinite;
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

const AdicionarButton = styled.button`
  width: 100%;
  margin-top: 8px;
  padding: 6px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  border: none;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 11px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }
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
  const { adicionarItem } = useCart()
  const [carregada, setCarregada] = useState(false)

  const handleCompartilhar = () => {
    const texto = `Olá! Tenho interesse neste produto:\n\n*${produto.nome}*\nCódigo: ${produto.codigoInterno}\n\nGostaria de saber mais informações.`
    const link = `https://wa.me/5568999238467?text=${encodeURIComponent(texto)}`
    window.open(link, '_blank')
  }

  return (
    <Card>
      <CodigoBadge>COD {produto.codigoInterno}</CodigoBadge>

      <AcoesTopo>
        <IconButton onClick={handleCompartilhar} aria-label="Compartilhar no WhatsApp">
          <Share2 size={16} />
        </IconButton>
        <FavButton onClick={() => onToggleFavorito(produto.id)} aria-label="Favoritar produto">
          <Heart size={18} fill={favorito ? '#dc2626' : 'none'} color={favorito ? '#dc2626' : 'currentColor'} />
        </FavButton>
      </AcoesTopo>

      <ImagemWrapper>
        {produto.fotoUrl ? (
          <>
            {!carregada && <Skeleton />}
            <img
              src={produto.fotoUrl}
              alt={produto.nome}
              loading="lazy"
              onLoad={() => setCarregada(true)}
              style={{ opacity: carregada ? 1 : 0, transition: 'opacity 0.3s ease' }}
            />
          </>
        ) : (
          <ImageOff size={28} strokeWidth={1.5} />
        )}
      </ImagemWrapper>

      <Nome>{produto.nome}</Nome>
      <Disponibilidade $disponivel={produto.disponivel}>
        {produto.disponivel ? <Check size={12} /> : <Clock size={12} />}
        {produto.disponivel ? 'Disponível' : 'Sob consulta'}
      </Disponibilidade>

      <AdicionarButton
        onClick={() =>
          adicionarItem({
            id: produto.id,
            codigoInterno: produto.codigoInterno,
            nome: produto.nome,
            fotoUrl: produto.fotoUrl,
          })
        }
      >
        Adicionar ao orçamento
      </AdicionarButton>
    </Card>
  )
}