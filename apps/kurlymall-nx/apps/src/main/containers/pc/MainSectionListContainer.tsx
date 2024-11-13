import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import styled from '@emotion/styled';

import Footer from '../../../footer/components/Footer';
import { MainSection } from '../../components/pc/main-section';
import { getSelectionRange } from '../../slice';
import { useAppSelector } from '../../../shared/store';
import { useManualScrollRestoration } from '../../../shared/hooks/useManualScrollRestoration';

const FooterWrapper = styled.div`
  min-height: 1px; // mobile safari issue: 높이값이 없는경우 정상작동X
  padding-top: 40px;
`;

export default function MainSectionListContainer() {
  useManualScrollRestoration();

  const maxSectionPage = useAppSelector(({ main }) => main.maxSectionPage);
  const sectionsStatus = useAppSelector(({ main }) => main.sectionsStatus);

  const { ref, inView } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const currentSectionList = useAppSelector(({ main }) => getSelectionRange(main, currentPage));

  const isVisibleFooter = maxSectionPage !== 0 && maxSectionPage <= currentPage;

  useEffect(() => {
    if (!inView || maxSectionPage <= currentPage) {
      return;
    }

    setCurrentPage((p) => p + 1);
  }, [inView]);

  return (
    <>
      <main>
        {currentSectionList.map((sectionKey: string) => (
          <MainSection key={sectionKey} sectionKey={sectionKey} hasSectionsStatus={sectionsStatus === 'LOADING'} />
        ))}
      </main>
      <FooterWrapper ref={ref}>{isVisibleFooter ? <Footer /> : null}</FooterWrapper>
    </>
  );
}
