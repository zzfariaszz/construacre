'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react'

const PageWrapper = styled.div`
  max-width: 1000px;
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
  margin: 0 0 32px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`

const InfoCard = styled.div`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
`

const InfoLinha = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`

const InfoIcon = styled.div`
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

const InfoTextWrapper = styled.div``

const InfoTitulo = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 2px;
`

const InfoTexto = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
  line-height: 1.5;
`

const MapaWrapper = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  height: 280px;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`

const FormCard = styled.form`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 24px;
`

const FormTitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 18px;
`

const Field = styled.div`
  margin-bottom: 14px;
`

const Label = styled.label`
  display: block;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 6px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const SubmitButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
  }
`

export default function ContatoPage() {
  const [nome, setNome] = useState('')
  const [telefone, setTelefone] = useState('')
  const [mensagem, setMensagem] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const texto = `Olá! Meu nome é ${nome}.\nTelefone: ${telefone}\n\n${mensagem}`
    const link = `https://wa.me/5568999238467?text=${encodeURIComponent(texto)}`

    window.open(link, '_blank')
  }

  return (
    <PageWrapper>
      <Title>Entre em contato</Title>
      <Subtitle>Fale com a gente pelo formulário, WhatsApp ou visite nossa loja</Subtitle>

      <Grid>
        <div>
          <InfoCard>
            <InfoLinha>
              <InfoIcon>
                <MapPin size={18} />
              </InfoIcon>
              <InfoTextWrapper>
                <InfoTitulo>Endereço</InfoTitulo>
                <InfoTexto>
                  Rua Absolon Moreira, 128 - Centro
                  <br />
                  Cruzeiro do Sul - AC, 69980-000
                </InfoTexto>
              </InfoTextWrapper>
            </InfoLinha>

            <InfoLinha>
              <InfoIcon>
                <Phone size={18} />
              </InfoIcon>
              <InfoTextWrapper>
                <InfoTitulo>WhatsApp</InfoTitulo>
                <InfoTexto>(68) 99923-8467</InfoTexto>
              </InfoTextWrapper>
            </InfoLinha>

            <InfoLinha>
              <InfoIcon>
                <Mail size={18} />
              </InfoIcon>
              <InfoTextWrapper>
                <InfoTitulo>E-mail</InfoTitulo>
                <InfoTexto>
                  construacre@hotmail.com
                  <br />
                  construacrepedidos@hotmail.com
                </InfoTexto>
              </InfoTextWrapper>
            </InfoLinha>

            <InfoLinha>
              <InfoIcon>
                <Clock size={18} />
              </InfoIcon>
              <InfoTextWrapper>
                <InfoTitulo>Horário de atendimento</InfoTitulo>
                <InfoTexto>
                  Seg a Sex: 07:30 às 17:30
                  <br />
                  Sáb: 07:30 às 12:30
                </InfoTexto>
              </InfoTextWrapper>
            </InfoLinha>
          </InfoCard>

          <MapaWrapper>
            <iframe
              src="https://www.google.com/maps?q=Rua+Absolon+Moreira,+128+-+Centro,+Cruzeiro+do+Sul+-+AC,+69980-000&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Construacre"
            />
          </MapaWrapper>
        </div>

        <FormCard onSubmit={handleSubmit}>
          <FormTitle>Envie uma mensagem</FormTitle>

          <Field>
            <Label>Nome</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </Field>

          <Field>
            <Label>Telefone</Label>
            <Input
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(68) 99999-9999"
              required
            />
          </Field>

          <Field>
            <Label>Mensagem</Label>
            <Textarea
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              placeholder="Como podemos ajudar?"
              required
            />
          </Field>

          <SubmitButton type="submit">
            <Send size={16} />
            Enviar via WhatsApp
          </SubmitButton>
        </FormCard>
      </Grid>
    </PageWrapper>
  )
}