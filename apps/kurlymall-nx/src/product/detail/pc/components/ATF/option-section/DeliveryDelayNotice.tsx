import styled from '@emotion/styled';

import RawHTML from '../../../../../../shared/components/layouts/RawHTML';

import ProductInfoItemWrapper from '../ProductInfoItemWrapper';

const DeliveryDelayNoticeWrapper = styled.dd`
  display: flex;
  flex: 1;
  flex-direction: column;
  line-height: 19px;
  span {
    font-weight: 600;
  }
`;

export default function DeliveryDelayNotice({ description }: { description: string }) {
  return (
    <ProductInfoItemWrapper title="배송정보">
      <DeliveryDelayNoticeWrapper>
        <RawHTML html={description} />
      </DeliveryDelayNoticeWrapper>
    </ProductInfoItemWrapper>
  );
}
