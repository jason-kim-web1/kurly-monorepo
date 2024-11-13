import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import { css } from '@emotion/react';

import { Tab, TAB_STYLE } from '../../../../shared/components/KPDS/Tab';
import { zIndex } from '../../../../shared/styles';
import useDeliveryTypeTab from '../../hooks/useDeliveryTypeTab';
import { CART_DELIVERY_TAB_HEIGHT } from '../../constants';

const Wrapper = styled.div<{ isTabHidden: boolean }>`
  position: relative;
  overflow: hidden;
  background-color: ${vars.color.background.$background1};
  transition: transform 0.3s ease-out;
  z-index: ${zIndex.floatingMenu - 1};
  pointer-events: auto;

  ${({ isTabHidden }) =>
    isTabHidden &&
    css`
      transform: translateY(-100%);
    `};
`;

export default function DeliveryTypeTab() {
  const { handleClickTab, deliveryTypeTabList, isDeliveryTabHide } = useDeliveryTypeTab();

  return (
    <Wrapper isTabHidden={isDeliveryTabHide}>
      <Tab
        tabList={deliveryTypeTabList}
        onClickTab={handleClickTab}
        tabStyle={TAB_STYLE.PURPLE}
        height={`${CART_DELIVERY_TAB_HEIGHT}px`}
        padding={`${vars.spacing.$6} ${vars.spacing.$16} ${vars.spacing.$16}`}
      />
    </Wrapper>
  );
}
