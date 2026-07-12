'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { X, Upload } from 'lucide-react'
import type { Produto, StatusProduto, UnidadeProduto } from '@/lib/db/produtos'

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 300;
  padding: 20px;
`

const ModalCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  max-width: 480px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
`

const Title = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
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

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
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
  padding: 14px;
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
  padding: 11px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  margin-top: 6px;

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
  margin: 0;
`

type Categoria = {
  id: number
  nome: string
}

type EditarProdutoModalProps = {
  produto: Produto
  categorias: Categoria[]
  onClose: () => void
  onSalvo: () => void
}

export default function EditarProdutoModal({
  produto,
  categorias,
  onClose,
  onSalvo,
}: EditarProdutoModalProps) {
  const [codigoInterno, setCodigoInterno] = useState(produto.codigo_interno)
  const [nome, setNome] = useState(produto.nome)
  const [marca, setMarca] = useState(produto.marca ?? '')
  const [categoriaId, setCategoriaId] = useState(String(produto.categoria_id ?? ''))
  const [status, setStatus] = useState<StatusProduto>(produto.status)
  const [unidade, setUnidade] = useState<UnidadeProduto>(produto.unidade)
  const [destaque, setDestaque] = useState(produto.destaque)
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(produto.foto_url)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleArquivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setArquivo(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      let fotoUrl = produto.foto_url ?? undefined

      if (arquivo) {
        const formData = new FormData()
        formData.append('arquivo', arquivo)
        const resUpload = await fetch('/api/upload', { method: 'POST', body: formData })
        const dataUpload = await resUpload.json()

        if (!resUpload.ok) {
          setErro(dataUpload.error ?? 'Erro ao subir a foto')
          setCarregando(false)
          return
        }
        fotoUrl = dataUpload.url
      }

      const res = await fetch(`/api/produtos/${produto.id}`, {
        method: 'PUT',
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
        setErro(data.error ?? 'Erro ao salvar')
        setCarregando(false)
        return
      }

      onSalvo()
    } catch {
      setErro('Erro de conexão')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Editar produto</Title>
          <CloseButton onClick={onClose} aria-label="Fechar">
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <Row>
            <Field>
              <Label>Código interno</Label>
              <Input value={codigoInterno} onChange={(e) => setCodigoInterno(e.target.value)} required />
            </Field>
            <Field>
              <Label>Marca</Label>
              <Input value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Opcional" />
            </Field>
          </Row>

          <Field>
            <Label>Nome do produto</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </Field>

          <Field>
            <Label>Categoria</Label>
            <Select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required>
              <option value="">Selecione...</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </Select>
          </Field>

          <Row>
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
          </Row>

          <Field>
            <Label>Foto do produto</Label>
            <UploadArea>
              <Upload size={18} />
              {arquivo ? arquivo.name : 'Trocar foto (opcional)'}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleArquivoChange} />
              {previewUrl && <PreviewImg src={previewUrl} alt="Pré-visualização" />}
            </UploadArea>
          </Field>

          <CheckboxRow>
            <input type="checkbox" checked={destaque} onChange={(e) => setDestaque(e.target.checked)} />
            Mostrar em &quot;Mais procurados&quot;
          </CheckboxRow>

          {erro && <ErrorMsg>{erro}</ErrorMsg>}

          <SubmitButton type="submit" disabled={carregando}>
            {carregando ? 'Salvando...' : 'Salvar alterações'}
          </SubmitButton>
        </Form>
      </ModalCard>
    </Overlay>
  )
}