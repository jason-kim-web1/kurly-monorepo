import { useCallback } from 'react';

import { useRouter } from 'next/router';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import UpdateContainer from '../../../../src/shared/containers/m/address/UpdateContainer';
import { ParsedUrlQuery } from 'querystring';

export default function ShippingAddressUpdatePage() {
  const router = useRouter();
  const { isMypage } = router.query as ParsedUrlQuery & { isMypage?: string };

  const handleBackButton = useCallback(() => {
    if (isMypage) {
      window.parent.postMessage({ source: 'closeAddressSearch' }, window.location.href);
    } else {
      window.history.back();
    }
  }, [isMypage]);

  return (
    <>
      <MobileHeader>
        <HeaderButtons position="left">
          <BackButton onClick={handleBackButton} />
        </HeaderButtons>
        <HeaderTitle>배송지</HeaderTitle>
      </MobileHeader>
      <UpdateContainer />
    </>
  );
}
