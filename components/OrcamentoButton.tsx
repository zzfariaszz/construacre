'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { FileText } from 'lucide-react'
import { useCart } from '@/lib/cart/CartContext'

const FloatingButton = styled(Link)`
  position: fixed;
  bottom: 24px;
  left: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 16px;
    left: 16px;
  }
`

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #dc2626;
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  font-weight: 600;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
`

export default function OrcamentoButton() {
  const { totalItens } = useCart()

  if (totalItens === 0) return null

  return (
    <FloatingButton href="/orcamento" aria-label="Ver orcamento">
      <FileText size={24} color="#ffffff" />
      <Badge>{totalItens}</Badge>
    </FloatingButton>
  )
}