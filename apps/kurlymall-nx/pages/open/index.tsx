import Head from 'next/head';

import AppLinkBridge from '../../src/open/components/AppLinkBridge';
import AppInstallButtons from '../../src/open/components/AppInstallButtons';
import { useAppLinkBridge } from '../../src/shared/hooks/useAppLinkBridge';

export default function Open() {
  const { uriScheme, bridgePageOn, bridgePageTitle } = useAppLinkBridge();

  return (
    <>
      <Head>
        <title>컬리로 이동하는 중입니다</title>
      </Head>
      {bridgePageOn && uriScheme ? (
        <AppInstallButtons title={bridgePageTitle} uriScheme={uriScheme} />
      ) : (
        <AppLinkBridge />
      )}
    </>
  );
}
