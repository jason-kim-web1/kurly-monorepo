import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { memo } from 'react';

import { css } from '@emotion/react';

import DeliveryPinBlack from '../../../../../../shared/icons/DeliveryPinBlack';
import { addComma } from '../../../../../../shared/services';
import { isPC } from '../../../../../../../util/window/getDevice';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 16px;

  ${isPC &&
  css`
    padding: 10px 30px 11px;
  `}
`;

const Text = styled.span`
  font-weight: 600;
  margin-left: 4px;

  ${isPC &&
  css`
    font-weight: 500;
    line-height: 19px;
    margin-left: 0;
  `}
`;

const TotalText = styled.span`
  padding-left: 4px;
  line-height: 20px;

  ${isPC &&
  css`
    padding-left: 0;
    line-height: 19px;
  `}
`;

interface Props {
  keyword: string;
  total: number;
  // usePickupPlacesQuery의 isLoading 값
  isLoading: boolean;
}

function ListviewInformation({ keyword, total, isLoading }: Props) {
  if (isLoading || isEmpty(keyword)) {
    return (
      <Wrapper>
        {!isPC && <DeliveryPinBlack />}
        <Text>배송지에서 가까운 순으로 보여드려요</Text>
      </Wrapper>
    );
  }

  if (total) {
    return (
      <Wrapper>
        <TotalText>총 {addComma(total)}개</TotalText>
      </Wrapper>
    );
  }

  return null;
}

export default memo(ListviewInformation);
