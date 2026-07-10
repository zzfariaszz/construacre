'use client'

import styled from 'styled-components'

const FloatingButton = styled.a`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  /* use a safe cast to avoid DefaultTheme type errors if colors isn't declared */
  background: ${(props) => ((props.theme as any)?.colors?.whatsapp || '#25D366')};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 100;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 16px;
    right: 16px;
  }
`

export default function WhatsAppButton() {
  const numero = '5568999238467'
  const mensagem = 'Olá! Vim pelo site da Construacre e gostaria de mais informações.'
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`

  return (
    <FloatingButton href={link} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.79 14.09c-.24.68-1.19 1.24-1.95 1.4-.52.11-1.2.2-3.48-.75-2.92-1.21-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.43.75-2.13 1.02-2.42.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2.01.9 2.15.07.15.12.32.02.51-.09.19-.14.31-.28.48-.14.16-.29.36-.42.49-.14.14-.28.28-.12.55.16.28.71 1.17 1.53 1.9 1.05.94 1.94 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.18-.28.36-.23.62-.14.25.09 1.6.75 1.87.89.27.14.45.21.51.32.07.11.07.66-.17 1.34z" />
      </svg>
    </FloatingButton>
  )
}