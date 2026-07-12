'use client'

import styled from 'styled-components'
import { Palette } from 'lucide-react'

const Banner = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
  }
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #ffffff;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const Texto = styled.div`
  flex: 1;
  min-width: 200px;
`

const Titulo = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 4px;
`

const Descricao = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const CTAButton = styled.a`
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 13px;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

export default function TintaCTA() {
  const link = `https://wa.me/5568999238467?text=${encodeURIComponent(
    'Olá! Não encontrei a cor que eu queria no site e gostaria de fazer uma cor personalizada na máquina de tintas.'
  )}`

  return (
    <Banner>
      <IconWrapper>
        <Palette size={22} />
      </IconWrapper>
      <Texto>
        <Titulo>Não encontrou a cor que deseja?</Titulo>
        <Descricao>
          Fale com nosso especialista e faça sua cor personalizada na nossa máquina de tintas.
        </Descricao>
      </Texto>
      <CTAButton href={link} target="_blank" rel="noopener noreferrer">
        Falar com especialista
      </CTAButton>
    </Banner>
  )
}