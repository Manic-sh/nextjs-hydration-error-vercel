import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path') || '/';
  
  // Create a client-side solution that opens the preview in a new window
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Builder.io Preview - Client Side</title>
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
        .preview-header {
            background: #007bff;
            color: white;
            padding: 15px;
            margin: -30px -30px 20px -30px;
            border-radius: 8px 8px 0 0;
        }
        .preview-content {
            min-height: 400px;
            border: 2px dashed #ccc;
            padding: 20px;
            text-align: center;
            color: #666;
        }
        .preview-button {
            background: #28a745;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
        }
        .preview-button:hover {
            background: #218838;
        }
        .iframe-container {
            width: 100%;
            height: 600px;
            border: 1px solid #ddd;
            border-radius: 4px;
            overflow: hidden;
        }
        .iframe-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    </style>
</head>
<body>
    <div class="preview-container">
        <div class="preview-header">
            <h1>Builder.io Preview - Client Side Solution</h1>
            <p>Path: ${path}</p>
        </div>
        
        <div class="preview-content">
            <h2>Preview Options</h2>
            <p>Since iframe loading is blocked by Vercel deployment protection, here are alternative preview methods:</p>
            
            <button class="preview-button" onclick="openInNewTab()">
                🔗 Open in New Tab
            </button>
            
            <button class="preview-button" onclick="openInNewWindow()">
                🪟 Open in New Window
            </button>
            
            <button class="preview-button" onclick="tryIframe()">
                📦 Try Iframe (May Not Work)
            </button>
            
            <div id="iframe-container" class="iframe-container" style="display: none; margin-top: 20px;">
                <iframe id="preview-iframe" src="about:blank"></iframe>
            </div>
        </div>
        
        <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 4px;">
            <h3>How This Works:</h3>
            <ul>
                <li><strong>New Tab/Window:</strong> Opens the preview in a separate browser context, bypassing iframe restrictions</li>
                <li><strong>Iframe Attempt:</strong> Tries to load in iframe (likely to fail due to X-Frame-Options: DENY)</li>
                <li><strong>Authentication:</strong> Uses your existing Vercel login session from the new tab/window</li>
            </ul>
        </div>
    </div>

    <script>
        function openInNewTab() {
            const targetUrl = 'https://nextjs-hydration-error-vercel-iixh6zs3m.vercel.app${path}';
            window.open(targetUrl, '_blank');
        }
        
        function openInNewWindow() {
            const targetUrl = 'https://nextjs-hydration-error-vercel-iixh6zs3m.vercel.app${path}';
            const newWindow = window.open(targetUrl, 'preview', 'width=1200,height=800,scrollbars=yes,resizable=yes');
            if (newWindow) {
                newWindow.focus();
            }
        }
        
        function tryIframe() {
            const iframeContainer = document.getElementById('iframe-container');
            const iframe = document.getElementById('preview-iframe');
            const targetUrl = 'https://nextjs-hydration-error-vercel-iixh6zs3m.vercel.app${path}';
            
            iframeContainer.style.display = 'block';
            iframe.src = targetUrl;
            
            // Check if iframe loads successfully
            iframe.onload = function() {
                console.log('Iframe loaded successfully');
            };
            
            iframe.onerror = function() {
                console.log('Iframe failed to load');
                iframeContainer.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Iframe blocked by X-Frame-Options: DENY</div>';
            };
        }
        
        // Auto-try iframe on page load
        window.onload = function() {
            setTimeout(tryIframe, 1000);
        };
    </script>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'X-Frame-Options': 'SAMEORIGIN',
      'Content-Security-Policy': "frame-ancestors 'self' *"
    },
  });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'Client-side preview endpoint',
    timestamp: new Date().toISOString()
  });
} 