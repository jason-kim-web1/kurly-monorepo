import styled from '@emotion/styled';

import PageMetaData from '../../../src/shared/components/PageMeta/PageMetaData';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import SubscribeBottomSheet from '../../../src/member/membership/pc/components/SubscribeBottomSheet';
import { useScreenName } from '../../../src/shared/hooks';
import { ScreenName } from '../../../src/shared/amplitude';
import { MEMBERSHIP_PATH } from '../../../src/shared/constant';
import MembershipLegoView from '../../../src/member/membership/shared/components/MembershipLegoView';

const RelativeContainer = styled.div`
  width: 100%;
  position: relative;
`;

export default function MembershipPage() {
  useScreenName(ScreenName.MEMBERSHIP);

  return (
    <>
      <PageMetaData
        title="컬리멤버스 구독"
        description="컬리멤버스 구독"
        url={MEMBERSHIP_PATH.membership.uri}
        keyword="컬리멤버스 구독"
      />
      <RelativeContainer id="top">
        <MainSiteProvider>
          <Header />
        </MainSiteProvider>
        <MembershipLegoView />
        <SubscribeBottomSheet />
        <Footer />
      </RelativeContainer>
    </>
  );
}
