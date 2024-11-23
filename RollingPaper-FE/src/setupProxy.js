// 프록시 설정 파일
// 로컬 개발환경에서 React 개발 서버와 백엔드 서버간의 요청을 프록시

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://localhost:3002",
      changeOrigin: true,
    })
  );
};
