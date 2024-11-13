import { CSSProperties } from 'react';

import styled from '@emotion/styled';

import Lottie from 'react-lottie-player';

import * as animationData from '../../../../shared/components/Loading/loadingLottie.json';

import SubPageLayout from '../../../../shared/components/layouts/SubPageLayout';

const size = {
  lottieWrapper: 100,
  lottie: 25,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LottieWrapper = styled.div`
  position: relative;
  width: ${size.lottieWrapper}px;
  height: ${size.lottieWrapper}px;
`;

const styles: { lottie: CSSProperties } = {
  lottie: {
    position: 'absolute',
    top: `-${size.lottie}px`,
    left: `-${size.lottie}px`,
    width: `${size.lottie * 2 + size.lottieWrapper}px`,
    height: `${size.lottie * 2 + size.lottieWrapper}px`,
  },
};

const Title = styled.div`
  margin-bottom: 6px;
  font-size: 20px;
  font-weight: 500;
  line-height: 25px;
  text-align: center;
`;

const SubTitle = styled.div`
  font-size: 15px;
  font-weight: normal;
  color: #999999;
  line-height: 20px;
  text-align: center;
`;

const SubPageLayoutTitle = styled.div`
  padding-bottom: 100px;
  text-align: center;
  line-height: 150%;
`;

const optLottie = {
  loop: true,
  play: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

interface Props {
  showTitleOnly?: boolean;
}

export default function InProgress({ showTitleOnly = false }: Props) {
  const title = '결제 진행 중입니다.';
  const subTitle = '결제가 완료될 때까지 잠시만 기다려 주세요.';

  return (
    <>
      {showTitleOnly ? (
        <Container>
          <LottieWrapper>
            <Lottie {...optLottie} style={styles.lottie} />
          </LottieWrapper>
          <Title>{title}</Title>
          <SubTitle>{subTitle}</SubTitle>
        </Container>
      ) : (
        <SubPageLayout title="결제하기">
          <SubPageLayoutTitle>
            <div>{title}</div>
            <div>{subTitle}</div>
          </SubPageLayoutTitle>
        </SubPageLayout>
      )}
    </>
  );
}
