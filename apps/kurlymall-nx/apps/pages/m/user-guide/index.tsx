import styled from '@emotion/styled';

import COLOR from '../../../src/shared/constant/colorset';
import { useScreenName, useWebview } from '../../../src/shared/hooks';

import BackButton from '../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../src/shared/components/layouts/HeaderTitle';
import MobileHeader from '../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../src/shared/components/layouts/HeaderButtons';
import UserGuideContainer from '../../../src/user-guide/components/m/UserGuideContainer';
import UserMenu from '../../../src/shared/components/layouts/UserMenu';
import { ScreenName } from '../../../src/shared/amplitude';

const Container = styled.div`
  background-color: ${COLOR.bg};
  padding-bottom: 22px;
`;

export default function UserGuidePage() {
  useScreenName(ScreenName.SERVICE_GUIDE);
  const webview = useWebview();
  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>이용안내</HeaderTitle>
        </MobileHeader>
      )}
      <Container>
        <UserGuideContainer />
      </Container>
      {!webview && <UserMenu />}
    </>
  );
}
