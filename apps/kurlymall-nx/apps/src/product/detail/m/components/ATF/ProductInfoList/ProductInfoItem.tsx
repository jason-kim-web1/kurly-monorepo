import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';
import type { ProductInfoItemTitleType } from '../../../../types';

const ProductInfoItemWrapper = styled.dl`
  display: flex;
  padding-top: 10px;
`;

const ProductInfoItemTitle = styled.dt<{ isBold: boolean }>`
  flex-basis: 85px;
  font-size: 14px;
  font-weight: ${({ isBold }) => (isBold ? 700 : 400)};
  color: ${({ isBold }) => (isBold ? COLOR.kurlyGray800 : COLOR.kurlyGray600)};
  line-height: 19px;
`;

const ProductInfoItemValueWrapper = styled.dd`
  flex: 1;
`;

const ProductInfoItemValue = styled.p<{ isBold: boolean }>`
  color: ${COLOR.kurlyGray800};
  font-weight: ${({ isBold }) => (isBold ? 700 : 500)};
  line-height: 19px;
  white-space: pre-line;
  word-break: break-all;
  overflow: hidden;
`;

const ProductInfoItemSubText = styled.span`
  display: block;
  padding: 4px 0 0;
  font-size: 13px;
  color: ${COLOR.kurlyGray600};
  line-height: 16px;
  white-space: pre-line;
`;

interface Props {
  title: ProductInfoItemTitleType | string;
  value: string;
  subText?: string;
  isBold?: boolean;
}

export default function ProductInfoItem({ title, value, subText = '', isBold = false }: Props) {
  return (
    <ProductInfoItemWrapper>
      <ProductInfoItemTitle isBold={isBold}>{title}</ProductInfoItemTitle>
      <ProductInfoItemValueWrapper>
        <ProductInfoItemValue isBold={isBold}>{value}</ProductInfoItemValue>
        {subText && <ProductInfoItemSubText>{subText}</ProductInfoItemSubText>}
      </ProductInfoItemValueWrapper>
    </ProductInfoItemWrapper>
  );
}
