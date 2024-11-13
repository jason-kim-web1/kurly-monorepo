const dotenv = require('dotenv');
dotenv.config({
  path: '.env.local',
});
const hostPostfixes = {
  production: '',
  stage: '.stg',
  development: '.dev',
  performance: '.perf',
};
const hostPostfix = hostPostfixes[process.env.NEXT_PUBLIC_STAGE || 'development'];
const host = 'www.local.kurly.com';

/** @type {import('local-dev-proxy').LocalDevProxyOption} */
module.exports = {
  language: 'ko',
  rule: {
    // https: true,
    key: 'kurlymall-nx',
    priority: 1,
    host,
    path: /^\/(?:mock|nx|__?next|introduce|order|address|gift|policy|mypage|webview|main|cart|goods|member|user-terms|user-guide|category|market-benefit|goods-list|beauty-benefit|beauty-event|search|board|collections|categories|collection-groups|m\/|images\/|manifest\.json|service-worker\.js|sitemap|naver|partners|popup|events|\.well-known|apple-app-site-association|devtools|games|redirect|kurlypay|open)/,
  },
  subRules: [
    {
      key: 'campaign',
      priority: 2,
      host,
      path: /^\/campaign/,
      pathRewrite: {
        '^/campaign': '',
      },
      targetOrigin: `https://campaign${hostPostfix.replace(/\.(stg|perf)/, '-$1')}.kurly.com`,
    },
    {
      key: 'www-v2',
      priority: 3,
      host,
      targetOrigin: `https://www${hostPostfix}.kurly.com`,
    },
  ],
  // 로컬 www-v2 사용시 아래 내용으로 대체
  // subRules: [
  //   {
  //     key: 'www-v2',
  //     priority: 2,
  //     host,
  //     target: `http://localhost:8081`,
  //   },
  // ],
};
