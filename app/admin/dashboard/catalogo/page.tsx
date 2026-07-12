'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Upload, FileText, ExternalLink } from 'lucide-react'

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

const UploadArea = styled.label`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  input {
    display: none;
  }

  &.enviando {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMsg = styled.p`
  color: #dc2626;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  margin: 12px 0 0;
`

const AtualCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 8px;
`

const AtualIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #ffffff;
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const AtualInfo = styled.div`
  flex: 1;
`

const AtualTexto = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 2px;
`

const AtualData = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const VerLink = styled.a`
  display: flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

type Catalogo = {
  arquivo_url: string
  atualizado_em: string
}

export default function CatalogoPage() {
  const [catalogo, setCatalogo] = useState<Catalogo | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  const carregarCatalogo = async () => {
    const res = await fetch('/api/catalogo')
    const data = await res.json()
    setCatalogo(data)
  }

  useEffect(() => {
    carregarCatalogo()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setErro('')
    setEnviando(true)

    try {
      const formData = new FormData()
      formData.append('arquivo', file)

      const resUpload = await fetch('/api/upload', { method: 'POST', body: formData })
      const dataUpload = await resUpload.json()

      if (!resUpload.ok) {
        setErro(dataUpload.error ?? 'Erro ao subir o arquivo')
        setEnviando(false)
        return
      }

      await fetch('/api/catalogo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ arquivoUrl: dataUpload.url }),
      })

      await carregarCatalogo()
    } catch {
      setErro('Erro de conexão')
    } finally {
      setEnviando(false)
      e.target.value = ''
    }
  }

  return (
    <div>
      <Title>Catálogo PDF</Title>

      <Card>
        <CardTitle>Substituir catálogo</CardTitle>
        <UploadArea className={enviando ? 'enviando' : ''}>
          <Upload size={22} />
          {enviando ? 'Enviando...' : 'Clique para enviar o PDF do catálogo (até 10MB)'}
          <input type="file" accept="application/pdf" onChange={handleUpload} disabled={enviando} />
        </UploadArea>
        {erro && <ErrorMsg>{erro}</ErrorMsg>}
      </Card>

      <Card>
        <CardTitle>Catálogo atual</CardTitle>
        {!catalogo ? (
          <p style={{ fontSize: 13, color: '#6B7280' }}>Nenhum catálogo enviado ainda.</p>
        ) : (
          <AtualCard>
            <AtualIcon>
              <FileText size={20} />
            </AtualIcon>
            <AtualInfo>
              <AtualTexto>Catálogo ativo</AtualTexto>
              <AtualData>
                Atualizado em {new Date(catalogo.atualizado_em).toLocaleDateString('pt-BR')}
              </AtualData>
            </AtualInfo>
            <VerLink href={catalogo.arquivo_url} target="_blank" rel="noopener noreferrer">
              Ver PDF
              <ExternalLink size={14} />
            </VerLink>
          </AtualCard>
        )}
      </Card>
    </div>
  )
}