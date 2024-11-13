import styled from '@emotion/styled';

import RawHTML from '../../../../shared/components/layouts/RawHTML';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  width: 284px;
  padding: 20px 18px;
  border: solid 1px ${COLOR.btnGray};
  border-top: none;
  background-color: ${COLOR.kurlyWhite};
  font-size: 12px;
  line-height: 1;
  text-align: center;
  color: ${COLOR.kurlyGray800};
  span {
    color: ${COLOR.invalidRed};
  }
`;

export default function HolidayShippingMessage({ description }: { description: string }) {
  return (
    <Wrapper>
      <RawHTML html={description} />
    </Wrapper>
  );
}
