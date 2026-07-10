'use client'

import styled from 'styled-components'
import { User, MessageCircle } from 'lucide-react'

const PageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 6px;
`

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 32px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
`

const VendedorLink = styled.a`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`

const FotoWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  transition: transform 0.2s ease;

  ${VendedorLink}:hover & {
    transform: scale(1.03);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
    
`

const WhatsBadge = styled.div`
  position: absolute;
  bottom: 6px;
  right: 6px;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.whatsapp};
  display: flex;
  align-items: center;
  justify-content: center;
`

const Nome = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 8px;
  text-align: center;
`

type Vendedor = {
  id: number
  nome: string
  foto_url: string | null
  whatsapp: string
}

export default function EquipeGrid({ vendedores }: { vendedores: Vendedor[] }) {
  return (
    <PageWrapper>
      <Title>Fale com nossa equipe</Title>
      <Subtitle>Clique na foto do vendedor para chamar no WhatsApp</Subtitle>

      <Grid>
        {vendedores.map((v) => {
          const link = `https://wa.me/${v.whatsapp}?text=${encodeURIComponent(
            `Olá ${v.nome}! Vim pelo site da Construacre.`
          )}`
          return (
            <VendedorLink key={v.id} href={link} target="_blank" rel="noopener noreferrer">
              <FotoWrapper>
                {v.foto_url ? <img src={v.foto_url} alt={v.nome} /> : <User size={32} />}
                <WhatsBadge>
                  <MessageCircle size={14} color="#ffffff" fill="#ffffff" />
                </WhatsBadge>
              </FotoWrapper>
              <Nome>{v.nome}</Nome>
            </VendedorLink>
          )
        })}
      </Grid>
    </PageWrapper>
  )
}