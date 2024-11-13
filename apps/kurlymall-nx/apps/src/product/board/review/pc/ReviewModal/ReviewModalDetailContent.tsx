import styled from '@emotion/styled';
import type { QueryKey } from '@tanstack/react-query';

import { ScreenName } from '../../../../../shared/amplitude';
import { useScreenName } from '../../../../../shared/hooks';

import type { ProductReview } from '../../ProductReview.service';
import { ReviewContentGrid } from './styled-components';
import { List, Next, Previous } from '../../../../../shared/icons';
import ReviewModalImagContent from './ReviewModalImagContent';
import ReviewModalPostContent from './ReviewModalPostContent';
import ReviewModalImageSkeleton from './ReviewModalImageSkeleton';
import ReviewModalPostSkeleton from './ReviewModalPostSkeleton';
import { useDirectionKey } from '../../../../../shared/hooks/useDirectionKey';
import COLOR from '../../../../../shared/constant/colorset';

const BackToList = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 168px;
  height: 56px;
  margin: auto;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 3px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
  > svg {
    margin: 0 8px 0 4px;
  }
`;

const PrevButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
`;

const NextButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
`;

interface Props {
  queryKey: QueryKey;
  review?: ProductReview;
  onClickPrev(): void;
  onClickNext(): void;
  onClickBackToList(): void;
}

export default function ReviewModalDetailContent({
  queryKey,
  review,
  onClickNext,
  onClickPrev,
  onClickBackToList,
}: Props) {
  useScreenName(ScreenName.PRODUCT_REVIEW_DETAIL);
  useDirectionKey({
    rightKeyAction: onClickNext,
    leftKeyAction: onClickPrev,
  });
  const renderContent = () => {
    if (!review) {
      return (
        <ReviewContentGrid>
          <ReviewModalImageSkeleton />
          <ReviewModalPostSkeleton />
          <div>
            <BackToList onClick={onClickBackToList}>
              <List />
              사진 목록 보기
            </BackToList>
          </div>
        </ReviewContentGrid>
      );
    }
    const { images, likeCount } = review;
    return (
      <ReviewContentGrid>
        <ReviewModalImagContent images={images} />
        <ReviewModalPostContent key={likeCount} queryKey={queryKey} reviewType="IMAGE" {...review} />
        <div>
          <BackToList onClick={onClickBackToList}>
            <List />
            사진 목록 보기
          </BackToList>
        </div>
      </ReviewContentGrid>
    );
  };
  return (
    <>
      {renderContent()}
      <PrevButton type="button" value="prev" onClick={onClickPrev}>
        <Previous />
      </PrevButton>
      <NextButton type="button" value="next" onClick={onClickNext}>
        <Next />
      </NextButton>
    </>
  );
}
