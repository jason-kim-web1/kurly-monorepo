import { useRouter } from 'next/router';

import styled from '@emotion/styled';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import FormsContainer from './FormsContainer';
import TopInfo from '../../components/pc/TopInfo';
import MobileTopInfo from '../../components/m/MobileTopInfo';
import Alert from '../../../../shared/components/Alert/Alert';
import { BULK_ORDER_GOOGLE_FORM_LINK } from '../../../../header/constants';
import Button from '../../../../shared/components/Button/Button';
import { USER_MENU_PATH } from '../../../../shared/constant';
import { redirectTo } from '../../../../shared/reducers/page';
import { ErrorIconImg } from '../../../../../src/shared/images';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectMyKurlyBulkOrder } from '../../../../shared/amplitude/events/mypage';

const Container = styled.div<{ isPC: boolean }>`
  ${({ isPC }) =>
    isPC
      ? `
     width: 820px;
     margin: 0 auto;
  `
      : `
    overflow: hidden;
    width: 100%;
    background-color: ${COLOR.bg};
  `}
`;

const AlertContent = styled.div<{ isPC: boolean }>`
  p {
    margin-bottom: 40px;
    font-size: 15px;
    font-weight: normal;
    &:before {
      content: '';
      display: block;
      width: 54px;
      height: 54px;
      margin: 0 auto 20px;
      background: url(${ErrorIconImg}) no-repeat 50% 50%;
    }
  }
  button {
    margin-bottom: ${({ isPC }) => (isPC ? 0 : '24px')};
  }
`;

export default function BulkOrderContainer({ isPC = true }: { isPC?: boolean }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const goGoogleFormAndMain = () => {
    window.open(BULK_ORDER_GOOGLE_FORM_LINK, '_blank');
    dispatch(redirectTo({ url: USER_MENU_PATH.home.uri, replace: true }));
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    amplitudeService.logEvent(new SelectMyKurlyBulkOrder());

    Alert({
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      contents: (
        <AlertContent isPC={isPC}>
          <p>대량주문 관련 문의는 구글폼으로 부탁드립니다.</p>
          <Button theme="primary" text="문의하기" radius={6} onClick={goGoogleFormAndMain} />
        </AlertContent>
      ),
    });
  }, [router, dispatch]);

  return (
    <Container isPC={isPC}>
      {router.isReady && (
        <>
          {isPC ? <TopInfo /> : <MobileTopInfo />}
          <FormsContainer isPC={isPC} />
        </>
      )}
    </Container>
  );
}
