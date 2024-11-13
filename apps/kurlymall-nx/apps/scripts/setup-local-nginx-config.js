'use strict';

const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

const DEFAULT_PROXY_NGINX_FILE = path.join(__dirname, '../nginx/www-proxy.location');
const WWW_NGINX_INFO = {
  default: {
    host: '$host',
    passHost: 'http://host.docker.internal:8081',
  },
  development: {
    host: 'www.dev.kurly.com',
    passHost: 'https://www.dev.kurly.com',
  },
  stage: {
    host: 'www.stg.kurly.com',
    passHost: 'https://www.stg.kurly.com',
  },
  performance: {
    host: 'www.perf.kurly.com',
    passHost: 'https://www.perf.kurly.com',
  },
};
const CAMPAIGN_NGINX_INFO = {
  development: {
    host: 'campaign.dev.kurly.com',
    passHost: 'https://campaign.dev.kurly.com',
  },
  stage: {
    host: 'campaign-stg.kurly.com',
    passHost: 'https://campaign-stg.kurly.com',
  },
  performance: {
    host: 'campaign-perf.kurly.com',
    passHost: 'https://campaign-perf.kurly.com',
  },
};

const deleteDefaultProxyNginxFile = () => {
  try {
    fs.unlinkSync(DEFAULT_PROXY_NGINX_FILE);
  } catch {}
};

/**
 * @param targetEnv {'development'|'stage'|'performance'}
 * @param phpDisabled {boolean}
 * @return {string}
 */
const getProxyNginxFileOutput = (targetEnv, phpDisabled) => {
  const env = phpDisabled ? targetEnv : 'default';
  const { host, passHost } = WWW_NGINX_INFO[env];
  const campaignConfig = CAMPAIGN_NGINX_INFO[env];

  return `
location / {
  proxy_set_header Host ${host};
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_pass ${passHost};
}
`.concat(
    campaignConfig
      ? `
location /campaign {
  rewrite ^/campaign(/.*)$ $1 break;
  proxy_set_header Host ${campaignConfig.host};
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_pass ${campaignConfig.passHost};
}
`
      : '',
  );
};

const run = () => {
  deleteDefaultProxyNginxFile();
  const proxyNginxDefault = getProxyNginxFileOutput(
    process.env.NEXT_PUBLIC_STAGE,
    /^true$/i.test(process.env.LOCAL_PHP_SERVER_DISABLED),
  );
  fs.writeFileSync(DEFAULT_PROXY_NGINX_FILE, proxyNginxDefault);
};

run();
