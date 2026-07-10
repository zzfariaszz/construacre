'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Trash2, Upload, Image as ImageIcon } from 'lucide-react'

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

const Lista = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
`

const FotoCard = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const DeleteButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px;
  color: #dc2626;
  cursor: pointer;
  display: flex;
`

type FotoGaleria = {
  id: number
  foto_url: string
}

export default function GaleriaPage() {
  const [fotos, setFotos] = useState<FotoGaleria[]>([])
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  const carregarFotos = async () => {
    const res = await fetch('/api/galeria')
    setFotos(await res.json())
  }

  useEffect(() => {
    carregarFotos()
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
        setErro(dataUpload.error ?? 'Erro ao subir a foto')
        setEnviando(false)
        return
      }

      await fetch('/api/galeria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fotoUrl: dataUpload.url }),
      })

      await carregarFotos()
    } catch {
      setErro('Erro de conexão')
    } finally {
      setEnviando(false)
      e.target.value = ''
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Excluir esta foto?')) return
    await fetch(`/api/galeria/${id}`, { method: 'DELETE' })
    await carregarFotos()
  }

  return (
    <div>
      <Title>Galeria da loja</Title>

      <Card>
        <CardTitle>Adicionar foto</CardTitle>
        <UploadArea className={enviando ? 'enviando' : ''}>
          <Upload size={22} />
          {enviando ? 'Enviando...' : 'Clique para escolher uma foto (JPG, PNG ou WebP, até 5MB)'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleUpload}
            disabled={enviando}
          />
        </UploadArea>
        {erro && <ErrorMsg>{erro}</ErrorMsg>}
      </Card>

      <Card>
        <CardTitle>Fotos cadastradas ({fotos.length})</CardTitle>
        {fotos.length === 0 ? (
          <p style={{ fontSize: 13, color: '#6B7280' }}>Nenhuma foto ainda.</p>
        ) : (
          <Lista>
            {fotos.map((foto) => (
              <FotoCard key={foto.id}>
                <img src={foto.foto_url} alt="Foto da loja" />
                <DeleteButton onClick={() => handleDelete(foto.id)} aria-label="Excluir foto">
                  <Trash2 size={14} />
                </DeleteButton>
              </FotoCard>
            ))}
          </Lista>
        )}
      </Card>
    </div>
  )
}