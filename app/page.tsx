'use client'

import styled from 'styled-components'
import { Layers, Zap, Droplet, Wrench, DoorOpen, Grid3x3 } from 'lucide-react'
import CategoriaCard from '@/components/CategoriaCard'
import ProdutoCard, { Produto } from '@/components/ProdutoCard'

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

const categorias = [
  { slug: 'cimento', nome: 'Cimento', icone: Layers },
  { slug: 'eletrica', nome: 'Elétrica', icone: Zap },
  { slug: 'hidraulica', nome: 'Hidráulica', icone: Droplet },
  { slug: 'ferramentas', nome: 'Ferramentas', icone: Wrench },
  { slug: 'portas', nome: 'Diversos', icone: DoorOpen },
  { slug: 'pisos', nome: 'Pisos', icone: Grid3x3 },
]

// Placeholder 
const produtosDestaque: Produto[] = [
  { id: 1, codigoInterno: '4821', nome: 'Cimento CP-II 50kg', categoria: 'cimento', disponivel: true },
  { id: 2, codigoInterno: '5190', nome: 'Furadeira de Impacto', categoria: 'ferramentas', disponivel: false },
  { id: 3, codigoInterno: '3312', nome: 'Telha Ondulada 6mm', categoria: 'pisos', disponivel: true },
  { id: 4, codigoInterno: '2207', nome: 'Argamassa AC1', categoria: 'hidraulica', disponivel: true },
]

export default function Home() {
  const favoritos: number[] = []

  const toggleFavorito = (id: number) => {
    console.log('favoritar', id)
  }

  return (
    <>
      <Hero>
        <SeloAnos>35 anos de tradição em Cruzeiro do Sul</SeloAnos>
        <HeroTitle>Tudo para sua construção, do alicerce ao acabamento</HeroTitle>
        <HeroSubtitle>
          Material de construção com entrega rápida e atendimento de verdade.
          Cimento, elétrica, hidráulica, ferramentas e muito mais em um só lugar.
        </HeroSubtitle>
        <CTAButton href="https://wa.me/5568999238467" target="_blank" rel="noopener noreferrer">
          Falar no WhatsApp
        </CTAButton>
      </Hero>

      <Section>
        <SectionTitle>Navegue por categoria</SectionTitle>
        <CategoriasGrid>
          {categorias.map((cat) => (
            <CategoriaCard key={cat.slug} {...cat} />
          ))}
        </CategoriasGrid>
      </Section>

      <Section>
        <SectionTitle>Mais procurados</SectionTitle>
        <ProdutosGrid>
          {produtosDestaque.map((produto) => (
            <ProdutoCard
              key={produto.id}
              produto={produto}
              favorito={favoritos.includes(produto.id)}
              onToggleFavorito={toggleFavorito}
            />
          ))}
        </ProdutosGrid>
      </Section>
    </>
  )
}