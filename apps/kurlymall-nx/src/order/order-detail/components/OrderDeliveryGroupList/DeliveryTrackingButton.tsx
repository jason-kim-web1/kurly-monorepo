import { isEmpty } from 'lodash';
import styled from '@emotion/styled';
import { Button } from '@thefarmersfront/kpds-react';

import { DeliveryGroup } from '../../../common/interface/DeliveryGroup';
import { DealProduct } from '../../../common/interface/DealProduct';
import useOpenDeliveryTracking from '../../hooks/useOpenDeliveryTracking';

const FullWidthButton = styled(Button)`
  width: 100%;
`;

interface Props {
  invoices?: DeliveryGroup['invoices'];
  invoiceOfDealProduct?: DealProduct['invoice'];
}

const DeliveryTrackingButton = ({ invoices, invoiceOfDealProduct }: Props) => {
  const { openDeliveryTracking } = useOpenDeliveryTracking({ invoiceOfDealProduct, invoices });

  if (isEmpty(invoices) && isEmpty(invoiceOfDealProduct)) return null;

  return (
    <FullWidthButton
      _type="secondary"
      _style="fill"
      color="light"
      size="large"
      shape="square"
      onClick={openDeliveryTracking}
    >
      배송조회
    </FullWidthButton>
  );
};

export default DeliveryTrackingButton;
