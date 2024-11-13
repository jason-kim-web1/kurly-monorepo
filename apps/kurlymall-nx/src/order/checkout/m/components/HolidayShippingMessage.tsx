import styled from '@emotion/styled';

import { Divider } from '../../../../shared/components/Divider/Divider';

import RawHTML from '../../../../shared/components/layouts/RawHTML';

import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  padding: 20px;
  font-size: 14px;
  line-height: 16px;
  span {
    font-weight: bold;
    color: ${COLOR.invalidRed};
  }
`;

export default function HolidayShippingMessage({ description }: { description: string }) {
  return (
    <>
      <Wrapper>
        <RawHTML html={description} />
      </Wrapper>
      <Divider />
    </>
  );
}
