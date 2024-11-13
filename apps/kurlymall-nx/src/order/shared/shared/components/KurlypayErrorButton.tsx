import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import KurlypayIcon from '../../../../shared/components/icons/order/checkout/KurlypayIcon';

const Wrapper = styled.div`
  display: flex;
  :not(:first-of-type) {
    margin-top: 10px;
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 48px;
  border-radius: 4px;
  border: 1px solid ${COLOR.kurlyGray250};
  font-size: 14px;
  font-weight: 600;
  color: ${COLOR.lightGray};
`;

export default function KurlypayErrorButton() {
  return (
    <Wrapper>
      <Button disabled={true} data-testid="kurlypay-error-button">
        <KurlypayIcon fill={COLOR.lightGray} />
      </Button>
    </Wrapper>
  );
}
