import { ErrorBoundary, FallbackProps } from 'react-error-boundary';

import styled from '@emotion/styled';

import { ComponentType, ErrorInfo, PropsWithChildren } from 'react';

import COLOR from '../../constant/colorset';
import Button from '../Button/Button';
import { sentryCaptureError } from '../../services';
import { isAos, isWebview } from '../../../../util/window/getDevice';
import deepLinkUrl from '../../constant/deepLink';
import { USER_MENU_PATH } from '../../constant';
import { ignoreError } from '../../utils/general';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 100000;
  background-color: ${COLOR.kurlyWhite};
`;

const ErrorTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${COLOR.kurlyBlack};
`;

const ErrorResetButton = styled(Button)`
  margin-top: 20px;
`;

const ErrorBoundaryFallback = ({ resetErrorBoundary }: FallbackProps) => {
  const handleHistoryBack = () => {
    resetErrorBoundary();

    location.href = isWebview() ? deepLinkUrl.HOME : USER_MENU_PATH.home.uri;
  };

  return (
    <Wrapper>
      <ErrorTitle>알 수 없는 에러가 발생했습니다.</ErrorTitle>
      <ErrorResetButton text="돌아가기" width={100} height={40} onClick={handleHistoryBack} />
    </Wrapper>
  );
};

type ComponentErrorBoundaryProps = {
  fallbackComponent?: ComponentType<FallbackProps>;
};

const ComponentErrorBoundary = ({
  children,
  fallbackComponent = ErrorBoundaryFallback,
}: PropsWithChildren<ComponentErrorBoundaryProps>) => {
  const handleOnError = (error: Error, info: ErrorInfo) => {
    const extra: { errorInfo?: string; androidObjectKeys?: string } = {};

    ignoreError(() => {
      extra.errorInfo = JSON.stringify(info);
    });

    // AOS 웹뷰 환경에서 Android 객체가 없는 이슈를 확인하기 위해 추가 된 코드입니다.
    try {
      if (isAos) {
        extra.androidObjectKeys = JSON.stringify(Object.keys(window.Android));
      }
    } catch {
      extra.androidObjectKeys = 'JSON.stringify(Object.keys(window.Android) error';
    }

    sentryCaptureError(error, {
      tags: { type: 'error-boundary' },
      extra,
    });
  };

  return (
    <ErrorBoundary FallbackComponent={fallbackComponent} onError={handleOnError}>
      {children}
    </ErrorBoundary>
  );
};

const GlobalErrorBoundary = ComponentErrorBoundary;

export { GlobalErrorBoundary, ComponentErrorBoundary, ErrorBoundaryFallback };
