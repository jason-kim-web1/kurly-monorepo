import { useRouter } from 'next/router';
import styled from '@emotion/styled';

import useKurlyPass from '../../../src/kurlypass/shared/hooks/useKurlyPass';
import useToggle from '../../../src/order/checkout/shared/hooks/useToggle';

import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import MainSiteProvider from '../../../src/main/components/shared/MainSiteProvider';
import { getSanitizedValue, getSanitizedMainSite } from '../../../src/shared/utils/getSanitizedValues';
import KurlyPassProductsContainer from '../../../src/kurlypass/pc/containers/KurlyPassProductsContainer';
import KurlyPassReceiptContainer from '../../../src/kurlypass/pc/containers/KurlyPassReceiptContainer';
import { MAIN_SITE } from '../../../src/main/constants/index';
import type { MainSite } from '../../../src/main/interfaces/MainSection.interface';

const Body = styled.div`
  padding-bottom: 80px;
`;

const Container = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;
`;

// TODO 컬리멤버스 릴리즈 이후로 컬리패스는 fade-out될 예정이랑 NX 이전 안 함
export default function KurlyPassPage() {
  const router = useRouter();
  const { query } = router;
  const { site } = query as { site: string };
  const { isOpen, toggle } = useToggle();
  const mainSite = getSanitizedValue<MainSite>({
    value: site,
    defaultValue: MAIN_SITE.MARKET,
    fn: getSanitizedMainSite,
  });

  const { list, loading, currentKurlyPass, moveKurlyPass, terminateKurlyPass, loadKurlyPassHistory } = useKurlyPass();

  return (
    <MainSiteProvider site={mainSite}>
      <Header />
      <Body>
        <Container>
          <KurlyPassProductsContainer
            list={list}
            currentKurlyPass={currentKurlyPass}
            onClick={toggle}
            moveKurlyPass={moveKurlyPass}
            onClickTerminate={terminateKurlyPass}
          />
          <KurlyPassReceiptContainer
            list={list}
            isOpen={isOpen}
            loading={loading}
            onClick={toggle}
            onNextPage={loadKurlyPassHistory}
          />
        </Container>
      </Body>
      <Footer />
    </MainSiteProvider>
  );
}
