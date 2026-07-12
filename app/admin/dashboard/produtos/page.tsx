'use client'

import { useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import { Trash2, Plus, Upload, ImageOff, Pencil } from 'lucide-react'
import EditarProdutoModal from '@/components/EditarProdutoModal'
import type { Produto, StatusProduto, UnidadeProduto } from '@/lib/db/produtos'
import { STATUS_LABEL } from '@/lib/db/produtos'

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

const FiltrosBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`

const FiltroSelect = styled.select`
  padding: 7px 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  background: #ffffff;
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
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
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

const ItemMarca = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
  margin-top: 6px;
`

const ItemNome = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin: 2px 0;
`

const ItemCategoria = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const AcoesTopo = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 6px;
`

const AcaoButton = styled.button`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`

const DeleteButton = styled(AcaoButton)`
  &:hover {
    color: #dc2626;
  }
`

type Categoria = {
  id: number
  nome: string
  slug: string
}

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [categorias, setCategorias] = useState<Categoria[]>([])

  const [codigoInterno, setCodigoInterno] = useState('')
  const [nome, setNome] = useState('')
  const [marca, setMarca] = useState('')
  const [categoriaId, setCategoriaId] = useState('')
  const [status, setStatus] = useState<StatusProduto>('disponivel')
  const [unidade, setUnidade] = useState<UnidadeProduto>('unidade')
  const [destaque, setDestaque] = useState(false)
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const [filtroMarca, setFiltroMarca] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')

  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null)

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

  const marcasDisponiveis = useMemo(() => {
    const marcas = produtos.map((p) => p.marca).filter((m): m is string => !!m)
    return Array.from(new Set(marcas)).sort()
  }, [produtos])

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) => {
      if (filtroMarca && p.marca !== filtroMarca) return false
      if (filtroStatus && p.status !== filtroStatus) return false
      return true
    })
  }, [produtos, filtroMarca, filtroStatus])

  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setArquivo(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const resetForm = () => {
    setCodigoInterno('')
    setNome('')
    setMarca('')
    setCategoriaId('')
    setStatus('disponivel')
    setUnidade('unidade')
    setDestaque(false)
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
          marca: marca || undefined,
          categoriaId: Number(categoriaId),
          fotoUrl,
          status,
          unidade,
          destaque,
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

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
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
            <Label>Marca</Label>
            <Input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Opcional"
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

          <Field>
            <Label>Status</Label>
            <Select value={status} onChange={(e) => setStatus(e.target.value as StatusProduto)}>
              <option value="disponivel">Disponível</option>
              <option value="aguardando_estoque">Aguardando estoque</option>
              <option value="indisponivel">Indisponível</option>
            </Select>
          </Field>

          <Field>
            <Label>Unidade</Label>
            <Select value={unidade} onChange={(e) => setUnidade(e.target.value as UnidadeProduto)}>
              <option value="unidade">Unidade</option>
              <option value="caixa">Caixa</option>
              <option value="metro">Metro</option>
              <option value="kg">Kg</option>
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
              Mostrar em &quot;Mais procurados&quot;
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
        <CardTitle>Produtos cadastrados ({produtosFiltrados.length})</CardTitle>

        <FiltrosBar>
          <FiltroSelect value={filtroMarca} onChange={(e) => setFiltroMarca(e.target.value)}>
            <option value="">Todas as marcas</option>
            {marcasDisponiveis.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </FiltroSelect>

          <FiltroSelect value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
            <option value="">Todos os status</option>
            <option value="disponivel">Disponível</option>
            <option value="aguardando_estoque">Aguardando estoque</option>
            <option value="indisponivel">Indisponível</option>
          </FiltroSelect>
        </FiltrosBar>

        <Lista>
          {produtosFiltrados.map((produto) => (
            <ItemCard key={produto.id} onClick={() => setProdutoEditando(produto)}>
              <AcoesTopo>
                <AcaoButton aria-label="Editar produto">
                  <Pencil size={14} />
                </AcaoButton>
                <DeleteButton onClick={(e) => handleDelete(produto.id, e)} aria-label="Excluir produto">
                  <Trash2 size={14} />
                </DeleteButton>
              </AcoesTopo>
              <ItemImagem>
                {produto.foto_url ? (
                  <img src={produto.foto_url} alt={produto.nome} />
                ) : (
                  <ImageOff size={22} />
                )}
              </ItemImagem>
              <ItemCodigo>COD {produto.codigo_interno}</ItemCodigo>
              {produto.marca && <ItemMarca>{produto.marca}</ItemMarca>}
              <ItemNome>{produto.nome}</ItemNome>
              <ItemCategoria>
                {produto.categoria_nome ?? 'Sem categoria'} · {STATUS_LABEL[produto.status]}
              </ItemCategoria>
            </ItemCard>
          ))}
        </Lista>
      </Card>

      {produtoEditando && (
        <EditarProdutoModal
          produto={produtoEditando}
          categorias={categorias}
          onClose={() => setProdutoEditando(null)}
          onSalvo={() => {
            setProdutoEditando(null)
            carregarDados()
          }}
        />
      )}
    </div>
  )
}