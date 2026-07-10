'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Trash2, Plus, Upload, ImageOff, Layers, Zap, Droplet, Wrench, DoorOpen, Grid3x3, Package, Paintbrush, Hammer, Ruler } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconesDisponiveis: Record<string, LucideIcon> = {
  Layers, Zap, Droplet, Wrench, DoorOpen, Grid3x3, Package, Paintbrush, Hammer, Ruler,
}

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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
`

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const FieldFull = styled(Field)`
  grid-column: 1 / -1;
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

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Select = styled.select`
  padding: 9px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  background: #ffffff;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`

const UploadArea = styled.label`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  input {
    display: none;
  }
`

const PreviewImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  margin-top: 8px;
`

const SubmitButton = styled.button`
  grid-column: 1 / -1;
  padding: 11px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMsg = styled.p`
  grid-column: 1 / -1;
  color: #dc2626;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  margin: 0;
`

const Lista = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 14px;
`

const ItemCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 12px;
  position: relative;
`

const ItemImagem = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
  overflow: hidden;
  margin-bottom: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ItemCodigo = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.primaryDark};
  background: ${({ theme }) => theme.colors.primaryLight};
  padding: 2px 6px;
  border-radius: 4px;
`

const ItemNome = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin: 6px 0 2px;
`

const ItemCategoria = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;

  &:hover {
    color: #dc2626;
  }
`

type Categoria = {
  id: number
  nome: string
  slug: string
  icone: string
}

type Produto = {
  id: number
  codigo_interno: string
  nome: string
  categoria_id: number | null
  categoria_nome?: string
  foto_url: string | null
  destaque: boolean
  disponivel: boolean
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [codigoInterno, setCodigoInterno] = useState('')
  const [nome, setNome] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [destaque, setDestaque] = useState(false)
  const [disponivel, setDisponivel] = useState(true)
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const carregarDados = async () => {
    const [resProdutos, resCategorias] = await Promise.all([
      fetch('/api/produtos'),
      fetch('/api/categorias'),
    ])
    setProdutos(await resProdutos.json())
    setCategorias(await resCategorias.json())
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setArquivo(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const resetForm = () => {
    setCodigoInterno('')
    setNome('')
    setCategoriaId('')
    setDestaque(false)
    setDisponivel(true)
    setArquivo(null)
    setPreviewUrl(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      let fotoUrl: string | undefined

      if (arquivo) {
        const formData = new FormData()
        formData.append('arquivo', arquivo)

        const resUpload = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        const dataUpload = await resUpload.json()

        if (!resUpload.ok) {
          setErro(dataUpload.error ?? 'Erro ao subir a foto')
          setCarregando(false)
          return
        }

        fotoUrl = dataUpload.url
      }

      const res = await fetch('/api/produtos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigoInterno,
          nome,
          categoriaId: Number(categoriaId),
          fotoUrl,
          destaque,
          disponivel,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error ?? 'Erro ao criar produto')
        setCarregando(false)
        return
      }

      resetForm()
      await carregarDados()
    } catch {
      setErro('Erro de conexão')
    } finally {
      setCarregando(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir este produto?')) return
    await fetch(`/api/produtos/${id}`, { method: 'DELETE' })
    await carregarDados()
  }

  return (
    <div>
      <Title>Produtos</Title>

      <Card>
        <CardTitle>Novo produto</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Código interno</Label>
            <Input
              value={codigoInterno}
              onChange={(e) => setCodigoInterno(e.target.value)}
              placeholder="Ex: 4821"
              required
            />
          </Field>

          <Field>
            <Label>Nome do produto</Label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Cimento CP-II 50kg"
              required
            />
          </Field>

          <Field>
            <Label>Categoria</Label>
            <Select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
            >
              <option value="">Selecione...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </Select>
          </Field>

          <FieldFull>
            <Label>Foto do produto</Label>
            <UploadArea>
              <Upload size={20} />
              {arquivo ? arquivo.name : 'Clique para escolher uma foto (JPG, PNG ou WebP, até 5MB)'}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleArquivoChange} />
              {previewUrl && <PreviewImg src={previewUrl} alt="Pré-visualização" />}
            </UploadArea>
          </FieldFull>

          <Field>
            <CheckboxRow>
              <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} />
              Mostrar em "Mais procurados"
            </CheckboxRow>
          </Field>

          <Field>
            <CheckboxRow>
              <input type="checkbox" checked={disponivel} onChange={(e) => setDisponivel(e.target.checked)} />
              Disponível
            </CheckboxRow>
          </Field>

          {erro && <ErrorMsg>{erro}</ErrorMsg>}

          <SubmitButton type="submit" disabled={carregando}>
            <Plus size={16} />
            {carregando ? 'Salvando...' : 'Adicionar produto'}
          </SubmitButton>
        </Form>
      </Card>

      <Card>
        <CardTitle>Produtos cadastrados ({produtos.length})</CardTitle>
        <Lista>
          {produtos.map((produto) => (
            <ItemCard key={produto.id}>
              <DeleteButton onClick={() => handleDelete(produto.id)} aria-label="Excluir produto">
                <Trash2 size={14} />
              </DeleteButton>
              <ItemImagem>
                {produto.foto_url ? (
                  <img src={produto.foto_url} alt={produto.nome} />
                ) : (
                  <ImageOff size={22} />
                )}
              </ItemImagem>
              <ItemCodigo>COD {produto.codigo_interno}</ItemCodigo>
              <ItemNome>{produto.nome}</ItemNome>
              <ItemCategoria>{produto.categoria_nome ?? 'Sem categoria'}</ItemCategoria>
            </ItemCard>
          ))}
        </Lista>
      </Card>
    </div>
  )
}