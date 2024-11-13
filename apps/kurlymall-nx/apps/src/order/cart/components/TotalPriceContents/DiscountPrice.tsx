import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { addComma } from '../../../../shared/services';
import { useAppSelector } from '../../../../shared/store';
import { totalPriceSelector } from '../../store/cart';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const Price = styled(Typography)`
  color: ${vars.color.main.$tertiary};
`;

const GuestNotice = styled(Typography)`
  color: ${vars.color.text.$secondary};
  margin-top: ${vars.spacing.$4};
`;

export default function DiscountPrice() {
  const { discountPrice } = useAppSelector(totalPriceSelector);
  const isGuest = useAppSelector(({ auth }) => auth.isGuest);

  return (
    <>
      <Typography variant={`$xlargeRegular`}>상품할인금액</Typography>
      <Content>
        <Price variant={`$xlargeSemibold`}>
          {addComma(discountPrice === 0 ? discountPrice : `-${discountPrice}`)}원
        </Price>{' '}
        {isGuest && <GuestNotice variant={`$smallRegular`}>로그인 후 할인 금액 적용</GuestNotice>}
      </Content>
    </>
  );
}
