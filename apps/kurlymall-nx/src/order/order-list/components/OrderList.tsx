import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { isEmpty } from 'lodash';

import { DateFilterTab as PcDateFilterTab } from './pc/DateFilterTab';
import { DateFilterTab as MoDateFilterTab } from './m/DateFilterTab';
import { isPC } from '../../../../util/window/getDevice';
import GroupOrderList from './GroupOrderList';
import { useAppSelector } from '../../../shared/store';
import { useRestoration } from '../hook/useRestoration';
import { useManualScrollRestoration } from '../../../shared/hooks/useManualScrollRestoration';

const OrderListWrapper = styled.div`
  background-color: ${vars.color.background.$background2};
`;

export default function OrderList() {
  useManualScrollRestoration();

  const {
    dateTabState,
    activeDate: { name, value },
  } = useAppSelector((state) => state.orderList);

  useRestoration();

  const DateFilterTab = isPC ? PcDateFilterTab : MoDateFilterTab;

  if (isEmpty(name) || isEmpty(value)) {
    return null;
  }

  return (
    <OrderListWrapper>
      <DateFilterTab tabState={dateTabState} />
      <GroupOrderList filterName={name} filterValue={value} />
    </OrderListWrapper>
  );
}
