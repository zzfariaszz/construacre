'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styled from 'styled-components'

type Theme = {
  colors: {
    primaryDark: string
    primaryLight: string
  }
  fonts: {
    body: string
  }
}

const HeaderWrapper = styled.header`
  background: ${({ theme }: any) => theme.colors.primaryDark};
  position: sticky;
  top: 0;
  z-index: 50;
`

const TopBar = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
`

const Nav = styled.nav<{ $open: boolean }>`
  display: flex;
  gap: 28px;

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }: any) => theme.colors.primaryDark};
    padding: 16px 24px 24px;
    gap: 16px;
  }
`

const NavLink = styled(Link)`
  font-family: ${({ theme }: any) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }: any) => theme.colors.primaryLight};

  &:hover {
    color: #ffffff;
  }
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const links = [
  { href: '/produtos', label: 'Produtos' },
  { href: '/equipe', label: 'Equipe' },
  { href: '/sobre', label: 'Sobre' },
  { href: '/contato', label: 'Contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <HeaderWrapper>
      <TopBar>
        <LogoLink href="/">
          <Image
            src="/images/logo.png"
            alt="Construacre - Tudo para sua construção"
            width={200}
            height={80}
            style={{ height: '150px', width: 'auto' }}
            priority
          />
        </LogoLink>

        <MenuButton onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu">
          {menuOpen ? '✕' : '☰'}
        </MenuButton>

        <Nav $open={menuOpen}>
          {links.map((link) => (
            <NavLink key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </NavLink>
          ))}
        </Nav>
      </TopBar>
    </HeaderWrapper>
  )
}