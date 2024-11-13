import styled from '@emotion/styled';

import { useEffect, useRef, useState } from 'react';

import { useInView } from 'react-intersection-observer';

import { amplitudeService, ScreenName } from '../../../../shared/amplitude';
import { useScreenName } from '../../../../shared/hooks';

import ReviewGallery from './ReviewGallery';
import ReviewList from './ReviewList';
import ReviewListTop from './ReviewListTop';
import ReviewQuickFilter from './ReviewQuickFilter';
import ReviewBenefitNotice from './ReviewBenefits/ReviewBenefitNotice';
import { useBlockContextMenu } from '../hooks/useBlockContextMenu';
import { ReviewSearchOptionProvider } from '../context/ReviewSearchOptionContext';
import COLOR from '../../../../shared/constant/colorset';
import { useReviewCount } from '../hooks/useReviewCount';

const Section = styled.section`
  padding: 72px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
  line-height: 41px;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray800};
`;

interface Props {
  contentsProductNo: number;
}

export default function ProductReviewContainer({ contentsProductNo }: Props) {
  useBlockContextMenu();
  useScreenName(ScreenName.PRODUCT_DETAIL_DESCRIPTION);

  const [currentPage, setCurrentPage] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const { ref: view, inView } = useInView();
  const { reviewCount, isLoading: isReviewCountLoading } = useReviewCount({
    contentsProductNo,
    dealProduct: [],
    memberGroup: [],
  });
  const [prevReviewCount, setPrevReviewCount] = useState(0);
  const isEmptyReviews = !isReviewCountLoading && reviewCount <= 0;

  const handleChangeCurrentPage = (pageNum: number) => setCurrentPage(pageNum);
  const handleChangeReviewCount = (count: number) => setPrevReviewCount(count);

  useEffect(() => {
    if (ref?.current && inView) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);

  useEffect(() => {
    if (!inView) {
      return;
    }

    amplitudeService.setScreenName(ScreenName.PRODUCT_DETAIL_REVIEW);
  }, [inView]);

  return (
    <Section ref={ref}>
      <Title aria-label="상품 후기">상품 후기</Title>
      {isEmptyReviews ? <ReviewBenefitNotice /> : null}
      <ReviewGallery contentsProductNo={contentsProductNo} />
      <ReviewSearchOptionProvider>
        <div ref={view}>
          {!isEmptyReviews ? (
            <>
              <ReviewListTop
                contentsProductNo={contentsProductNo}
                onChangeCurrentPage={handleChangeCurrentPage}
                onChangeReviewCount={handleChangeReviewCount}
              />
              <ReviewQuickFilter
                contentsProductNo={contentsProductNo}
                prevReviewCount={prevReviewCount}
                onChangeCurrentPage={handleChangeCurrentPage}
              />
            </>
          ) : null}
          <ReviewList
            contentsProductNo={contentsProductNo}
            currentPage={currentPage}
            onChangeCurrentPage={handleChangeCurrentPage}
          />
        </div>
      </ReviewSearchOptionProvider>
    </Section>
  );
}
