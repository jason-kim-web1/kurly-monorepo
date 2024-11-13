import { useEffect } from 'react';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import { useScreenName, useWebview } from '../../../../src/shared/hooks';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import { ScreenName } from '../../../../src/shared/amplitude';
import { PagingContextProvider } from '../../../../src/board/context/PagingContext';
import MobileNoticeListContainer from '../../../../src/board/containers/m/NoticeListContainer';

export default function NoticeBoardList() {
  useScreenName(ScreenName.NOTICE_LIST);

  const webview = useWebview();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('공지사항');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>공지사항</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}
      <PagingContextProvider>
        <MobileNoticeListContainer />
      </PagingContextProvider>

      {!webview && <UserMenu />}
    </>
  );
}
