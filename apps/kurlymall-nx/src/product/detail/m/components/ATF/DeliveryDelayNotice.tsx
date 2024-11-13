import styled from '@emotion/styled';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';

import COLOR from '../../../../../shared/constant/colorset';

const Wrapper = styled.div`
  margin: 16px 0 -4px;
  padding: 10px 16px;
  border-radius: 3px;
  background-color: ${COLOR.bg};
  font-size: 12px;
  color: ${COLOR.kurlyGray800};
  line-height: 16px;
  text-align: center;
  span {
    font-weight: 600;
  }
`;

export default function DeliveryDelayNotice({ description }: { description: string }) {
  return (
    <Wrapper>
      <RawHTML html={description} />
    </Wrapper>
  );
}
