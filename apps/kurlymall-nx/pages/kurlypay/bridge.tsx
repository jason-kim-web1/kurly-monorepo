import Head from 'next/head';

import KurlypayBridge from '../../src/kurlypay/components/KurlypayBridge';

export default function Bridge() {
  return (
    <>
      <Head>
        <title>컬리페이로 이동중입니다</title>
      </Head>
      <KurlypayBridge />
    </>
  );
}
