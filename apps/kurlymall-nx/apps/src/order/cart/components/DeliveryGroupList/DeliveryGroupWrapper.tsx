import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { ReactNode } from 'react';

import { isPC } from '../../../../../util/window/getDevice';
import {
  MOBILE_ITEM_CONTROL_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  CART_DELIVERY_TAB_HEIGHT,
  PC_HEADER_HEIGHT,
} from '../../constants';
import { CART_DELIVERY_GROUP, CartDeliveryGroup } from '../../constants/CartDeliveryGroup';

const ITEM_LIST_TOP_MARGIN = 15;
const PC_SCROLL_ANCHOR = PC_HEADER_HEIGHT + ITEM_LIST_TOP_MARGIN;
const MOBILE_SCROLL_ANCHOR =
  MOBILE_HEADER_HEIGHT + MOBILE_ITEM_CONTROL_HEIGHT + CART_DELIVERY_TAB_HEIGHT + ITEM_LIST_TOP_MARGIN;

const Wrapper = styled.div<{ isUnavailableOrders: boolean }>`
  overflow: hidden;
  ~ div {
    margin-top: ${vars.spacing.$16};
  }

  position: relative;
  background-color: ${vars.color.background.$background1};
  border-radius: ${vars.radius.$16};
  padding: ${({ isUnavailableOrders }) =>
    isUnavailableOrders
      ? `${vars.spacing.$20} ${vars.spacing.$16} ${vars.spacing.$8} ${vars.spacing.$16}`
      : `${vars.spacing.$20} ${vars.spacing.$16}`};
`;

const ScrollPosition = styled.span`
  position: absolute;
  top: -${isPC ? PC_SCROLL_ANCHOR : MOBILE_SCROLL_ANCHOR}px;
`;

export default function DeliveryGroupWrapper({ children, type }: { children: ReactNode; type: CartDeliveryGroup }) {
  return (
    <Wrapper isUnavailableOrders={type === CART_DELIVERY_GROUP.UNAVAILABLE_ORDERS}>
      <ScrollPosition id={type} />
      {children}
    </Wrapper>
  );
}
