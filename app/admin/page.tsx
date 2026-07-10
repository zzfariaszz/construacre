'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { Lock } from 'lucide-react'

const Wrapper = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

const Card = styled.form`
  background: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 32px;
  max-width: 360px;
  width: 100%;
`

const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.primaryDark};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
`

const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.heading};
  font-weight: 600;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin: 0 0 20px;
`

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 14px;
  margin-bottom: 12px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const ErrorMsg = styled.p`
  color: #dc2626;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 13px;
  margin: 0 0 12px;
  text-align: center;
`

export default function AdminLoginPage() {
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ senha }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErro(data.error ?? 'Erro ao entrar')
        setCarregando(false)
        return
      }

      router.push('/admin/dashboard')
      router.refresh()
    } catch {
      setErro('Erro de conexão. Tente novamente.')
      setCarregando(false)
    }
  }

  return (
    <Wrapper>
      <Card onSubmit={handleSubmit}>
        <IconWrapper>
          <Lock size={22} />
        </IconWrapper>
        <Title>Acesso ao painel</Title>

        {erro && <ErrorMsg>{erro}</ErrorMsg>}

        <Input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          autoFocus
        />

        <Button type="submit" disabled={carregando}>
          {carregando ? 'Entrando...' : 'Entrar'}
        </Button>
      </Card>
    </Wrapper>
  )
}