import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import SkeletonLoading from '../../../../shared/components/Loading/SkeletonLoading';

const Wrapper = styled.div`
  ${isPC
    ? css`
        padding: 18px 30px;
        border-bottom: 1px solid ${COLOR.bg};
      `
    : css`
        padding: 18px 20px;
        border-bottom: 8px solid ${COLOR.bg};
      `}
`;

const Title = styled.div`
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 18px;
`;

const Contents = styled.ul`
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: ${COLOR.kurlyGray600};
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;

  :not(:first-of-type) {
    margin-top: 8px;
  }
`;

export default function LoadingRecurringPayment() {
  return (
    <Wrapper>
      <Title>자동결제</Title>
      <Contents>
        <Item>
          결제금액
          <SkeletonLoading testId="loading-price" width={150} height={18} />
        </Item>
        <Item>
          결제 시작일
          <SkeletonLoading testId="loading-date" width={111} height={18} />
        </Item>
      </Contents>
    </Wrapper>
  );
}
