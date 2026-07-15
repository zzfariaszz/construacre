'use client'

import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { X, User, Send } from 'lucide-react'

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
  max-width: 420px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
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

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 18px;
`

const Aviso = styled.div`
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  margin-bottom: 18px;
  line-height: 1.5;
`

const VendedorLista = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
`

const VendedorItem = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
  text-align: left;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.primaryLight};
  }
`

const VendedorFoto = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const VendedorNome = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
`

const RecusarButton = styled.button`
  width: 100%;
  padding: 10px;
  background: none;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;

  &:hover {
    background: #f9fafb;
  }
`

type Vendedor = {
  id: number
  nome: string
  foto_url: string | null
  whatsapp: string
}

type ModalEnviarVendedorProps = {
  onFechar: () => void
}

export default function ModalEnviarVendedor({ onFechar }: ModalEnviarVendedorProps) {
  const [vendedores, setVendedores] = useState<Vendedor[]>([])

  useEffect(() => {
    fetch('/api/vendedores')
      .then((res) => res.json())
      .then(setVendedores)
      .catch(() => setVendedores([]))
  }, [])

  const handleEscolherVendedor = (vendedor: Vendedor) => {
    const texto = `Olá ${vendedor.nome}! Acabei de gerar um orçamento no site da Construacre e gostaria de enviar o PDF. Já baixei o arquivo, vou anexar aqui na conversa.`
    const link = `https://wa.me/${vendedor.whatsapp}?text=${encodeURIComponent(texto)}`
    window.open(link, '_blank')
    onFechar()
  }

  return (
    <Overlay onClick={onFechar}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Deseja encaminhar para um de nossos vendedores?</Title>
          <CloseButton onClick={onFechar} aria-label="Fechar">
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <Subtitle>O PDF já foi baixado no seu dispositivo.</Subtitle>

        <Aviso>
          Ao escolher um vendedor, o WhatsApp abrirá com uma mensagem pronta.
          Anexe o PDF que acabou de baixar diretamente na conversa.
        </Aviso>

        <VendedorLista>
          {vendedores.map((vendedor) => (
            <VendedorItem key={vendedor.id} onClick={() => handleEscolherVendedor(vendedor)}>
              <VendedorFoto>
                {vendedor.foto_url ? <img src={vendedor.foto_url} alt={vendedor.nome} /> : <User size={18} />}
              </VendedorFoto>
              <VendedorNome>{vendedor.nome}</VendedorNome>
              <Send size={16} style={{ marginLeft: 'auto', color: '#15803D' }} />
            </VendedorItem>
          ))}
        </VendedorLista>

        <RecusarButton onClick={onFechar}>Não quero encaminhar para nenhum vendedor agora</RecusarButton>
      </ModalCard>
    </Overlay>
  )
}