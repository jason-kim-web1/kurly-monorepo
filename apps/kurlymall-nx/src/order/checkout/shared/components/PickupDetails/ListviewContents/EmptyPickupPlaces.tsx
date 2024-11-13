import styled from '@emotion/styled';

import { css } from '@emotion/react';

import COLOR from '../../../../../../shared/constant/colorset';
import { isPC } from '../../../../../../../util/window/getDevice';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: ${COLOR.kurlyGray800};
  font-size: 18px;
  font-weight: 600;
  line-height: 23px;
  margin-bottom: 6px;

  ${isPC &&
  css`
    font-weight: 500;
  `}
`;

const SubText = styled.p`
  color: ${COLOR.kurlyGray400};
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
`;

export default function EmptyPickupPlaces() {
  return (
    <Wrapper>
      <Text>검색된 매장이 없습니다.</Text>
      <SubText>다른 검색어를 입력해 주세요.</SubText>
    </Wrapper>
  );
}
