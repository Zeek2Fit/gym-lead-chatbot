/**
 * Dad Bod Reset - Lead Qualification Chatbot Widget
 * Embed this script on your WordPress site:
 * 
 * <script src="https://your-app.replit.dev/widget-loader.js"></script>
 * 
 * The widget will automatically appear in the bottom-right corner (desktop)
 * or fullscreen (mobile).
 */

(function() {
  // Configuration
  const WIDGET_URL = (function() {
    // Get the base URL of the script source
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
      if (script.src && script.src.includes('widget-loader')) {
        return script.src.replace('/widget-loader.js', '');
      }
    }
    return window.location.origin;
  })();

  const WIDGET_ID = 'dad-bod-reset-widget-' + Math.random().toString(36).substr(2, 9);
  const SESSION_ID = 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

  // Inject CSS
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    #${WIDGET_ID}-button {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9998;
      width: 60px;
      height: 60px;
      border: none;
      border-radius: 50%;
      background: linear-gradient(135deg, #0d9488 0%, #06b6d4 100%);
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(13, 148, 136, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 28px;
    }

    #${WIDGET_ID}-button:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 16px rgba(13, 148, 136, 0.4);
    }

    #${WIDGET_ID}-button:active {
      transform: scale(0.95);
    }

    #${WIDGET_ID}-container {
      position: fixed;
      bottom: 100px;
      right: 24px;
      z-index: 9999;
      width: 400px;
      height: 600px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      display: none;
      flex-direction: column;
      background: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      overflow: hidden;
    }

    #${WIDGET_ID}-container.open {
      display: flex;
    }

    #${WIDGET_ID}-container iframe {
      border: none;
      width: 100%;
      height: 100%;
      border-radius: 12px;
    }

    @media (max-width: 640px) {
      #${WIDGET_ID}-container {
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 0;
        z-index: 10000;
      }

      #${WIDGET_ID}-button {
        bottom: 24px;
        right: 24px;
      }
    }
  `;
  document.head.appendChild(styleSheet);

  // Create button
  const button = document.createElement('button');
  button.id = WIDGET_ID + '-button';
  button.textContent = '💬';
  button.setAttribute('aria-label', 'Open Dad Bod Reset chatbot');
  button.setAttribute('title', 'Chat with us!');

  // Create container
  const container = document.createElement('div');
  container.id = WIDGET_ID + '-container';

  // Create iframe
  const iframe = document.createElement('iframe');
  const iframeSrc = WIDGET_URL + '/?widget=true&session=' + encodeURIComponent(SESSION_ID);
  iframe.src = iframeSrc;
  iframe.setAttribute('allow', 'scripts, same-origin');

  container.appendChild(iframe);

  // Toggle widget on button click
  button.addEventListener('click', function() {
    container.classList.toggle('open');
    
    // Track widget open event
    if (container.classList.contains('open')) {
      fetch(WIDGET_URL + '/api/analytics/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType: 'widget_open',
          sessionId: SESSION_ID
        })
      }).catch(err => console.warn('Analytics tracking failed', err));
    }
  });

  // Close on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && container.classList.contains('open')) {
      container.classList.remove('open');
    }
  });

  // Inject elements when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }

  function inject() {
    document.body.appendChild(button);
    document.body.appendChild(container);
  }
})();
