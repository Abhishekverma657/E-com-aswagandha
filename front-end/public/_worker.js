export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Intercept requests to /api/ and proxy them to the backend server
    if (url.pathname.startsWith('/api/')) {
      const targetUrl = new URL(url.pathname + url.search, 'http://200.97.162.78:5048');
      
      // Clone the request to modify headers safely
      const proxyRequest = new Request(targetUrl, request);
      
      // Remove headers that might cause the backend to reject the request
      proxyRequest.headers.delete('origin');
      proxyRequest.headers.delete('referer');

      // Fetch from backend (Cloudflare Workers allow fetching HTTP targets)
      let response = await fetch(proxyRequest);
      
      // Add CORS headers just in case
      response = new Response(response.body, response);
      response.headers.set('Access-Control-Allow-Origin', '*');
      
      return response;
    }

    // Serve static frontend assets for all other routes
    return env.ASSETS.fetch(request);
  }
};
