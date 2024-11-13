import Repeat from '../../../../../shared/components/Repeat';
import SkeletonReviewItem from '../ReviewItem/SkeletonReviewItem';

export const LoadingList = () => (
  <Repeat count={10}>
    <SkeletonReviewItem />
  </Repeat>
);
