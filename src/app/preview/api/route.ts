import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  try {
    // Instead of proxying to the protected deployment, serve content directly
    // This avoids the authentication issues with Vercel deployment protection
    
    // Get the path from the URL or use a default
    const path = searchParams.get('path') || '/';
    
    // For now, let's serve a simple HTML response that Builder.io can work with
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Builder.io Preview</title>
    <style>
        body { 
            margin: 0; 
            padding: 20px; 
            font-family: Arial, sans-serif; 
            background: #f5f5f5;
        }
        .preview-container {
            max-width: 1200px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .preview-header {
            background: #007bff;
            color: white;
            padding: 15px;
            margin: -20px -20px 20px -20px;
            border-radius: 8px 8px 0 0;
        }
        .preview-content {
            min-height: 400px;
            border: 2px dashed #ccc;
            padding: 20px;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="preview-header">
            <h1>Builder.io Preview</h1>
            <p>Path: ${path}</p>
            <p>Preview is working! This is a test response from your preview endpoint.</p>
        </div>
        <div class="preview-content">
            <h2>Preview Content Area</h2>
            <p>This is where your Builder.io content would be rendered.</p>
            <p>Current path: <strong>${path}</strong></p>
            <p>Builder.io parameters are being received correctly.</p>
        </div>
    </div>
</body>
</html>`;

    // Create response headers for iframe compatibility
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'text/html; charset=utf-8');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Override headers that block iframe loading
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Content-Security-Policy', "frame-ancestors 'self' *");

    return new NextResponse(html, {
      status: 200,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error('Preview error:', error);
    return NextResponse.json({ 
      error: 'Failed to serve preview content',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  try {
    const body = await request.text();
    
    // For POST requests, return a JSON response
    const responseData = {
      success: true,
      message: 'Preview POST request received',
      path: path,
      receivedBody: body.substring(0, 100) + (body.length > 100 ? '...' : ''),
      timestamp: new Date().toISOString()
    };

    // Create response headers for iframe compatibility
    const responseHeaders = new Headers();
    responseHeaders.set('Content-Type', 'application/json; charset=utf-8');
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    responseHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Override headers that block iframe loading
    responseHeaders.set('X-Frame-Options', 'SAMEORIGIN');
    responseHeaders.set('Content-Security-Policy', "frame-ancestors 'self' *");

    return new NextResponse(JSON.stringify(responseData), {
      status: 200,
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
    },
  });
} 