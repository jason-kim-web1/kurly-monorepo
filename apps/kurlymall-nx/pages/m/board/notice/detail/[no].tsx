import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import { useScreenName, useWebview } from '../../../../../src/shared/hooks';
import { isWebview } from '../../../../../util/window/getDevice';
import { ParsedUrlQuery } from 'querystring';
import appService from '../../../../../src/shared/services/app.service';
import HeaderTitle from '../../../../../src/shared/components/layouts/HeaderTitle';

import { ScreenName } from '../../../../../src/shared/amplitude';

import MobileHeader from '../../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../../src/shared/components/layouts/HeaderButtons';
import UserMenu from '../../../../../src/shared/components/layouts/UserMenu';
import Alert from '../../../../../src/shared/components/Alert/Alert';
import BackButton from '../../../../../src/shared/components/Button/BackButton';
import CartButtonContainer from '../../../../../src/shared/containers/m/CartButtonContainer';
import NoticeDetailContainer from '../../../../../src/board/containers/m/NoticeDetailContainer';

export default function NoticeBoardDetail() {
  useScreenName(ScreenName.NOTICE_DETAIL);

  const webview = useWebview();
  const router = useRouter();
  const dispatch = useDispatch();
  const { no } = router.query as ParsedUrlQuery & { no: string };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (!no) {
      Alert({
        text: '존재하지 않거나, 열람 할 수 없는 게시물 입니다.',
      }).then(() => {
        router.back();
      });
    }

    if (isWebview()) {
      appService.changeTitle('공지사항');
    }
  }, [dispatch, no, router]);

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

      {no && <NoticeDetailContainer noticeNo={no} />}

      {!webview && <UserMenu />}
    </>
  );
}
