'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { Heart } from 'lucide-react'
import { useFavoritos } from '@/lib/favoritos/FavoritosContext'

const Wrapper = styled(Link)`
  position: relative;
  display: flex;
  color: #ffffff;
`

const Badge = styled.span`
  position: absolute;
  top: -6px;
  right: -8px;
  background: #dc2626;
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 10px;
  font-weight: 600;
  min-width: 16px;
  height: 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
`

export default function FavoritosButton() {
  const { totalFavoritos } = useFavoritos()

  return (
    <Wrapper href="/favoritos" aria-label="Ver favoritos">
      <Heart size={20} fill={totalFavoritos > 0 ? '#ffffff' : 'none'} />
      {totalFavoritos > 0 && <Badge>{totalFavoritos}</Badge>}
    </Wrapper>
  )
}