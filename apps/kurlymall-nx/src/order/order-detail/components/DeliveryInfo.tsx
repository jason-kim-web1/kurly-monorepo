import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Typography } from '@thefarmersfront/kpds-react';

import Accordion from '../../common/components/Accordion';
import BaseWrapper from '../../common/components/BaseWrapper';
import useDeliveryInfo from '../hooks/useDeliveryInfo';
import RegularDetailRow from './DetailRow/RegularDetailRow';
import { OrderDetail } from '../interface/OrderDetail';
import Divider from '../../common/components/Divider';

const Wrapper = styled(BaseWrapper)`
  padding: ${vars.spacing.$20} ${vars.spacing.$16};
  word-break: break-all;

  > p:not(:last-of-type) {
    margin-bottom: ${vars.spacing.$6};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${vars.spacing.$12};
`;

const ColoredTypography = styled(Typography)<{ color: string; whiteSpace?: string }>`
  color: ${({ color }) => color};
  white-space: ${({ whiteSpace }) => whiteSpace};
`;

const RequetMemoTypography = styled(Typography)`
  color: ${vars.color.text.$tertiary};
  text-align: right;
  margin-left: ${vars.spacing.$8};
`;

interface Props {
  receiver: OrderDetail['receiver'];
}

const TITLE = '배송정보';

const DeliveryInfo = ({ receiver }: Props) => {
  const {
    isOpen,
    toggleWithAmplitude,
    name,
    phoneNumber,
    addressText,
    pickupTypeText,
    accessDetailText,
    accessMethodText,
    packingTypeText,
  } = useDeliveryInfo(receiver);

  return (
    <Accordion title={TITLE} isOpen={isOpen} onClick={() => toggleWithAmplitude(TITLE)}>
      <Wrapper>
        <ColoredTypography variant="$xxlargeSemibold" color={vars.color.text.$primary}>
          {name}
        </ColoredTypography>
        <ColoredTypography variant="$xlargeRegular" color={vars.color.text.$tertiary}>
          {phoneNumber}
        </ColoredTypography>
        <ColoredTypography variant="$xlargeRegular" color={vars.color.text.$secondary}>
          {addressText}
        </ColoredTypography>
        <Divider width="100%" height="1px" margin={`${vars.spacing.$16} 0`} />
        <RegularDetailRow title="받으실 장소" content={pickupTypeText} />
        <Row>
          <ColoredTypography variant="$xlargeRegular" color={vars.color.text.$tertiary} whiteSpace="nowrap">
            {accessMethodText}
          </ColoredTypography>
          <RequetMemoTypography variant="$xlargeRegular">{accessDetailText}</RequetMemoTypography>
        </Row>
        {packingTypeText && <RegularDetailRow title="포장 방법" content={packingTypeText} />}
      </Wrapper>
    </Accordion>
  );
};

export default DeliveryInfo;
