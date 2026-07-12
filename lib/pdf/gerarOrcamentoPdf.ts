import jsPDF from 'jspdf'
import type { ItemOrcamento } from '@/lib/cart/CartContext'

async function urlParaBase64(url: string): Promise<string | null> {
  try {
    const response = await fetch(url)
    const blob = await response.blob()
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

export async function gerarOrcamentoPdf(itens: ItemOrcamento[]) {
  const doc = new jsPDF()
  const dataAtual = new Date().toLocaleDateString('pt-BR')

  doc.setFontSize(16)
  doc.setTextColor(20, 83, 45)
  doc.text('Construacre - Orcamento', 14, 20)

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Data: ${dataAtual}`, 14, 27)
  doc.text('Rua Absolon Moreira, 128 - Centro, Cruzeiro do Sul - AC', 14, 32)

  let y = 45
  const imgSize = 20

  doc.setFillColor(21, 128, 61)
  doc.rect(14, y, 182, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(10)
  doc.text('Foto', 18, y + 6)
  doc.text('Produto', 45, y + 6)
  doc.text('Codigo', 130, y + 6)
  doc.text('Qtd', 172, y + 6)
  y += 12

  doc.setTextColor(0, 0, 0)

  for (const item of itens) {
    if (y > 255) {
      doc.addPage()
      y = 20
    }

    if (item.fotoUrl) {
      const base64 = await urlParaBase64(item.fotoUrl)
      if (base64) {
        try {
          doc.addImage(base64, 'JPEG', 16, y, imgSize, imgSize)
        } catch {
          // segue sem a imagem se falhar
        }
      }
    }

    doc.setFontSize(10)
    doc.text(item.nome, 45, y + 12, { maxWidth: 80 })
    doc.text(`COD ${item.codigoInterno}`, 130, y + 12)
    doc.text(String(item.quantidade), 174, y + 12)

    y += imgSize + 8
    doc.setDrawColor(230)
    doc.line(14, y - 4, 196, y - 4)
  }

  doc.save(`orcamento-construacre-${Date.now()}.pdf`)
}