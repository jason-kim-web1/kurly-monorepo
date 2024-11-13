import styled from '@emotion/styled';

import type { ShowcaseMetaProps } from '../../types/reponse';
import { ShareKakao } from '../../../../shared/icons/ShareKakao';
import copyLink from '../../../../shared/utils/copyLink';
import { KAKAO_SHARE_KEY } from '../../../../shared/configs/config';
import { ignoreError } from '../../../../shared/utils/general';
import { amplitudeService } from '../../../../shared/amplitude';
import { ShareEvent } from '../../../../shared/amplitude/events/event';
import useLoadKakao from '../../../../shared/hooks/useLoadKakao';
import Alert from '../../../../shared/components/Alert/Alert';
import COLOR from '../../../../shared/constant/colorset';
import { URLIcon } from './URLIcon';

const Wrapper = styled.footer<{ isBrandType: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 36px 0 30px;
  background-color: ${({ isBrandType }) => (isBrandType ? '#222' : '#06b360')};
`;

const Content = styled.div`
  padding: 16px 0;
`;

const Title = styled.h3<{ isBrandType: boolean }>`
  color: ${({ isBrandType }) => (isBrandType ? COLOR.kurlyWhite : '#222')};
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4.2%;
  padding-top: 12px;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 80px;
    color: #222;
    text-align: center;
    font-size: 12px;
    line-height: 16px;
    z-index: 0;
  }
`;

interface Props {
  meta: ShowcaseMetaProps;
}

const ShareContent = ({ meta }: Props) => {
  useLoadKakao();
  const { url, shareUrl, type } = meta;
  const isBrandType = type === 'brand';

  const handleClickKakaoShare = async () => {
    const kakao = window.Kakao;

    if (!kakao) {
      await Alert({ text: '현재 카카오톡 공유하기를 사용할 수 없습니다.' });
      return;
    }
    if (!kakao.isInitialized()) {
      kakao.init(KAKAO_SHARE_KEY);
    }

    ignoreError(() => {
      amplitudeService.logEvent(
        new ShareEvent({
          url,
          channel: 'kakao',
        }),
      );
    });

    kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: meta.title,
        description: meta.description,
        imageUrl: meta.image,
        imageWidth: 800,
        imageHeight: 800,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '보러가기',
          link: {
            mobileWebUrl: shareUrl,
            webUrl: url,
          },
        },
      ],
      installTalk: true,
    });
  };

  const handleClickCopyLink = () => {
    copyLink({
      link: url,
      successCopyLinkText: '링크가 복사되었습니다.\n해당 링크는 모바일에서 접근 가능합니다.',
    });

    ignoreError(() => {
      amplitudeService.logEvent(
        new ShareEvent({
          url,
          channel: 'link',
        }),
      );
    });
  };

  return (
    <Wrapper isBrandType={isBrandType}>
      <Content>
        <Title isBrandType={isBrandType}>공유하기</Title>
        <ButtonWrapper>
          <button onClick={handleClickKakaoShare} data-opt="kakaotalk">
            <ShareKakao />
            카카오톡
          </button>
          <button onClick={handleClickCopyLink}>
            <URLIcon />
            링크 복사
          </button>
        </ButtonWrapper>
      </Content>
    </Wrapper>
  );
};

export { ShareContent };
