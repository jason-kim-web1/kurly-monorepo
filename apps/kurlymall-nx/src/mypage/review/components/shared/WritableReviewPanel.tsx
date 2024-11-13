import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

import { amplitudeService, ScreenName } from '../../../../shared/amplitude';

import { useWritableReviewCount, useWritableReview } from '../../hooks';
import WritableReviewItem from './WritableReviewItem';
import { EmptyListText, PanelFlex, ReviewList, TotalNumber } from './styled-components';
import ReviewBenefitNotice from '../../../../product/board/review/m/ReviewNotice/ReviewBenefitNotice';
import { isPC } from '../../../../../util/window/getDevice';
import WritingInstructions from '../pc/WritingInstructions';

const ObservingBlock = styled.div`
  height: 1px;
`;

export default function WritableReviewPanel() {
  const root = useRef<HTMLDivElement>(null);
  const [ref, inView] = useInView({ root: root.current });
  const { writableReviewCount, isSuccess: isCountSuccess } = useWritableReviewCount();
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } = useWritableReview();

  useEffect(() => {
    amplitudeService.setScreenName(ScreenName.MY_REVIEWABLE_LIST);
  }, []);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  return (
    <PanelFlex count={writableReviewCount} isPC={isPC}>
      <ReviewBenefitNotice pageType="mypage" />
      <ReviewList ref={root} isPC={isPC}>
        {isCountSuccess && writableReviewCount > 0 && (
          <>
            {isPC && <WritingInstructions />}
            <TotalNumber>총 {writableReviewCount}개</TotalNumber>
          </>
        )}
        {isSuccess &&
          !!data &&
          (writableReviewCount === 0 ? (
            <EmptyListText isPC={isPC}>작성 가능한 후기가 없습니다.</EmptyListText>
          ) : (
            data.pages.map((page) =>
              page.orderedProducts.map((orderedProduct) => (
                <WritableReviewItem
                  key={`${orderedProduct.orderNo}-${orderedProduct.dealProductNo}`}
                  {...orderedProduct}
                />
              )),
            )
          ))}
        <ObservingBlock ref={ref} />
      </ReviewList>
    </PanelFlex>
  );
}
