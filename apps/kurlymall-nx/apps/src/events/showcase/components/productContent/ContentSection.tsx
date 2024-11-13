import { useEffect } from 'react';
import { css } from '@emotion/react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/router';

import { IntroSectionA } from './section/IntroSectionA';
import { IntroSectionB } from './section/IntroSectionB';
import { IntroSectionC } from './section/IntroSectionC';
import { TipSection } from './section/TipSection';
import { SellerInterviewSection } from './section/SellerInterviewSection';
import { GIFSection } from './section/GIFSection';
import type { ProductType } from '../../types';
import { amplitudeService } from '../../../../shared/amplitude';
import { ViewEventItem } from '../../../../shared/amplitude/events/event';
import { KURLY_URL } from '../../../../shared/configs/config';
import { useShowcaseContext } from '../../context/showcaseContext';

const productWrapper = css`
  :first-of-type {
    padding-top: 60px;
  }
`;

interface Props {
  sectionNo: number;
  product: ProductType;
}

const ContentSection = ({ sectionNo, product }: Props) => {
  const { asPath } = useRouter();
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { isEndProductList, changeViewingProduct } = useShowcaseContext();

  const renderProductContent = () =>
    product.contentList.map((productContent, itemIndex) => {
      const key = `${productContent.title}-${itemIndex}`;
      const contentType = productContent.type;
      const isOdd = !!(sectionNo % 2);

      switch (contentType) {
        case 'INTRO_A':
          return <IntroSectionA key={key} productIndex={sectionNo} productContent={productContent} isOdd={isOdd} />;
        case 'INTRO_B':
          return <IntroSectionB key={key} productContent={productContent} isOdd={isOdd} />;
        case 'INTRO_C':
          return <IntroSectionC key={key} productContent={productContent} />;
        case 'TIP':
          return <TipSection key={key} productContent={productContent} />;
        case 'SELLER_INTERVIEW':
          return <SellerInterviewSection key={key} productContent={productContent} contentNo={product.contentNo} />;
        case 'INTRO_WITH_GIF':
          return <GIFSection key={key} productContent={productContent} />;
        default:
          return null;
      }
    });

  useEffect(() => {
    if (inView) {
      const {
        contentNo,
        name,
        status: { isPurchase },
      } = product;
      changeViewingProduct(sectionNo)({
        currentIndex: sectionNo,
        contentNo,
        name,
        isPurchase,
      });
    }
  }, [changeViewingProduct, inView, product, sectionNo]);

  useEffect(() => {
    if (inView && !isEndProductList) {
      const { contentNo, name } = product;
      amplitudeService.logEvent(
        new ViewEventItem({
          url: `${KURLY_URL}${asPath}`,
          previousUrl: '',
          contentId: String(contentNo),
          contentName: String(name),
          position: String(sectionNo),
          eventItemCategory: 'scroll',
        }),
      );
    }
  }, [asPath, inView, isEndProductList, product, sectionNo]);

  return (
    <div ref={ref} css={productWrapper}>
      {renderProductContent()}
    </div>
  );
};

export { ContentSection };
