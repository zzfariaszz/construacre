'use client'

import styled from 'styled-components'
import { Layers, Zap, Droplet, Wrench, DoorOpen, Grid3x3, Package, Paintbrush, Hammer, Ruler } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import HomeProdutos from '@/components/HomeProdutos'

const iconesDisponiveis: Record<string, LucideIcon> = {
  Layers, Zap, Droplet, Wrench, DoorOpen, Grid3x3, Package, Paintbrush, Hammer, Ruler,
}

const Hero = styled.section`
  background: #ffffff;
  padding: 64px 24px;
  text-align: center;

  @media (max-width: 600px) {
    padding: 40px 20px;
  }
`

const SeloAnos = styled.span`
  display: inline-block;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 12px;
  padding: 6px 14px;
  border-radius: 20px;
  margin-bottom: 16px;
`

const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 34px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 12px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 600px) {
    font-size: 24px;
  }
`

const HeroSubtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 520px;
  margin: 0 auto 28px;
  line-height: 1.6;
`

const BotoesWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
`

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

const CTAButtonSecundario = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  margin-left: 10px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryLight};
  }

  @media (max-width: 500px) {
    margin-left: 0;
    margin-top: 10px;
  }
`

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 20px;
`

const CategoriasGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
`

const CategoriaCardLink = styled(Link)`
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
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 600px) {
    width: 52px;
    height: 52px;
  }
`

const CategoriaLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;

  @media (max-width: 600px) {
    font-size: 11px;
  }
`

type Categoria = {
  id: number
  nome: string
  slug: string
  icone: string
}

type ProdutoDB = {
  id: number
  codigo_interno: string
  nome: string
  foto_url: string | null
  disponivel: boolean
}

type HomeHeroProps = {
  categorias: Categoria[]
  produtosDestaque: ProdutoDB[]
  catalogoUrl?: string
}

export default function HomeHero({ categorias, produtosDestaque, catalogoUrl }: HomeHeroProps) {
  return (
    <>
      <Hero>
        <SeloAnos>35 anos de tradição em Cruzeiro do Sul</SeloAnos>
        <HeroTitle>Tudo para sua construção, do alicerce ao acabamento</HeroTitle>
        <HeroSubtitle>
          Material de construção com entrega rápida e atendimento de verdade.
          Cimento, elétrica, hidráulica e ferramentas em um só lugar.
        </HeroSubtitle>
        <BotoesWrapper>
          <CTAButton href="https://wa.me/5568999238467" target="_blank" rel="noopener noreferrer">
            Falar no WhatsApp
          </CTAButton>

          {catalogoUrl && (
            <CTAButtonSecundario href={catalogoUrl} target="_blank" rel="noopener noreferrer">
              Baixar catálogo
            </CTAButtonSecundario>
          )}
        </BotoesWrapper>
      </Hero>

      <Section>
        <SectionTitle>Navegue por categoria</SectionTitle>
        <CategoriasGrid>
          {categorias.map((cat) => {
            const Icone = iconesDisponiveis[cat.icone] ?? Package
            return (
              <CategoriaCardLink key={cat.slug} href={`/produtos/${cat.slug}`}>
                <IconCircle>
                  <Icone size={26} strokeWidth={1.8} />
                </IconCircle>
                <CategoriaLabel>{cat.nome}</CategoriaLabel>
              </CategoriaCardLink>
            )
          })}
        </CategoriasGrid>
      </Section>

      <Section>
        <SectionTitle>Mais procurados</SectionTitle>
        <HomeProdutos produtos={produtosDestaque} />
      </Section>
    </>
  )
}