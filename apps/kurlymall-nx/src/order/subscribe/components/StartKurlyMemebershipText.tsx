import styled from '@emotion/styled';

import { isUndefined } from 'lodash';

import SkeletonLoading from '../../../shared/components/Loading/SkeletonLoading';
import COLOR from '../../../shared/constant/colorset';
import useKurlyMembersCheckout from '../hooks/useKurlyMembersCheckout';

const PointText = styled.span`
  color: ${COLOR.kurlymembers};
`;

export default function StartKurlyMembershipText() {
  const { product, nextFreeTicket } = useKurlyMembersCheckout();

  if (isUndefined(product)) {
    return (
      <>
        <SkeletonLoading testId="kurly-members-infomation-skeleton" width={104} />
        <SkeletonLoading width={165} />
      </>
    );
  }

  return (
    <>
      <p>{product.name}를</p>
      {nextFreeTicket ? (
        <>
          <PointText>0원</PointText>으로 시작하세요
        </>
      ) : (
        '지금 바로 시작하세요'
      )}
    </>
  );
}
