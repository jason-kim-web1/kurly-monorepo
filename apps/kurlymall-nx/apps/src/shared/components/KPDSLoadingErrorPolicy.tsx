import styled from '@emotion/styled';

import Image from 'next/image';

import Lottie from 'react-lottie-player';

import { QueryStatus } from '@tanstack/react-query';

import { PropsWithChildren } from 'react';

import { eq } from 'lodash';

import { Typography } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import { IconExclamation64x64 } from '../images';
import * as progressLottie from './Progress/ProgressLottie.json';

interface Props {
  status: QueryStatus;
  handleRefetch: () => void;
}

const CenteredWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainText = styled(Typography)`
  margin-top: 16px;
  color: ${vars.color.text.$primary};
`;

const SecondaryText = styled(Typography)`
  margin-top: 8px;
  color: ${vars.color.text.$tertiary};
`;

const Button = styled.button`
  border-radius: 10px;
  border: solid 1px ${vars.color.line.$line2};
  padding: 12px 20px;
  color: ${vars.color.text.$primary};
  margin-top: 24px;
  background-color: ${vars.color.background.$background1};
  transition: background-color 0.2s ease-out;

  &:active {
    background-color: ${vars.color.main.$secondaryContainer};
  }
`;

function KPDSError({ onClickRefetch }: { onClickRefetch: () => void }) {
  return (
    <CenteredWrapper>
      <Image src={IconExclamation64x64} alt="Error" width={64} height={64} />
      <MainText variant={'$xxlargeSemibold'}>오류가 발생했습니다.</MainText>
      <SecondaryText variant={'$xlargeRegular'}>잠시 후 다시 시도해주세요.</SecondaryText>
      <Button type={'button'} onClick={onClickRefetch}>
        <Typography variant={'$xxlargeSemibold'}>재시도</Typography>
      </Button>
    </CenteredWrapper>
  );
}

function KPDSProductsEmpty() {
  return (
    <CenteredWrapper>
      <Image src={IconExclamation64x64} alt="Error" width={64} height={64} />
      <MainText variant={'$xxlargeSemibold'}>등록된 상품이 없습니다.</MainText>
    </CenteredWrapper>
  );
}

function KPDSLoading() {
  return (
    <CenteredWrapper>
      <Lottie play loop animationData={progressLottie} style={{ width: 32, height: 32 }} />
    </CenteredWrapper>
  );
}

function KPDSLoadingErrorPolicy({ children, status, handleRefetch }: PropsWithChildren<Props>) {
  if (eq(status, 'loading')) {
    return <KPDSLoading />;
  }

  if (eq(status, 'error')) {
    return <KPDSError onClickRefetch={handleRefetch} />;
  }

  return <>{children}</>;
}

export { KPDSError, KPDSLoading, KPDSProductsEmpty };

export default KPDSLoadingErrorPolicy;
