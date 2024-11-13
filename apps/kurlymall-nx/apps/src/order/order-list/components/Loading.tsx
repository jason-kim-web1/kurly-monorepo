import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import Progress from '../../../shared/icons/kpds/progress';

import { isPC } from '../../../../util/window/getDevice';
import { MOBILE_HEADER_HEIGHT } from '../../cart/constants';
import { ORDER_FILTER_HEADER } from '../constants/order-list';

const LoadingWrapper = styled.div`
  width: 100%;
  height: calc(100vh - (${ORDER_FILTER_HEADER}px + ${MOBILE_HEADER_HEIGHT}px));
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${vars.color.background.$background1};

  ${isPC &&
  css`
    height: 700px;
    margin-top: 16px;
    border-radius: ${vars.radius.$16};
  `}
`;

export default function Loading() {
  return (
    <LoadingWrapper>
      <Progress />
    </LoadingWrapper>
  );
}
