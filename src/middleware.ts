import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the request is from Builder.io
  const userAgent = request.headers.get('user-agent') || ''
  const referer = request.headers.get('referer') || ''
  const isBuilderRequest = 
    userAgent.includes('builder.io') || 
    userAgent.includes('Builder.io') ||
    referer.includes('builder.io') ||
    referer.includes('cdn.builder.codes')

  // If it's a Builder.io request, add bypass headers
  if (isBuilderRequest) {
    const response = NextResponse.next()
    
    // Add the protection bypass headers using environment variable
    const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET || 'wHCRhQvc4sQbmAO0rchvVcH4NGe0jXP6'
    response.headers.set('x-vercel-protection-bypass', bypassSecret)
    response.headers.set('x-vercel-set-bypass-cookie', 'samesitenone')
    
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 
