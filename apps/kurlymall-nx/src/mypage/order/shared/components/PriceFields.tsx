import styled from '@emotion/styled';

import { addComma, prefixMinus, prefixPlus } from '../../../../shared/services/formatter.service';

import COLOR from '../../../../shared/constant/colorset';
import SubPriceIcon from '../../../../shared/components/icons/order/checkout/SubPriceIcon';

const SubPriceWrapper = styled.li<{ isGiftOrder?: boolean }>`
  display: flex;
  justify-content: space-between;
  color: ${COLOR.kurlyGray450};
  padding: ${({ isGiftOrder }) => (isGiftOrder ? '0 0 8px 0px' : '0 20px 6px 20px')};
  font-size: 13px;
  line-height: 19px;

  > div {
    display: flex;
  }
`;

const Won = styled.span`
  padding-left: 2px;
  vertical-align: bottom;
`;

export function SubPriceField({
  title,
  amount,
  prefix,
  isGiftOrder,
}: {
  title: string;
  amount: number;
  prefix?: typeof prefixMinus | typeof prefixPlus;
  isGiftOrder?: boolean;
}) {
  return (
    <SubPriceWrapper isGiftOrder={isGiftOrder}>
      <div>
        <SubPriceIcon />
        <span>{title}</span>
      </div>
      <span>
        {prefix && prefix(amount)}
        {addComma(amount)}
        <Won>원</Won>
      </span>
    </SubPriceWrapper>
  );
}
