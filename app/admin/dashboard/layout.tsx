'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styled from 'styled-components'
import { Package, Tags, Users, FileText, Image as ImageIcon, LogOut } from 'lucide-react'

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const Sidebar = styled.aside`
  width: 220px;
  background: ${({ theme }) => theme.colors.primaryDark};
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: row;
    overflow-x: auto;
    padding: 12px;
  }
`

const NavItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  color: ${({ $active }) => ($active ? '#ffffff' : '#DCFCE7')};
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: #ffffff;
  }
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  font-weight: 500;
  color: #fecaca;
  background: none;
  border: none;
  cursor: pointer;
  margin-top: auto;
  text-align: left;

  &:hover {
    background: rgba(220, 38, 38, 0.15);
  }

  @media (max-width: 768px) {
    margin-top: 0;
    margin-left: auto;
  }
`

const Content = styled.main`
  flex: 1;
  padding: 32px;
  background: #f9fafb;

  @media (max-width: 768px) {
    padding: 20px;
  }
`

const items = [
  { href: '/admin/dashboard/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/dashboard/categorias', label: 'Categorias', icon: Tags },
  { href: '/admin/dashboard/vendedores', label: 'Vendedores', icon: Users },
  { href: '/admin/dashboard/galeria', label: 'Galeria da loja', icon: ImageIcon },
  { href: '/admin/dashboard/catalogo', label: 'Catálogo PDF', icon: FileText },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
    router.refresh()
  }

  return (
    <Wrapper>
      <Sidebar>
        {items.map((item) => {
          const Icon = item.icon
          return (
            <NavItem key={item.href} href={item.href} $active={pathname === item.href}>
              <Icon size={18} />
              {item.label}
            </NavItem>
          )
        })}
        <LogoutButton onClick={handleLogout}>
          <LogOut size={18} />
          Sair
        </LogoutButton>
      </Sidebar>
      <Content>{children}</Content>
    </Wrapper>
  )
}
