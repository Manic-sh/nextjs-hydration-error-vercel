import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  // Prevent circular reference - don't proxy requests to our own proxy
  if (targetUrl.includes('/api/proxy')) {
    return NextResponse.json({ error: 'Circular proxy reference detected' }, { status: 400 });
  }

  try {
    // Forward all query parameters from the original request to the target URL
    const originalUrl = new URL(request.url);
    const targetUrlObj = new URL(targetUrl);
    
    // Copy all query parameters except 'url' to the target URL
    originalUrl.searchParams.forEach((value, key) => {
      if (key !== 'url') {
        targetUrlObj.searchParams.set(key, value);
      }
    });

    const response = await fetch(targetUrlObj.toString(), {
      headers: {
        'x-vercel-set-bypass-cookie': 'samesitenone',
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept': request.headers.get('accept') || '*/*',
        'Accept-Language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
        'Accept-Encoding': request.headers.get('accept-encoding') || 'gzip, deflate, br',
        'Cache-Control': request.headers.get('cache-control') || 'no-cache',
        'Pragma': request.headers.get('pragma') || 'no-cache',
        // Forward Builder.io specific headers
        'Cookie': request.headers.get('cookie') || '',
        'Referer': request.headers.get('referer') || '',
      },
    });

    const contentType = response.headers.get('content-type');
    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': contentType || 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch target URL' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  // Prevent circular reference
  if (targetUrl.includes('/api/proxy')) {
    return NextResponse.json({ error: 'Circular proxy reference detected' }, { status: 400 });
  }

  try {
    const body = await request.text();
    
    // Forward all query parameters from the original request to the target URL
    const originalUrl = new URL(request.url);
    const targetUrlObj = new URL(targetUrl);
    
    // Copy all query parameters except 'url' to the target URL
    originalUrl.searchParams.forEach((value, key) => {
      if (key !== 'url') {
        targetUrlObj.searchParams.set(key, value);
      }
    });

    const response = await fetch(targetUrlObj.toString(), {
      method: 'POST',
      body,
      headers: {
        'x-vercel-set-bypass-cookie': 'samesitenone',
        'Content-Type': request.headers.get('content-type') || 'application/json',
        'User-Agent': request.headers.get('user-agent') || '',
        'Accept': request.headers.get('accept') || '*/*',
        'Accept-Language': request.headers.get('accept-language') || 'en-US,en;q=0.9',
        'Accept-Encoding': request.headers.get('accept-encoding') || 'gzip, deflate, br',
        // Forward Builder.io specific headers
        'Cookie': request.headers.get('cookie') || '',
        'Referer': request.headers.get('referer') || '',
      },
    });

    const contentType = response.headers.get('content-type');
    const responseBody = await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        'Content-Type': contentType || 'text/html',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'X-Frame-Options': 'SAMEORIGIN',
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch target URL' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
} 
