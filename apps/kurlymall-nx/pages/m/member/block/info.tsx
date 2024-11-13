import { useEffect } from 'react';
import styled from '@emotion/styled';

import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import BackButton from '../../../../src/shared/components/Button/BackButton';

import { useWebview } from '../../../../src/shared/hooks';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../../src/shared/services/app.service';
import BlockUserContainer from '../../../../src/member/block/shared/containers/BlockUserContainer';
import { WebviewServerSideProps, getWebviewServerSideProps } from '../../../../src/server/webview';
import { getLockedToken } from '../../../../src/member/block/shared/service';

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function BlockInformationPage({ accessToken }: WebviewServerSideProps) {
  const webview = useWebview();
  const isNormalUser = isWebview() ? !accessToken : !getLockedToken();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('로그인 차단 해지');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>로그인 차단 해지</HeaderTitle>
        </MobileHeader>
      )}
      <Content>
        <BlockUserContainer isPC={false} accessToken={accessToken} isNormalUser={isNormalUser} />
      </Content>
    </>
  );
}

export const getServerSideProps = getWebviewServerSideProps();
