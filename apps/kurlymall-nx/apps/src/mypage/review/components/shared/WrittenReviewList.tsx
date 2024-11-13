import { Fragment, useEffect } from 'react';

import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

import { useWrittenReview } from '../../hooks';
import WrittenReviewItem from './WrittenReviewItem';
import { EmptyListText } from './styled-components';
import { isPC } from '../../../../../util/window/getDevice';

const WrittenReviewListWrapper = styled.div`
  overflow-x: hidden;
`;

const ObservingBlock = styled.div`
  width: 100%;
  height: 1px;
`;

export default function WrittenReviewList() {
  const { data, status, fetchNextPage, hasNextPage } = useWrittenReview();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return status === 'success' && !!data ? (
    <WrittenReviewListWrapper>
      {data.pages[0].writtenReviews.length === 0 ? (
        <EmptyListText isPC={isPC}>작성한 후기가 없습니다.</EmptyListText>
      ) : (
        data.pages.map((page, pageIndex) =>
          page.writtenReviews.map((writtenReview, itemIndex) => (
            <Fragment key={writtenReview.reviewId}>
              <WrittenReviewItem {...writtenReview} />
              {pageIndex + 1 === data.pages.length && itemIndex + 1 === 8 ? <ObservingBlock ref={ref} /> : null}
            </Fragment>
          )),
        )
      )}
    </WrittenReviewListWrapper>
  ) : null;
}
