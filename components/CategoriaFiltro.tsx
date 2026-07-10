'use client'

import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 24px;
`

const Chip = styled.button<{ $ativo: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid ${({ theme, $ativo }) => ($ativo ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $ativo }) => ($ativo ? theme.colors.primary : '#ffffff')};
  color: ${({ theme, $ativo }) => ($ativo ? '#ffffff' : theme.colors.text)};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

type Categoria = {
  id: number
  nome: string
  slug: string
}

type CategoriaFiltroProps = {
  categorias: Categoria[]
  categoriaAtiva: string | null
  onSelecionar: (slug: string | null) => void
}

export default function CategoriaFiltro({
  categorias,
  categoriaAtiva,
  onSelecionar,
}: CategoriaFiltroProps) {
  return (
    <Wrapper>
      <Chip $ativo={categoriaAtiva === null} onClick={() => onSelecionar(null)}>
        Todas
      </Chip>
      {categorias.map((cat) => (
        <Chip
          key={cat.slug}
          $ativo={categoriaAtiva === cat.slug}
          onClick={() => onSelecionar(cat.slug)}
        >
          {cat.nome}
        </Chip>
      ))}
    </Wrapper>
  )
}