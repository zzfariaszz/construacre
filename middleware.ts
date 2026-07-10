import { NextRequest, NextResponse } from 'next/server'
import { validarTokenEdge } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_session')?.value

  if (!token || !(await validarTokenEdge(token))) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/dashboard/:path*',
}