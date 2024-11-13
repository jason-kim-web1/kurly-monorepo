import styled from '@emotion/styled';

import type { MainRandomCollectionSection } from '../../../interfaces/MainSection.interface';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { SectionTitle } from '../NumberSectionTitle';
import { ProductList as ProductListPC } from '../../pc/random-collection-number/ProductList';
import { ProductList as ProductListMobile } from '../../m/random-collection-number/ProductList';
import { createMainSkeletonPC } from '../../pc/shared/skeleton/CreateMainSkeleton';
import { createMainSkeleton as createMainSkeletonMobile } from '../../m/shared/skeleton/CreateMainSkeleton';
import SectionMorePC from '../../pc/shared/SectionMore';
import SectionMoreMobile from '../../m/shared/SectionMore';
import SectionContentsPC from '../../pc/shared/SectionContents';
import SectionContentsMobile from '../../m/shared/SectionContents';

const Container = styled(isPC ? SectionContentsPC : SectionContentsMobile)`
  padding-bottom: ${isPC ? '16px' : '24px'};
  background: ${isPC ? 'inherit' : `linear-gradient(${COLOR.kurlyWhite}, ${COLOR.mainArticleDivider})`};
`;

const ButtonWrapper = styled.div`
  padding: 0 16px;

  & > a {
    background-color: ${COLOR.kurlyWhite};
  }
`;

interface Props {
  section: MainRandomCollectionSection;
}

export default function Section({ section }: Props) {
  const { payload, type } = section;
  const { onSelectProduct, onSelectMore } = useSectionEvent(section);

  const loadingLayer = isPC ? createMainSkeletonPC(type) : createMainSkeletonMobile(type);

  if (!payload) {
    return <Container section={section} loadingLayer={loadingLayer} />;
  }

  const { products, title, subtitle, hasMore, landingUrl } = payload;

  return (
    <Container section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} subtitle={subtitle} type={type as 'RANDOM_COLLECTION_NUMBER'} />
      {isPC ? (
        <ProductListPC
          products={products}
          landingUrl={hasMore ? landingUrl : ''}
          selectProduct={onSelectProduct}
          onSelectMore={onSelectMore}
        />
      ) : (
        <ProductListMobile products={products} selectProduct={onSelectProduct} />
      )}
      {landingUrl ? (
        isPC ? (
          <SectionMorePC landingUrl={landingUrl} onSelectMore={onSelectMore} />
        ) : (
          <ButtonWrapper>
            <SectionMoreMobile landingUrl={landingUrl} onSelectMore={onSelectMore} />
          </ButtonWrapper>
        )
      ) : null}
    </Container>
  );
}
