import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import {
  getPageUrl,
  MY_KURLY_STYLE,
  PARTNERS_PATH,
  PartnersPathType,
  USER_MENU_PATH,
  MYPAGE_PATH,
} from '../../../shared/constant';
import { amplitudeService, ScreenName } from '../../../shared/amplitude';
import { SelectProfile } from '../../../shared/amplitude/events/mykurly-style';
import { KURLY_EVENT_URL } from '../../../shared/configs/config';
import { redirectTo } from '../../../shared/reducers/page';
import Confirm from '../../../shared/components/Alert/Confirm';
import COLOR from '../../../shared/constant/colorset';
import { isPC } from '../../../../util/window/getDevice';
import { postCouponAccessKey } from '../../../shared/api/product/coupon';
import { couponKeyArray } from '../constants';
import { getSignupCouponKey } from '../../../shared/api';
import Pixel from '../../../shared/pixel/PixelService';
import { ignoreError } from '../../../shared/utils/general';
import { PIXEL_EVENT_TITLE } from '../../../shared/pixel/constants/pixelEventTitle';

const ConfirmContents = styled.div`
  text-align: left;
  font-weight: 600;
  font-size: 18px;
  color: ${COLOR.kurlyGray800};
  line-height: 21px;
  p {
    font-weight: 400;
    padding-top: 16px;
    font-size: 16px;
    color: ${COLOR.kurlyGray600};
  }
`;
const buttonStyle = `
  .swal2-html-container > div:last-of-type {
    flex-direction: column-reverse;
    margin-top: 24px;
  }
  .action-button {
    height: 48px;
    border-radius: 6px;
  }
  .action-button:first-of-type {
    margin-top: 12px;
  }
`;

const useSuccessSignup = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { externalUrl, internalUrl } = router.query as { externalUrl: string; internalUrl: string };

  const getPartnerEntry = (url: string) => {
    const entry = Object.keys(PARTNERS_PATH).filter((key: string) => {
      const { uri, mobileUri = '' } = PARTNERS_PATH[key as PartnersPathType];
      return uri === url || mobileUri === url;
    });
    return entry[0] ?? undefined;
  };

  useEffect(() => {
    ignoreError(async () => Pixel.logEvent(PIXEL_EVENT_TITLE.COMPLETE_REGISTRATION));
  }, []);

  useEffect(() => {
    if (!externalUrl && !internalUrl) {
      return;
    }

    // 파트너 회원가입인 경우
    const partnerEntry = getPartnerEntry(externalUrl || internalUrl);
    if (!partnerEntry) {
      return;
    }

    switch (partnerEntry) {
      case 'skt':
        Confirm({
          contents: (
            <ConfirmContents>
              <strong>컬리멤버스 연결 안내</strong>
              <p>
                컬리멤버스 연결페이지에서
                <br />
                컬리멤버스 이용권을 발급해주세요.
              </p>
            </ConfirmContents>
          ),
          buttonStyle,
          leftButtonText: '닫기',
          rightButtonText: '컬리멤버스 이용권 발급하기',
          showRightButton: true,
          onClickRightButton: () => dispatch(redirectTo({ url: getPageUrl(PARTNERS_PATH.skt) })),
        });
        break;
      default:
        break;
    }
  }, [dispatch, externalUrl, internalUrl]);

  const handleClickEventButton = () => {
    window.location.href = `${KURLY_EVENT_URL}/lego/event/2023/0911/join/coupon`;
  };

  const handleClickMypageButton = () => {
    dispatch(
      redirectTo({
        url: getPageUrl(isPC ? MYPAGE_PATH.orderList : USER_MENU_PATH.mykurly),
      }),
    );
  };

  const handleClickMyKurlyStyleButton = () => {
    amplitudeService.setScreenName(ScreenName.SIGN_UP_SUCCESS);
    amplitudeService.logEvent(new SelectProfile({ selectionType: 'signup_success' }));

    dispatch(
      redirectTo({
        url: getPageUrl(MY_KURLY_STYLE.myKurlyStyle),
      }),
    );
  };

  const handleClickCouponDownload = async () => {
    let couponKey = '';
    try {
      const response = await getSignupCouponKey();
      couponKey = response?.data?.key;
    } catch (err) {
      // NX에서 에러가 발생할 경우 쿠폰키를 기본값으로 설정
      // TODO 추후 API가 새로 나오면 수정 필요
      couponKey = couponKeyArray[0].key;
    }

    if (isEmpty(couponKey)) {
      return {
        type: 'error',
        message: '신규 쿠폰키가 존재하지 않습니다. 다시 확인해주세요.',
      };
    }

    const { type, message } = await postCouponAccessKey(couponKey);

    return { type, message };
  };

  return {
    handleClickEventButton,
    handleClickMypageButton,
    handleClickMyKurlyStyleButton,
    handleClickCouponDownload,
  };
};

export default useSuccessSignup;
