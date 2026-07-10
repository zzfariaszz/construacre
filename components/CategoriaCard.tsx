'use client'

import Link from 'next/link'
import styled from 'styled-components'
import type { LucideIcon } from 'lucide-react'

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`

const IconCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primaryDark};
  transition: transform 0.2s ease;

  ${Card}:hover & {
    transform: scale(1.06);
  }

  @media (max-width: 600px) {
    width: 52px;
    height: 52px;
  }
`

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`

type CategoriaCardProps = {
  icone: LucideIcon
  nome: string
  slug: string
}

export default function CategoriaCard({ icone: Icone, nome, slug }: CategoriaCardProps) {
  return (
    <Card href={`/produtos/${slug}`}>
      <IconCircle>
        <Icone size={26} strokeWidth={1.8} />
      </IconCircle>
      <Label>{nome}</Label>
    </Card>
  )
}