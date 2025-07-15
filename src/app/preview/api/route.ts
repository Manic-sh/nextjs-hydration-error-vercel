import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  try {
    // Get the path from the URL or use a default
    const path = searchParams.get('path') || '/';
    
    // Create headers for the target request with SameSite=None cookies
    const targetHeaders = new Headers();
    targetHeaders.set('x-vercel-set-bypass-cookie', 'samesitenone');
    targetHeaders.set('User-Agent', request.headers.get('user-agent') || 'Mozilla/5.0 (compatible; Builder.io/1.0)');
    targetHeaders.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    targetHeaders.set('Accept-Language', 'en-US,en;q=0.5');
    targetHeaders.set('Accept-Encoding', 'gzip, deflate, br');
    targetHeaders.set('Cache-Control', 'no-cache');
    targetHeaders.set('Pragma', 'no-cache');
    
    // Forward all cookies with SameSite=None to share authentication state
    const cookie = request.headers.get('cookie');
    if (cookie) {
      targetHeaders.set('Cookie', cookie);
    }
    
    // Set referer to help with authentication
    const referer = request.headers.get('referer');
    if (referer) {
      targetHeaders.set('Referer', referer);
    }

    // Construct the target URL for your Vercel deployment
    const targetUrl = `https://nextjs-hydration-error-vercel-iixh6zs3m.vercel.app${path}`;
    
    // Add all Builder.io query parameters to the target URL
    const targetUrlObj = new URL(targetUrl);
    searchParams.forEach((value, key) => {
      if (key !== 'path') {
        targetUrlObj.searchParams.set(key, value);
      }
    });

    console.log('Fetching with SameSite=None cookies:', targetUrlObj.toString());

    const response = await fetch(targetUrlObj.toString(), {
      headers: targetHeaders,
    });

    console.log('Response status:', response.status);

    const contentType = response.headers.get('content-type');
    const body = await response.text();

    // Create response headers for iframe compatibility with SameSite=None
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType || 'text/html; charset=utf-8');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    responseHeaders.set('Access-Control-Allow-Credentials', 'true');
    
    // Override headers that block iframe loading
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Content-Security-Policy', "frame-ancestors 'self' *");
    
    // Set SameSite=None cookies to share authentication state
    responseHeaders.set('Set-Cookie', '_vercel_sso_nonce=shared; SameSite=None; Secure; HttpOnly');

    return new NextResponse(body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Preview error:', error);
    
    // If there's an error, serve a fallback HTML that explains the issue
    const fallbackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Builder.io Preview - Authentication Required</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: Arial, sans-serif; 
            background: #f5f5f5;
        }
        .preview-container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .auth-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            color: #856404;
            padding: 15px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .solution {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
            padding: 15px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <h1>Builder.io Preview - Authentication Issue</h1>
        <div class="auth-notice">
            <h3>⚠️ Authentication Required</h3>
            <p>The preview is blocked by Vercel deployment protection. This is happening because:</p>
            <ul>
                <li>Your Vercel deployment has protection enabled</li>
                <li>The iframe context is separate from your main browser session</li>
                <li>Authentication cookies are not being shared properly</li>
            </ul>
        </div>
        <div class="solution">
            <h3>🔧 Solutions:</h3>
            <ol>
                <li><strong>Disable Deployment Protection:</strong> Go to Vercel dashboard → Project Settings → Security → Disable "Deployment Protection"</li>
                <li><strong>Use a Different Preview URL:</strong> Deploy to a staging environment without protection</li>
                <li><strong>Configure Protection:</strong> Allow API routes in deployment protection settings</li>
            </ol>
        </div>
        <p><strong>Error Details:</strong> ${error instanceof Error ? error.message : 'Unknown error'}</p>
    </div>
</body>
</html>`;

    return new NextResponse(fallbackHtml, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'X-Frame-Options': 'SAMEORIGIN',
        'Content-Security-Policy': "frame-ancestors 'self' *"
      },
    });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  try {
    const body = await request.text();
    
    // Create headers for the target request with SameSite=None cookies
    const targetHeaders = new Headers();
    targetHeaders.set('x-vercel-set-bypass-cookie', 'samesitenone');
    targetHeaders.set('Content-Type', request.headers.get('content-type') || 'application/json');
    targetHeaders.set('User-Agent', request.headers.get('user-agent') || 'Mozilla/5.0 (compatible; Builder.io/1.0)');
    targetHeaders.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    targetHeaders.set('Accept-Language', 'en-US,en;q=0.5');
    targetHeaders.set('Accept-Encoding', 'gzip, deflate, br');
    
    // Forward all cookies with SameSite=None to share authentication state
    const cookie = request.headers.get('cookie');
    if (cookie) {
      targetHeaders.set('Cookie', cookie);
    }
    
    // Set referer to help with authentication
    const referer = request.headers.get('referer');
    if (referer) {
      targetHeaders.set('Referer', referer);
    }

    // Construct the target URL for your Vercel deployment
    const targetUrl = `https://nextjs-hydration-error-vercel-iixh6zs3m.vercel.app${path}`;
    
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

    // Create response headers for iframe compatibility with SameSite=None
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', contentType || 'text/html; charset=utf-8');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    responseHeaders.set('Access-Control-Allow-Credentials', 'true');
    
    // Override headers that block iframe loading
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Content-Security-Policy', "frame-ancestors 'self' *");
    
    // Set SameSite=None cookies to share authentication state
    responseHeaders.set('Set-Cookie', '_vercel_sso_nonce=shared; SameSite=None; Secure; HttpOnly');

    return new NextResponse(responseBody, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Preview POST error:', error);
    return NextResponse.json({ 
      error: 'Failed to handle preview POST request',
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
      'Access-Control-Allow-Credentials': 'true',
    },
  });
} 
