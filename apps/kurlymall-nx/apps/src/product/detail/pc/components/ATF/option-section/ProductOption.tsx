import styled from '@emotion/styled';
import { head } from 'lodash';

import COLOR from '../../../../../../shared/constant/colorset';
import SingleDeal from './SingleDeal';
import MultiDeal from './multi-deal/MultiDeal';
import OptionContent from './option-content/OptionContent';
import CalendarContent from './calendar-content/CalendarContent';
import { useAppSelector } from '../../../../../../shared/store';
import useDeliveryDelayNotice from '../../../../hooks/useDeliveryDelayNotice';
import DeliveryDelayNotice from './DeliveryDelayNotice';

const Container = styled.div`
  border-bottom: 1px solid ${COLOR.bg};
`;

export default function ProductOption() {
  const contentNo = useAppSelector(({ productDetail }) => productDetail.no);
  const isSoldOut = useAppSelector(({ productDetail }) => productDetail.isSoldOut);
  const isPurchaseStatus = useAppSelector(({ productDetail }) => productDetail.isPurchaseStatus);
  const dealProducts = useAppSelector(({ productDetail }) => productDetail.dealProducts);
  const contentType = useAppSelector(({ productDetail }) => productDetail.contentType);
  const groupProduct = useAppSelector(({ productDetail }) => productDetail.groupProduct);
  const { deliveryDelayNotice } = useDeliveryDelayNotice();

  const currentDealProduct = head(dealProducts);
  if (!currentDealProduct) {
    return null;
  }

  return (
    <Container>
      {contentType === 'SINGLE' && (
        <SingleDeal
          contentNo={contentNo}
          dealProduct={currentDealProduct}
          isPurchaseStatus={isPurchaseStatus}
          isSoldOut={isSoldOut}
        />
      )}
      {contentType === 'MULTI' && <MultiDeal contentNo={contentNo} dealProducts={dealProducts} />}
      {contentType === 'OPTION' && (
        <OptionContent
          groupKeys={groupProduct.groupKeys}
          groupMembers={groupProduct.groupMembers}
          dealProduct={currentDealProduct}
        />
      )}
      {contentType === 'CALENDAR' && (
        <CalendarContent
          groupKeys={groupProduct.groupKeys}
          groupMembers={groupProduct.groupMembers}
          dealProduct={currentDealProduct}
        />
      )}
      {!!deliveryDelayNotice ? <DeliveryDelayNotice description={deliveryDelayNotice} /> : null}
    </Container>
  );
}
