'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Trash2, Plus, Upload, User } from 'lucide-react'

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
  border-radius: 50%;
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
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 14px;
`

const ItemCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 12px;
  text-align: center;
  position: relative;
`

const ItemFoto = styled.div`
  width: 64px;
  height: 85px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ItemNome = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2px;
`

const ItemWhats = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
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

type Vendedor = {
  id: number
  nome: string
  foto_url: string | null
  whatsapp: string
}

export default function VendedoresPage() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [nome, setNome] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [arquivo, setArquivo] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const carregarVendedores = async () => {
    const res = await fetch('/api/vendedores')
    setVendedores(await res.json())
  }

  useEffect(() => {
    carregarVendedores()
  }, [])

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
      let fotoUrl: string | undefined

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

      // Normaliza o WhatsApp para o formato internacional (556899...)
      const whatsappLimpo = whatsapp.replace(/\D/g, '')
      const whatsappFormatado = whatsappLimpo.startsWith('55')
        ? whatsappLimpo
        : `55${whatsappLimpo}`

      const res = await fetch('/api/vendedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, whatsapp: whatsappFormatado, fotoUrl }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error ?? 'Erro ao criar vendedor')
        setCarregando(false)
        return
      }

      setNome('')
      setWhatsapp('')
      setArquivo(null)
      setPreviewUrl(null)
      await carregarVendedores()
    } catch {
      setErro('Erro de conexão')
    } finally {
      setCarregando(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir este vendedor?')) return
    await fetch(`/api/vendedores/${id}`, { method: 'DELETE' })
    await carregarVendedores()
  }

  return (
    <div>
      <Title>Vendedores</Title>

      <Card>
        <CardTitle>Novo vendedor</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>Nome</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex: Carlos" required />
          </Field>

          <Field>
            <Label>WhatsApp (com DDD)</Label>
            <Input
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="Ex: 68999998888"
              required
            />
          </Field>

          <FieldFull>
            <Label>Foto</Label>
            <UploadArea>
              <Upload size={20} />
              {arquivo ? arquivo.name : 'Clique para escolher uma foto'}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={handleArquivoChange} />
              {previewUrl && <PreviewImg src={previewUrl} alt="Pré-visualização" />}
            </UploadArea>
          </FieldFull>

          {erro && <ErrorMsg>{erro}</ErrorMsg>}

          <SubmitButton type="submit" disabled={carregando}>
            <Plus size={16} />
            {carregando ? 'Salvando...' : 'Adicionar vendedor'}
          </SubmitButton>
        </Form>
      </Card>

      <Card>
        <CardTitle>Vendedores cadastrados ({vendedores.length})</CardTitle>
        <Lista>
          {vendedores.map((v) => (
            <ItemCard key={v.id}>
              <DeleteButton onClick={() => handleDelete(v.id)} aria-label="Excluir vendedor">
                <Trash2 size={14} />
              </DeleteButton>
              <ItemFoto>
                {v.foto_url ? <img src={v.foto_url} alt={v.nome} /> : <User size={24} />}
              </ItemFoto>
              <ItemNome>{v.nome}</ItemNome>
              <ItemWhats>{v.whatsapp}</ItemWhats>
            </ItemCard>
          ))}
        </Lista>
      </Card>
    </div>
  )
}