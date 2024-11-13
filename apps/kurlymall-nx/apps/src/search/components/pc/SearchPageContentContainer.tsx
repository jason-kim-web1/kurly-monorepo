import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppState, useAppSelector } from '../../../shared/store';

import COLOR from '../../../shared/constant/colorset';

import { Search } from '../../../shared/branch/events';
import { branchService } from '../../../shared/branch';
import { productListSetScreenName } from '../../../product/list/shared/util/productListSetScreenName';

import MainSiteProvider from '../../../main/components/shared/MainSiteProvider';
import Header from '../../../header/components/Header';
import Footer from '../../../footer/components/Footer';
import SearchListContainer from '../../pc/containers/SearchListContainer';
import ScrollEventTopButton from '../../../shared/components/Scroll/ScrollEventTopButton';
import { ListPageSkeleton } from '../../../product/list/pc/components/ListPageSkeleton';
import { useSearchData } from '../../contexts/SearchDataProvider';
import { fusionSignalsService } from '../../../shared/fusion-signals/FusionSignalsService';

const Content = styled.div`
  width: 100%;
  padding-bottom: 80px;
  background-color: ${COLOR.kurlyWhite};
`;

const Container = styled.div`
  width: 1050px;
  margin: 0 auto;
  align-content: center;
`;

export const PcSearchPageContentContainer = () => {
  const accessToken = useSelector(({ auth }: AppState) => auth.accessToken);
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const uid = useAppSelector(({ auth }) => auth.uid);
  const { isReady } = useRouter();
  const { site, searchKeyword: sword, filters: urlBasedFilter } = useSearchData();

  useEffect(() => {
    if (isEmpty(sword) || !accessToken) {
      return;
    }

    branchService.logEvent(
      new Search({
        searchQuery: sword,
      }),
    );
  }, [accessToken, sword]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    productListSetScreenName(sword, 'search');
  }, [sword, urlBasedFilter, isReady]);

  useEffect(() => {
    if (!(uid && hasSession && isReady && sword)) {
      return;
    }

    fusionSignalsService.setUser({ uid, site });
  }, [uid, isReady, hasSession, sword]);

  return (
    <MainSiteProvider site={site}>
      <Header sword={sword} />
      <ScrollEventTopButton>
        <Content>
          <Container>
            {isReady && hasSession ? <SearchListContainer /> : <ListPageSkeleton pageType="search" />}
          </Container>
        </Content>
      </ScrollEventTopButton>
      <Footer />
    </MainSiteProvider>
  );
};
