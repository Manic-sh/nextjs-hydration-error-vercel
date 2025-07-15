import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Get the path from the URL or use a default
  const path = searchParams.get('path') || '/';
  
  // Construct the target URL for your Vercel deployment
  const targetUrl = `https://nextjs-hydration-error-vercel-40x0pie45.vercel.app${path}`;
  
  try {
    // Create headers for the target request
    const targetHeaders = new Headers();
    targetHeaders.set('x-vercel-set-bypass-cookie', 'samesitenone');
    targetHeaders.set('User-Agent', request.headers.get('user-agent') || 'Mozilla/5.0 (compatible; Builder.io/1.0)');
    targetHeaders.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    targetHeaders.set('Accept-Language', 'en-US,en;q=0.5');
    targetHeaders.set('Accept-Encoding', 'gzip, deflate, br');
    targetHeaders.set('Cache-Control', 'no-cache');
    targetHeaders.set('Pragma', 'no-cache');
    
    // Forward Builder.io specific headers
    const cookie = request.headers.get('cookie');
    if (cookie) {
      targetHeaders.set('Cookie', cookie);
    }
    
    const referer = request.headers.get('referer');
    if (referer) {
      targetHeaders.set('Referer', referer);
    }

    // Add all Builder.io query parameters to the target URL
    const targetUrlObj = new URL(targetUrl);
    searchParams.forEach((value, key) => {
      if (key !== 'path') {
        targetUrlObj.searchParams.set(key, value);
      }
    });

    console.log('Fetching:', targetUrlObj.toString());

    const response = await fetch(targetUrlObj.toString(), {
      headers: targetHeaders,
    });

    console.log('Response status:', response.status);

    const contentType = response.headers.get('content-type');
    const body = await response.text();

    // Create response headers for iframe compatibility
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType || 'text/html; charset=utf-8');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Override headers that block iframe loading
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Content-Security-Policy', "frame-ancestors 'self' *");

    return new NextResponse(body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Preview proxy error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch preview content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  const targetUrl = `https://nextjs-hydration-error-vercel-40x0pie45.vercel.app${path}`;
  
  try {
    const body = await request.text();
    
    // Create headers for the target request
    const targetHeaders = new Headers();
    targetHeaders.set('x-vercel-set-bypass-cookie', 'samesitenone');
    targetHeaders.set('Content-Type', request.headers.get('content-type') || 'application/json');
    targetHeaders.set('User-Agent', request.headers.get('user-agent') || 'Mozilla/5.0 (compatible; Builder.io/1.0)');
    targetHeaders.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    targetHeaders.set('Accept-Language', 'en-US,en;q=0.5');
    targetHeaders.set('Accept-Encoding', 'gzip, deflate, br');
    
    // Forward Builder.io specific headers
    const cookie = request.headers.get('cookie');
    if (cookie) {
      targetHeaders.set('Cookie', cookie);
    }
    
    const referer = request.headers.get('referer');
    if (referer) {
      targetHeaders.set('Referer', referer);
    }

    // Add all Builder.io query parameters to the target URL
    const targetUrlObj = new URL(targetUrl);
    searchParams.forEach((value, key) => {
      if (key !== 'path') {
        targetUrlObj.searchParams.set(key, value);
      }
    });

    const response = await fetch(targetUrlObj.toString(), {
      method: 'POST',
      body,
      headers: targetHeaders,
    });

    const contentType = response.headers.get('content-type');
    const responseBody = await response.text();

    // Create response headers for iframe compatibility
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType || 'text/html; charset=utf-8');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Override headers that block iframe loading
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Content-Security-Policy', "frame-ancestors 'self' *");

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Preview proxy error:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch preview content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
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