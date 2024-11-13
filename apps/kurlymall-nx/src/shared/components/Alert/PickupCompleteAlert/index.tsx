import styled from '@emotion/styled';

import Alert from '../Alert';
import COLOR from '../../../constant/colorset';

const AlertWrapper = styled.div`
  text-align: left;
`;

const ProductName = styled.span`
  display: block;
  color: ${COLOR.kurlyPurple};
`;

export const PickupCompleteAlert = ({ productName }: { productName: string }) => {
  const title = '와인을 수령하셨나요?';
  const contents = (
    <AlertWrapper>
      픽업 매장에서 와인 수령 후 픽업 완료를 해주세요.
      <ProductName>{productName}</ProductName>
    </AlertWrapper>
  );

  return Alert({
    title,
    contents,
    showCancelButton: true,
  });
};
