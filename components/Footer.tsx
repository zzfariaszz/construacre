'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { MapPin, Phone, Clock, Mail } from 'lucide-react'

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const FooterWrapper = styled.footer`
  background: ${({ theme }) => theme.colors.primaryDark};
  padding: 48px 24px 24px;
  margin-top: 60px;
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`

const Coluna = styled.div``

const Titulo = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
  margin: 0 0 14px;
`

const Linha = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primaryLight};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  line-height: 1.5;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
  }
`

const LinkTexto = styled.a`
  color: ${({ theme }) => theme.colors.primaryLight};
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`

const NavLink = styled(Link)`
  display: block;
  color: ${({ theme }) => theme.colors.primaryLight};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  margin-bottom: 10px;
  text-decoration: none;

  &:hover {
    color: #ffffff;
  }
`

const PagamentosGrid = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

const PagamentoChip = styled.span`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 6px;
`

const Divisor = styled.div`
  max-width: 1200px;
  margin: 36px auto 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 20px;
  text-align: center;
`

const Copyright = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.primaryLight};
  margin: 0;
`

export default function Footer() {
  return (
    <FooterWrapper>
      <Content>
        <Coluna>
          <Titulo>Construacre</Titulo>
          <Linha>
            <MapPin size={16} />
            Rua Absolon Moreira, 128 - Centro
            <br />
            Cruzeiro do Sul - AC, 69980-000
          </Linha>
        </Coluna>

        <Coluna>
          <Titulo>Contato</Titulo>
          <Linha>
            <Phone size={16} />
            <LinkTexto href="https://wa.me/5568999238467" target="_blank" rel="noopener noreferrer">
              (68) 99923-8467
            </LinkTexto>
          </Linha>
          <Linha>
            <Mail size={16} />
            <LinkTexto href="mailto:construacre@hotmail.com">construacre@hotmail.com</LinkTexto>
          </Linha>
          <Linha>
            <InstagramIcon size={16} />
            <LinkTexto href="https://instagram.com/construacre" target="_blank" rel="noopener noreferrer">
              @construacre
            </LinkTexto>
            </Linha>
        </Coluna>

        <Coluna>
          <Titulo>Horário de atendimento</Titulo>
          <Linha>
            <Clock size={16} />
            Seg a Sex: 07:30 às 17:30
            <br />
            Sáb: 07:30 às 12:30
          </Linha>
        </Coluna>

        <Coluna>
          <Titulo>Navegação</Titulo>
          <NavLink href="/produtos">Produtos</NavLink>
          <NavLink href="/equipe">Equipe</NavLink>
          <NavLink href="/sobre">Sobre</NavLink>
          <NavLink href="/contato">Contato</NavLink>

          <Titulo style={{ marginTop: 16 }}>Formas de pagamento</Titulo>
          <PagamentosGrid>
            <PagamentoChip>Pix</PagamentoChip>
            <PagamentoChip>Cartão</PagamentoChip>
            <PagamentoChip>Dinheiro</PagamentoChip>
          </PagamentosGrid>
        </Coluna>
      </Content>

      <Divisor>
        <Copyright>Construacre - Tudo para sua construção - 35 anos de tradição</Copyright>
      </Divisor>
    </FooterWrapper>
  )
}