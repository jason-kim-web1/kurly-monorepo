import router from 'next/router';

import { useDispatch } from 'react-redux';

import { RefObject, useRef } from 'react';

import Alert from '../../../shared/components/Alert/Alert';
import { KAKAO_SHARE_KEY } from '../../../shared/configs/config';
import useLoadKakao from '../../../shared/hooks/useLoadKakao';
import { useAppSelector } from '../../../shared/store';
import { COMMON_PATH, getPageUrl } from '../../../shared/constant';
import { isWebview } from '../../../../util/window/getDevice';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { redirectTo } from '../../../shared/reducers/page';

export default function useFriendBenefitShare() {
  useLoadKakao();

  const dispatch = useDispatch();

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const userId = useAppSelector(({ member }) => member.info?.id);

  const joinInputRef = useRef<HTMLInputElement>(null);
  const eventInputRef = useRef<HTMLInputElement>(null);

  const handleClickKaKaoShare = async (kakaoTemplateId: number) => {
    if (isGuest) {
      const text = '본 이벤트는 로그인 후 참여 가능합니다. 로그인 하시겠습니까?';
      const { isDismissed } = await Alert({ text, showCancelButton: true });

      if (isDismissed) {
        return;
      }

      if (isWebview()) {
        location.href = deepLinkUrl.LOGIN;
        return;
      }
      dispatch(
        redirectTo({
          url: getPageUrl(COMMON_PATH.login),
          query: {
            internalUrl: router.asPath,
          },
        }),
      );
    }

    const kakao = window.Kakao;

    if (!kakao) {
      await Alert({ text: '현재 카카오톡 공유하기를 사용할 수 없습니다.' });
      return;
    }
    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_SHARE_KEY);
    }

    kakao.Share.sendCustom({
      templateId: kakaoTemplateId,
      templateArgs: {
        userID: userId,
      },
      installTalk: true,
    });
  };

  const handleClickLinkShare = async (shareInputRef: RefObject<HTMLInputElement>) => {
    if (!shareInputRef.current) {
      return;
    }
    shareInputRef.current.select();
    document.execCommand('copy');
    await Alert({
      text: '단축url이 클립보드에 복사되었습니다.',
    });
  };

  return {
    joinInputRef,
    eventInputRef,
    handleClickKaKaoShare,
    handleClickLinkShare,
  };
}
