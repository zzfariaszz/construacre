'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { Trash2, Minus, Plus, Download, ImageOff } from 'lucide-react'
import { useCart } from '@/lib/cart/CartContext'
import { gerarOrcamentoPdf } from '@/lib/pdf/gerarOrcamentoPdf'
import type { UnidadeProduto } from '@/lib/db/produtos'

const PageWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 24px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 6px;
`

const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 0 28px;
`

const VazioMsg = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  padding: 60px 0;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  flex-wrap: wrap;
`

const ItemFoto = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
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

const ItemInfo = styled.div`
  flex: 1;
  min-width: 140px;
`

const ItemMarca = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
`

const ItemNome = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2px;
`

const ItemCodigo = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`

const QuantidadeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const QtdButton = styled.button`
  width: 26px;
  height: 26px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const QtdValor = styled.span`
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  min-width: 20px;
  text-align: center;
`

const UnidadeSelect = styled.select`
  padding: 6px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  background: #ffffff;
`

const RemoverButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;

  &:hover {
    color: #dc2626;
  }
`

const Rodape = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`

const TotalTexto = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`

const BaixarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 22px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

export default function OrcamentoPage() {
  const { itens, removerItem, atualizarQuantidade, atualizarUnidade, totalItens } = useCart()
  const [gerando, setGerando] = useState(false)

  const handleBaixarPdf = async () => {
    setGerando(true)
    try {
      await gerarOrcamentoPdf(itens)
    } finally {
      setGerando(false)
    }
  }

  return (
    <PageWrapper>
      <Title>Seu orcamento</Title>
      <Subtitle>Revise os produtos e baixe o PDF para enviar a loja</Subtitle>

      {itens.length === 0 ? (
        <VazioMsg>Nenhum produto adicionado ainda.</VazioMsg>
      ) : (
        <>
          {itens.map((item) => (
            <Item key={item.id}>
              <ItemFoto>
                {item.fotoUrl ? <img src={item.fotoUrl} alt={item.nome} /> : <ImageOff size={20} />}
              </ItemFoto>

              <ItemInfo>
                {item.marca && <ItemMarca>{item.marca}</ItemMarca>}
                <ItemNome>{item.nome}</ItemNome>
                <ItemCodigo>COD {item.codigoInterno}</ItemCodigo>
              </ItemInfo>

              <UnidadeSelect
                value={item.unidade}
                onChange={(e) => atualizarUnidade(item.id, e.target.value as UnidadeProduto)}
              >
                <option value="unidade">Unidade</option>
                <option value="caixa">Caixa</option>
                <option value="metro">Metro</option>
                <option value="kg">Kg</option>
              </UnidadeSelect>

              <QuantidadeControl>
                <QtdButton
                  onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                  aria-label="Diminuir quantidade"
                >
                  <Minus size={14} />
                </QtdButton>
                <QtdValor>{item.quantidade}</QtdValor>
                <QtdButton
                  onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                  aria-label="Aumentar quantidade"
                >
                  <Plus size={14} />
                </QtdButton>
              </QuantidadeControl>

              <RemoverButton onClick={() => removerItem(item.id)} aria-label="Remover item">
                <Trash2 size={16} />
              </RemoverButton>
            </Item>
          ))}

          <Rodape>
            <TotalTexto>
              {totalItens} {totalItens === 1 ? 'item' : 'itens'} no orcamento
            </TotalTexto>
            <BaixarButton onClick={handleBaixarPdf} disabled={gerando}>
              <Download size={16} />
              {gerando ? 'Gerando PDF...' : 'Baixar PDF'}
            </BaixarButton>
          </Rodape>
        </>
      )}
    </PageWrapper>
  )
}