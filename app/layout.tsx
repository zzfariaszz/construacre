import type { Metadata } from 'next'
import { Archivo, Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'
import AppThemeProvider from '@/lib/ThemeProvider'
import { CartProvider } from '@/lib/cart/CartContext'
import Header from '@/components/Header'
import WhatsAppButton from '@/components/WhatsAppButton'
import OrcamentoButton from '@/components/OrcamentoButton'
import Footer from '@/components/Footer'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Construacre - Tudo para sua construção',
  description:
    'Material de construção em Cruzeiro do Sul, AC. 35 anos de tradição atendendo sua obra.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body>
        <StyledComponentsRegistry>
          <AppThemeProvider>
            <CartProvider>
              <Header />
              {children}
              <Footer />
              <WhatsAppButton />
              <OrcamentoButton />
            </CartProvider>
          </AppThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}