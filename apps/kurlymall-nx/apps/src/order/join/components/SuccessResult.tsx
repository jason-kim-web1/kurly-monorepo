import styled from '@emotion/styled';

import useSuccessMessage from '../hooks/useSuccessMessage';

const Wrapper = styled.div`
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 23px;
`;

const DeliveryMessage = styled.p`
  font-weight: 700;
`;

export default function SuccessResult() {
  const { title, description } = useSuccessMessage();

  return (
    <Wrapper>
      {title}
      <DeliveryMessage>{description}</DeliveryMessage>
    </Wrapper>
  );
}
