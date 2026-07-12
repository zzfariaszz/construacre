'use client'

import { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Heart, ImageOff, Check, Clock, XCircle, Share2 } from 'lucide-react'
import { useCart } from '@/lib/cart/CartContext'
import type { StatusProduto, UnidadeProduto } from '@/lib/db/produtos'
import { STATUS_LABEL } from '@/lib/db/produtos'

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

const Marca = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
  margin-bottom: 2px;
`

const Nome = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 6px;
`

const statusColor: Record<StatusProduto, { bg: string; text: string }> = {
  disponivel: { bg: '#EAF3DE', text: '#27500A' },
  aguardando_estoque: { bg: '#FAEEDA', text: '#854F0B' },
  indisponivel: { bg: '#FEE2E2', text: '#991B1B' },
}

const StatusBadge = styled.span<{ $status: StatusProduto }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  padding: 3px 8px;
  border-radius: 4px;
  background: ${({ $status }) => statusColor[$status].bg};
  color: ${({ $status }) => statusColor[$status].text};
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

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

function statusIcone(status: StatusProduto) {
  if (status === 'disponivel') return <Check size={12} />
  if (status === 'aguardando_estoque') return <Clock size={12} />
  return <XCircle size={12} />
}

export type Produto = {
  id: number
  codigoInterno: string
  nome: string
  categoria: string
  fotoUrl?: string
  marca?: string | null
  status: StatusProduto
  unidade: UnidadeProduto
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
    const texto = `Olá! Tenho interesse neste produto:\n\n*${produto.nome}*${
      produto.marca ? `\nMarca: ${produto.marca}` : ''
    }\nCódigo: ${produto.codigoInterno}\n\nGostaria de saber mais informações.`
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

      {produto.marca && <Marca>{produto.marca}</Marca>}
      <Nome>{produto.nome}</Nome>
      <StatusBadge $status={produto.status}>
        {statusIcone(produto.status)}
        {STATUS_LABEL[produto.status]}
      </StatusBadge>

      <AdicionarButton
        disabled={produto.status === 'indisponivel'}
        onClick={() =>
          adicionarItem({
            id: produto.id,
            codigoInterno: produto.codigoInterno,
            nome: produto.nome,
            fotoUrl: produto.fotoUrl,
            marca: produto.marca ?? undefined,
            unidade: produto.unidade,
          })
        }
      >
        {produto.status === 'indisponivel' ? 'Indisponível' : 'Adicionar ao orçamento'}
      </AdicionarButton>
    </Card>
  )
}