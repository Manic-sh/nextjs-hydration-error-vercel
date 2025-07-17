import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url')
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 })
  }

  try {
    // Fetch the content with bypass headers
    const response = await fetch(url, {
      headers: {
        'x-vercel-protection-bypass': 'wHCRhQvc4sQbmAO0rchvVcH4NGe0jXP6',
        'x-vercel-set-bypass-cookie': 'samesitenone',
        'User-Agent': request.headers.get('user-agent') || '',
        'Referer': request.headers.get('referer') || '',
      },
    })

    const content = await response.text()
    
    // Return the content with appropriate headers
    return new NextResponse(content, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'text/html',
        'Access-Control-Allow-Origin': 'https://builder.io',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-vercel-protection-bypass, x-vercel-set-bypass-cookie',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://builder.io',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-vercel-protection-bypass, x-vercel-set-bypass-cookie',
    },
  })
} 