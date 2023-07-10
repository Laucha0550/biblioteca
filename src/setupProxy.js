const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/principal.php',
    createProxyMiddleware({
      target: 'http://localhost',
      changeOrigin: true,
    })
  );
};
