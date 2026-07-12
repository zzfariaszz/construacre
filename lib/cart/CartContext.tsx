'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { UnidadeProduto } from '@/lib/db/produtos'

export type ItemOrcamento = {
  id: number
  codigoInterno: string
  nome: string
  fotoUrl?: string
  marca?: string
  unidade: UnidadeProduto
  quantidade: number
}

type CartContextType = {
  itens: ItemOrcamento[]
  adicionarItem: (item: Omit<ItemOrcamento, 'quantidade'>) => void
  removerItem: (id: number) => void
  atualizarQuantidade: (id: number, quantidade: number) => void
  atualizarUnidade: (id: number, unidade: UnidadeProduto) => void
  limparCarrinho: () => void
  totalItens: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)
const STORAGE_KEY = 'construacre_orcamento'

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemOrcamento[]>([])
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) {
      try {
        setItens(JSON.parse(salvo))
      } catch {
        setItens([])
      }
    }
    setCarregado(true)
  }, [])

  useEffect(() => {
    if (carregado) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(itens))
    }
  }, [itens, carregado])

  const adicionarItem = (item: Omit<ItemOrcamento, 'quantidade'>) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.id === item.id)
      if (existente) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i))
      }
      return [...prev, { ...item, quantidade: 1 }]
    })
  }

  const removerItem = (id: number) => {
    setItens((prev) => prev.filter((i) => i.id !== id))
  }

  const atualizarQuantidade = (id: number, quantidade: number) => {
    if (quantidade < 1) return
    setItens((prev) => prev.map((i) => (i.id === id ? { ...i, quantidade } : i)))
  }

  const atualizarUnidade = (id: number, unidade: UnidadeProduto) => {
    setItens((prev) => prev.map((i) => (i.id === id ? { ...i, unidade } : i)))
  }

  const limparCarrinho = () => setItens([])
  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0)

  return (
    <CartContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        atualizarUnidade,
        limparCarrinho,
        totalItens,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart deve ser usado dentro de CartProvider')
  return context
}