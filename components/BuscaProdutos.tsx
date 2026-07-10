'use client'

import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Search, X } from 'lucide-react'

const Wrapper = styled.div`
  position: relative;
  max-width: 400px;
  width: 100%;
`

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 10px 14px;
  background: #ffffff;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Input = styled.input`
  border: none;
  outline: none;
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`

const ClearButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  color: ${({ theme }) => theme.colors.textSecondary};
`

type BuscaProdutosProps = {
  onBuscar: (termo: string) => void
}

export default function BuscaProdutos({ onBuscar }: BuscaProdutosProps) {
  const [termo, setTermo] = useState('')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      onBuscar(termo)
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [termo])

  return (
    <Wrapper>
      <InputWrapper>
        <Search size={18} color="#9ca3af" />
        <Input
          type="text"
          placeholder="Buscar produto..."
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
        />
        {termo && (
          <ClearButton onClick={() => setTermo('')} aria-label="Limpar busca">
            <X size={16} />
          </ClearButton>
        )}
      </InputWrapper>
    </Wrapper>
  )
}