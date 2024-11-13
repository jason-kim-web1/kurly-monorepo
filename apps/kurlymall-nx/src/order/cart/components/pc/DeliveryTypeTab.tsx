import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { zIndex } from '../../../../shared/styles';
import { Tab, TAB_STYLE } from '../../../../shared/components/KPDS/Tab';
import useDeliveryTypeTab from '../../hooks/useDeliveryTypeTab';
import { CART_DELIVERY_TAB_HEIGHT } from '../../constants';

const Wrapper = styled.div`
  z-index: ${zIndex.floatingMenu - 1};
  background-color: ${vars.color.background.$background1};
`;

export default function DeliveryTypeTab() {
  const { handleClickTab, deliveryTypeTabList } = useDeliveryTypeTab();

  return (
    <Wrapper>
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
