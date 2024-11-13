import { ReactNode } from 'react';
import Lottie from 'react-lottie-player';
import { isNull } from 'lodash';

import styled from '@emotion/styled';

import NextImage from '../../../../shared/components/NextImage';

const Container = styled.div`
  position: relative;
  width: 44px;
  height: 44px;

  @media (min-width: 400px) {
    width: 52px;
    height: 52px;
  }
`;

const lottieStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '16px',
};

interface Props {
  className?: string;
  imageUrl: string;
  lottieUrl: string;
  lottieLoop: number | null;
  children?: ReactNode;
}

export default function MainQuickMenuCardImage({ className, imageUrl, lottieUrl, lottieLoop, children }: Props) {
  const optLottie = {
    loop: isNull(lottieLoop) ? true : lottieLoop - 1,
    play: true,
    path: lottieUrl,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container className={className}>
      {lottieUrl ? (
        <Lottie {...optLottie} style={lottieStyle} data-testid="quick-menu-lottie" />
      ) : (
        <NextImage src={imageUrl} layout="fill" objectFit="cover" alt="퀵메뉴 이미지" data-testid="quick-menu-image" />
      )}
      {children}
    </Container>
  );
}
