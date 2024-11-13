import { useEffect } from 'react';

import { useScreenName, useWebview } from '../../../../../src/shared/hooks';

import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../../src/shared/services/app.service';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../../src/shared/containers/m/CartButtonContainer';
import BulkOrderContainer from '../../../../../src/mypage/bulk-order/shared/container/BulkOrderContainer';
import UserMenu from '../../../../../src/shared/components/layouts/UserMenu';
import { ScreenName } from '../../../../../src/shared/amplitude';

export default function BulkOrderInquiryPage() {
  useScreenName(ScreenName.BULK_ORDER_INQUIRY);

  const webview = useWebview();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('대량주문 문의');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>대량주문 문의</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}

      <BulkOrderContainer isPC={false} />
      {!webview && <UserMenu />}
    </>
  );
}
