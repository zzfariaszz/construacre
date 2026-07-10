'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Trash2, Plus, Layers, Zap, Droplet, Wrench, DoorOpen, Grid3x3, Package, Paintbrush, Hammer, Ruler } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 22px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 24px;
`

const Card = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`

const CardTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 16px;
`

const Form = styled.form`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: flex-end;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const Input = styled.input`
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const IconPicker = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  max-width: 320px;
`

const IconOption = styled.button<{ $selected: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.primaryLight : '#ffffff')};
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  padding: 10px 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  height: 38px;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMsg = styled.p`
  color: #dc2626;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  margin: 8px 0 0;
`

const Lista = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
`

const ItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  background: #ffffff;
`

const ItemIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const ItemNome = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;

  &:hover {
    color: #dc2626;
  }
`

// Ícones disponíveis pra escolher — mapa nome -> componente
const iconesDisponiveis: Record<string, LucideIcon> = {
  Layers, Zap, Droplet, Wrench, DoorOpen, Grid3x3, Package, Paintbrush, Hammer, Ruler,
}

type Categoria = {
  id: number
  nome: string
  slug: string
  icone: string
}

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [nome, setNome] = useState('')
  const [iconeSelecionado, setIconeSelecionado] = useState('Package')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const carregarCategorias = async () => {
    const res = await fetch('/api/categorias')
    const data = await res.json()
    setCategorias(data)
  }

  useEffect(() => {
    carregarCategorias()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const res = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, icone: iconeSelecionado }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error ?? 'Erro ao criar categoria')
        setCarregando(false)
        return
      }

      setNome('')
      setIconeSelecionado('Package')
      await carregarCategorias()
    } catch {
      setErro('Erro de conexão')
    } finally {
      setCarregando(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir esta categoria? Produtos vinculados ficarão sem categoria.')) return

    await fetch(`/api/categorias/${id}`, { method: 'DELETE' })
    await carregarCategorias()
  }

  return (
    <div>
      <Title>Categorias</Title>

      <Card>
        <CardTitle>Nova categoria</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Nome</Label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Tintas"
              required
            />
          </Field>

          <Field>
            <Label>Ícone</Label>
            <IconPicker>
              {Object.entries(iconesDisponiveis).map(([nomeIcone, Icone]) => (
                <IconOption
                  key={nomeIcone}
                  type="button"
                  $selected={iconeSelecionado === nomeIcone}
                  onClick={() => setIconeSelecionado(nomeIcone)}
                  aria-label={nomeIcone}
                >
                  <Icone size={18} />
                </IconOption>
              ))}
            </IconPicker>
          </Field>

          <SubmitButton type="submit" disabled={carregando}>
            <Plus size={16} />
            {carregando ? 'Criando...' : 'Criar'}
          </SubmitButton>
        </Form>
        {erro && <ErrorMsg>{erro}</ErrorMsg>}
      </Card>

      <Card>
        <CardTitle>Categorias cadastradas ({categorias.length})</CardTitle>
        <Lista>
          {categorias.map((cat) => {
            const Icone = iconesDisponiveis[cat.icone] ?? Package
            return (
              <ItemCard key={cat.id}>
                <ItemIcon>
                  <Icone size={18} />
                </ItemIcon>
                <ItemNome>{cat.nome}</ItemNome>
                <DeleteButton onClick={() => handleDelete(cat.id)} aria-label="Excluir categoria">
                  <Trash2 size={16} />
                </DeleteButton>
              </ItemCard>
            )
          })}
        </Lista>
      </Card>
    </div>
  )
}