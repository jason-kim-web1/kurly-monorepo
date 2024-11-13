import { Contents, Footer, ReviewWrapper, View } from './styled-components';
import SkeletonLoading from '../../../../../shared/components/Loading/SkeletonLoading';

export default function SkeletonReviewItem() {
  return (
    <View>
      <ReviewWrapper>
        <SkeletonLoading width={38} height={20} radius={0} />
        <SkeletonLoading width={38} height={20} radius={0} />
      </ReviewWrapper>
      <SkeletonLoading width={175} height={16} radius={0} />
      <Contents css={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <SkeletonLoading height={20} radius={0} />
        <SkeletonLoading height={20} radius={0} />
      </Contents>
      <Footer>
        <SkeletonLoading width={65} height={20} radius={0} />
        <SkeletonLoading width={98} height={32} radius={20} />
      </Footer>
    </View>
  );
}
