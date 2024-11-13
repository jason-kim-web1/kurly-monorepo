import { useMemo } from 'react';

import { useAppSelector } from '../../../../shared/store';
import { parseSummary } from '../../../../shared/utils/order';

import useToggle from '../../shared/hooks/useToggle';

import Collapse from '../../../../shared/components/Collapse/Collapse';
import CollapseSummary from '../../../../shared/components/Collapse/CollapseSummary';
import { Divider } from '../../../../shared/components/Divider/Divider';
import { CheckoutType } from '../../../../shared/interfaces';
import ProductContents from '../../shared/components/ProductContents';

export default function Products({ title }: { title: string }) {
  const { products, checkoutType } = useAppSelector(({ checkout }) => ({
    products: checkout.products,
    checkoutType: checkout.checkoutType,
  }));

  const { toggleWithAmplitude, isOpen } = useToggle(
    checkoutType === CheckoutType.GIFT_CARD || checkoutType === CheckoutType.LIQUIDITY,
  );
  const { text, divider, suffix } = useMemo(() => parseSummary({ products }), [products]);

  return (
    <>
      <Collapse
        title={title}
        summary={<CollapseSummary text={text} divider={divider} suffix={suffix} />}
        opened={isOpen}
        onClick={() => toggleWithAmplitude('상품정보')}
      >
        <ProductContents />
      </Collapse>
      <Divider />
    </>
  );
}
