'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type FavoritosContextType = {
  favoritos: number[]
  toggleFavorito: (id: number) => void
  totalFavoritos: number
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(undefined)
const STORAGE_KEY = 'construacre_favoritos'

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<number[]>([])
  const [carregado, setCarregado] = useState(false)

  useEffect(() => {
    const salvo = localStorage.getItem(STORAGE_KEY)
    if (salvo) {
      try {
        setFavoritos(JSON.parse(salvo))
      } catch {
        setFavoritos([])
      }
    }
    setCarregado(true)
  }, [])

  useEffect(() => {
    if (carregado) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritos))
    }
  }, [favoritos, carregado])

  const toggleFavorito = (id: number) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]))
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, toggleFavorito, totalFavoritos: favoritos.length }}>
      {children}
    </FavoritosContext.Provider>
  )
}

export function useFavoritos() {
  const context = useContext(FavoritosContext)
  if (!context) throw new Error('useFavoritos deve ser usado dentro de FavoritosProvider')
  return context
}