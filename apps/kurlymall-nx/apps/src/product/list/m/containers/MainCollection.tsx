import { PropsWithChildren } from 'react';

import styled from '@emotion/styled';

import MainSiteProvider from '../../../../main/components/shared/MainSiteProvider';
import { MainSite } from '../../../../main/interfaces/MainSection.interface';

const Gutter = styled.div`
  height: 44px;
`;

const MainCollection = ({ site, children: ProductContent }: PropsWithChildren<{ site: MainSite }>) => {
  return (
    <MainSiteProvider site={site}>
      <Gutter />
      {ProductContent}
    </MainSiteProvider>
  );
};

export default MainCollection;
