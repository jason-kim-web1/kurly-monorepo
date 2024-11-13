import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';
import { Button, Typography } from '@thefarmersfront/kpds-react';

import { Address, OrderDetail } from '../interface/OrderDetail';
import BaseWrapper from '../../common/components/BaseWrapper';
import Divider from '../../common/components/Divider';
import { multiLineEllipsisStyle } from '../../common/utils/multiLineEllipsisStyle';
import useOrderSummaryInfo from '../hooks/useOrderSummaryInfo';
import { isPC } from '../../../../util/window/getDevice';

const Wrapper = styled(BaseWrapper)`
  padding: ${isPC ? `${vars.spacing.$16} ${vars.spacing.$32}` : vars.spacing.$16};
  border-radius: ${isPC && `0 0 ${vars.radius.$10} ${vars.radius.$10}`};
`;

const Stack = styled.div`
  p:first-of-type {
    margin-bottom: ${vars.spacing.$2};
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ColoredTypography = styled(Typography)<{ color: string }>`
  color: ${({ color }) => color};
`;

const AddressText = styled(Typography)`
  color: ${vars.color.text.$secondary};
  ${multiLineEllipsisStyle(2)};
`;

const CopyButton = styled(Button)`
  margin-left: auto;
`;

interface Props {
  groupOrderNo: OrderDetail['groupOrderNo'];
  paymentCompletedAt: OrderDetail['paymentCompletedAt'];
  address: Omit<Address, 'zipcode'>;
}

const OrderSummaryInfo = ({ groupOrderNo, paymentCompletedAt, address }: Props) => {
  const { date, time, handleClickCopyOrderNo } = useOrderSummaryInfo({ paymentCompletedAt });

  return (
    <Wrapper>
      <Row>
        <Stack>
          <ColoredTypography variant="$largeRegular" color={vars.color.text.$tertiary}>
            {`${date} ${time}`}
          </ColoredTypography>
          <ColoredTypography
            variant="$xlargeSemibold"
            color={vars.color.text.$primary}
          >{`주문번호 ${groupOrderNo}`}</ColoredTypography>
        </Stack>
        <CopyButton
          _type="secondary"
          _style="fill"
          color="light"
          size="small"
          onClick={() => handleClickCopyOrderNo(groupOrderNo)}
        >
          <Typography variant={'$largeSemibold'}>복사</Typography>
        </CopyButton>
      </Row>
      <Divider width="100%" height="1px" margin={`${vars.spacing.$16} 0`} />
      <AddressText variant="$xlargeRegular">
        {isPC ? (
          <>
            {address.address}
            <br />
            {address.addressDetail}
          </>
        ) : (
          `${address.address} ${address.addressDetail}`
        )}
      </AddressText>
    </Wrapper>
  );
};

export default OrderSummaryInfo;
