import { useInView } from 'react-intersection-observer';

import type { ProductType } from '../../types';
import { ContentSection } from './ContentSection';
import { FloatingCTA } from '../floatingButton/FloatingCTA';
import { ShowcaseContextProvider } from '../../context/showcaseContext';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';

const ContentSectionList = ({ productList }: { productList: ProductType[] }) => (
  <>
    {productList.map((product, productIndex) => (
      <ContentSection key={`${product.name}-${productIndex}`} sectionNo={productIndex + 1} product={product} />
    ))}
  </>
);

interface Props {
  productList: ProductType[];
  type: string;
}

const ContentContainer = ({ productList, type }: Props) => {
  const { ref: layoutRef, inView } = useInView({ threshold: 0.025, rootMargin: '140px 0px 140px 0px' });

  // NOTE: contentList가 있는 콘텐츠 상품만 필터링
  const filteredProductList = productList.filter(({ contentList }) => isNotEmpty(contentList));

  return (
    <div ref={layoutRef}>
      <ShowcaseContextProvider productList={filteredProductList} type={type}>
        <ContentSectionList productList={filteredProductList} />
        <FloatingCTA inView={inView} />
      </ShowcaseContextProvider>
    </div>
  );
};

export { ContentContainer };
