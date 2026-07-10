import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { jwtVerify } from 'jose'

const SECRET = process.env.AUTH_SECRET!
const COOKIE_NAME = 'admin_session'

export async function verificarSenha(senhaDigitada: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) return false
  return bcrypt.compare(senhaDigitada, hash)
}

// Usado só na criação do token (rota de login, roda em Node — pode usar jsonwebtoken)
export function criarToken(): string {
  return jwt.sign({ admin: true }, SECRET, { expiresIn: '8h' })
}

// Usado nas API routes (rodam em Node)
export function validarToken(token: string): boolean {
  try {
    jwt.verify(token, SECRET)
    return true
  } catch {
    return false
  }
}

// Usado no middleware (roda em Edge — precisa do jose)
export async function validarTokenEdge(token: string): Promise<boolean> {
  try {
    const secretKey = new TextEncoder().encode(SECRET)
    await jwtVerify(token, secretKey)
    return true
  } catch {
    return false
  }
}

export async function verificarSessao(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token) return false
  return validarToken(token)
}

export const SESSION_COOKIE_NAME = COOKIE_NAME