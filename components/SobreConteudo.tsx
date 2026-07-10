'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { Award, MapPin, Clock, X } from 'lucide-react'

const PageWrapper = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 24px;
`

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`

const SeloAnos = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 13px;
  padding: 8px 16px;
  border-radius: 20px;
  margin-bottom: 16px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 700;
  font-size: 28px;
  color: ${({ theme }) => theme.colors.primaryDark};
  margin: 0 0 12px;
`

const Lead = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 620px;
  margin: 0 auto;
  line-height: 1.7;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 40px 0;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`

const InfoCard = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 20px;
  text-align: center;
`

const InfoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 12px;
`

const InfoTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px;
`

const InfoText = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`

const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 16px;
`

const Galeria = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const FotoLoja = styled.div`
  aspect-ratio: 4 / 3;
  background: ${({ theme }) => theme.colors.primaryLight};
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.2s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 24px;
  cursor: zoom-out;
`

const ImagemAmpliada = styled.img`
  max-width: 100%;
  max-height: 90vh;
  border-radius: 8px;
  cursor: default;
`

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 24px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  cursor: pointer;
  z-index: 201;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`

type FotoGaleria = {
  id: number
  foto_url: string
}

export default function SobreConteudo({ fotos }: { fotos: FotoGaleria[] }) {
  const [fotoAmpliada, setFotoAmpliada] = useState<string | null>(null)

  return (
    <PageWrapper>
      <Header>
        <SeloAnos>
          <Award size={16} />
          35 anos de tradição
        </SeloAnos>
        <Title>Sobre a Construacre</Title>
        <Lead>
          Há 35 anos servindo Cruzeiro do Sul e região com material de construção de
          qualidade, atendimento próximo e o compromisso de entregar o que sua obra
          precisa, do alicerce ao acabamento.
        </Lead>
      </Header>

      <InfoGrid>
        <InfoCard>
          <InfoIcon>
            <Award size={20} />
          </InfoIcon>
          <InfoTitle>35 anos de história</InfoTitle>
          <InfoText>Tradição e experiência atendendo o Acre desde 1991</InfoText>
        </InfoCard>

        <InfoCard>
          <InfoIcon>
            <MapPin size={20} />
          </InfoIcon>
          <InfoTitle>Centro de Cruzeiro do Sul</InfoTitle>
          <InfoText>Rua Absolon Moreira, 128 - Centro</InfoText>
        </InfoCard>

        <InfoCard>
          <InfoIcon>
            <Clock size={20} />
          </InfoIcon>
          <InfoTitle>Horário de atendimento</InfoTitle>
          <InfoText>Seg a Sex: 07:30–17:30 · Sáb: 07:30–12:30</InfoText>
        </InfoCard>
      </InfoGrid>

      {fotos.length > 0 && (
        <>
          <SectionTitle>Nossa loja</SectionTitle>
          <Galeria>
            {fotos.map((foto) => (
              <FotoLoja key={foto.id} onClick={() => setFotoAmpliada(foto.foto_url)}>
                <img src={foto.foto_url} alt="Foto da loja Construacre" />
              </FotoLoja>
            ))}
          </Galeria>
        </>
      )}

      {fotoAmpliada && (
        <Overlay onClick={() => setFotoAmpliada(null)}>
          <CloseButton onClick={() => setFotoAmpliada(null)} aria-label="Fechar">
            <X size={20} />
          </CloseButton>
          <ImagemAmpliada
            src={fotoAmpliada}
            alt="Foto ampliada"
            onClick={(e) => e.stopPropagation()}
          />
        </Overlay>
      )}
    </PageWrapper>
  )
}