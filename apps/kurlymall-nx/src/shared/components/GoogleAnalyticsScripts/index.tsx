import Script from 'next/script';

import { GA_INIT_KEY } from '../../configs/config';

interface Props {
  uid: string;
}

const GoogleAnalyticsScripts = ({ uid }: Props) => {
  return (
    <>
      <Script id="google-tag-manager" src={`https://www.googletagmanager.com/gtag/js?id=${GA_INIT_KEY}`} />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_INIT_KEY}', { 'user_id': '${uid}', 'debug_mode':true });
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalyticsScripts;
