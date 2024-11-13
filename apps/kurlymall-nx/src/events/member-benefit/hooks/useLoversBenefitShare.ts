import { RefObject, useRef } from 'react';

import { LOVERS_BENEFIT_SHARE } from '../constants';
import Alert from '../../../shared/components/Alert/Alert';
import { KAKAO_SHARE_KEY } from '../../../shared/configs/config';
import useLoadKakao from '../../../shared/hooks/useLoadKakao';

export default function useLoversBenefitShare() {
  useLoadKakao();

  const linkInputRef = useRef<HTMLInputElement>(null);

  const { shareTitle, imageUrl, imageWidth, imageHeight, buttonTitle, linkUrl } = LOVERS_BENEFIT_SHARE;

  const handleClickKaKaoShare = async () => {
    const kakao = window.Kakao;

    if (!kakao) {
      await Alert({ text: '현재 카카오톡 공유하기를 사용할 수 없습니다.' });
      return;
    }
    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_SHARE_KEY);
    }

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        imageUrl: imageUrl,
        imageWidth: imageWidth,
        imageHeight: imageHeight,
        link: {
          mobileWebUrl: linkUrl,
          webUrl: linkUrl,
        },
      },
      buttons: [
        {
          title: buttonTitle,
          link: {
            mobileWebUrl: linkUrl,
            webUrl: linkUrl,
          },
        },
      ],
      installTalk: true,
    });
  };

  const handleClickBlogShare = () => {
    const encodeUrl = encodeURIComponent(location.href);
    const encodeTitle = encodeURIComponent(shareTitle);
    const openUrl = `https://blog.naver.com/openapi/share?url=${encodeUrl}&title=${encodeTitle}`;

    window.open(openUrl, '_blank');
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
    linkUrl,
    linkInputRef,
    handleClickKaKaoShare,
    handleClickBlogShare,
    handleClickLinkShare,
  };
}
