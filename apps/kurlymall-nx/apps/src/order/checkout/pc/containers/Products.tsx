import { useMemo } from 'react';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';

import useToggle from '../../shared/hooks/useToggle';

import COLOR from '../../../../shared/constant/colorset';
import { parseSummary } from '../../../../shared/utils/order';

import { Title } from '../components/Title';
import ProductFoldIcon from '../../../../shared/components/icons/ProductFoldIcon';
import { CheckoutType } from '../../../../shared/interfaces';
import ProductContents from '../../shared/components/ProductContents';

const Summary = styled.div`
  padding: 28px 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid ${COLOR.bg};
`;

const Suffix = styled.span`
  color: ${COLOR.kurlyPurple};
`;

export default function Products() {
  const { products, checkoutType } = useAppSelector(({ checkout }) => ({
    products: checkout.products,
    checkoutType: checkout.checkoutType,
  }));
  const { isOpen, toggle } = useToggle(
    checkoutType === CheckoutType.GIFT_CARD || checkoutType === CheckoutType.LIQUIDITY,
  );

  const { text, divider, suffix } = useMemo(() => parseSummary({ products, suffixName: '개' }), [products]);

  return (
    <>
      <Title title="주문 상품" noMargin>
        <ProductFoldIcon expand={isOpen} onClick={toggle} />
      </Title>
      {isOpen && <ProductContents />}
      {!isOpen && (
        <Summary>
          {text}
          {divider && ` ${divider}`}
          {suffix && <Suffix> {suffix}</Suffix>} 상품을 주문합니다.
        </Summary>
      )}
    </>
  );
}
