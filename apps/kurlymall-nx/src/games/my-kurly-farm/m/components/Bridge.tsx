import styled from '@emotion/styled';

import { useCallback, useEffect } from 'react';

import Link from 'next/link';

import UAParser from 'ua-parser-js';

import { bridgeMyKurlyFarmIcArrowRight, bridgeMyKurlyFarmMW, kurlyNaviLogoMW } from '../../../../shared/images';
import Button from '../../../../shared/components/Button/Button';
import NextImage from '../../../../shared/components/NextImage';
import COLOR from '../../../../shared/constant/colorset';
import { isAos, isIos, isWebview } from '../../../../../util/window/getDevice';
import Alert from '../../../../shared/components/Alert/Alert';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import useWindowSize from '../../../../shared/hooks/useWindowSize';
import { tryUriScheme } from '../../../../shared/utils/deep-link';
import Confirm from '../../../../shared/components/Alert/Confirm';

const Container = styled.div`
  padding: 28px 0 0;
  height: calc(var(--vh, 1vh) * 100);
  background-color: #fff6e0;
  text-align: center;
  @media (min-height: 609px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const LogoImageWrapper = styled.div`
  height: 30px;
`;

const HeadlineWrapper = styled.div`
  margin-top: 8px;
  font-size: 24px;
  line-height: 32px;
  color: ${COLOR.kurlyGray800};
  b {
    font-weight: 600;
  }
`;

const MainImageWrapper = styled.div`
  margin: 16px 0;
`;

const DescriptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-bottom: 20px;
  line-height: 22px;
  color: ${COLOR.kurlyGray800};
  b {
    font-weight: 600;
    color: ${COLOR.kurlyPurple};
  }
`;

const Description = styled.div`
  display: flex;
  text-align: start;
  width: 300px;
`;

const GrayDot = styled.div`
  min-width: 3px;
  height: 3px;
  border-radius: 1.5px;
  margin: 9px 8px 0 0;
  background-color: ${COLOR.kurlyGray600};
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 12px;
`;

const OpenAppButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 44px;
  color: ${COLOR.kurlyGray600};
  line-height: 19px;
`;

const ButtonCss = {
  '> span': {
    fontWeight: 600,
  },
};

interface Props {
  queryString: string;
}

export default function Bridge({ queryString }: Props) {
  const { height: windowInnerHeight } = useWindowSize();
  const handleInstallApp = () => {
    if (isAos) {
      location.href = 'https://play.google.com/store/apps/details?id=com.dbs.kurly.m2';
      return;
    }

    if (isIos) {
      location.href = 'https://apps.apple.com/kr/app/id1080244833';
      return;
    }

    Alert({ text: '모바일 웹으로 접속이 필요합니다.' });
  };

  const handleOpenApp = useCallback(async () => {
    const isAppOpened = await tryUriScheme(`${deepLinkUrl.GAME_MY_KURLY_FARM}${queryString}`);

    if (isAppOpened) {
      return;
    }

    const { isConfirmed } = await Confirm({
      showRightButton: true,
      text: '앱 실행에 실패하였습니다. 스토어로 이동하시겠습니까?',
      leftButtonText: '취소',
      rightButtonText: '확인',
    });

    if (!isConfirmed) {
      return;
    }

    handleInstallApp();
  }, [queryString]);

  useEffect(() => {
    const vh = windowInnerHeight * 0.01;
    if (vh > 0) {
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
  }, [windowInnerHeight]);

  useEffect(() => {
    const uaParser = new UAParser(window.navigator.userAgent);
    const isAlertsNotShownInIosBrowser = /^(?:Chrome|NAVER|KAKAOTALK|Line|Instagram|Edge|GSA)$/i.test(
      uaParser.getBrowser().name || '',
    );

    if (!isWebview() && (isAos || isAlertsNotShownInIosBrowser)) {
      location.href = `${deepLinkUrl.GAME_MY_KURLY_FARM}${queryString}`;
    }
  }, [queryString]);

  return (
    <Container>
      <LogoImageWrapper>
        <Link href={'/main'}>
          <a href={'/main'}>
            <NextImage src={kurlyNaviLogoMW} alt="마켓컬리 로고" width={58} height={30} objectFit="contain" />
          </a>
        </Link>
      </LogoImageWrapper>
      <HeadlineWrapper>
        <div>모바일로 키우면</div>
        <b>문 앞으로 받는 마이컬리팜</b>
      </HeadlineWrapper>
      <MainImageWrapper>
        <NextImage src={bridgeMyKurlyFarmMW} alt="MyKurlyFarm MW" width={275} height={220} objectFit="contain" />
      </MainImageWrapper>
      <DescriptionWrapper>
        <Description>
          <GrayDot />
          <div>컬리 앱 최신버전에서 이용할 수 있어요.</div>
        </Description>
        <Description>
          <GrayDot />
          <div>
            친구초대 선물을 받으려면 <b>앱 설치 후, 다시 친구초대 링크를 클릭</b>해 접속한 뒤 작물을 심어주세요.
          </div>
        </Description>
      </DescriptionWrapper>
      <ButtonWrapper>
        <Button
          onClick={handleInstallApp}
          width={300}
          height={56}
          radius={100}
          text="컬리 앱 설치하기"
          css={ButtonCss}
        />
        <OpenAppButton onClick={handleOpenApp}>
          컬리 앱 실행하기
          <NextImage
            src={bridgeMyKurlyFarmIcArrowRight}
            alt="MyKurlyFarm Ic Arrow Right"
            width={16}
            height={16}
            objectFit="contain"
          />
        </OpenAppButton>
      </ButtonWrapper>
    </Container>
  );
}
