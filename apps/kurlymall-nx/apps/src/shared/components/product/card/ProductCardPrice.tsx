import styled from '@emotion/styled';

import { isNull } from 'lodash';

import { addComma } from '../../../services';
import COLOR from '../../../constant/colorset';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceTag = styled.span<{ lineThrough?: boolean }>`
  text-decoration: ${({ lineThrough }) => (lineThrough ? 'line-through' : '')};
  color: ${({ lineThrough }) => (lineThrough ? COLOR.kurlyGray400 : COLOR.benefitGray)};
  white-space: nowrap;
`;

const DiscountRate = styled.span`
  color: ${COLOR.pointText};
`;

interface Props {
  price: number;
  discount: {
    price: number | null;
    rate: number;
  };
  className?: string;
  isMultiplePrice?: boolean;
}

export default function ProductCardPrice({
  price: originPrice,
  discount: { price: discountedPrice, rate: discountRate },
  className,
  isMultiplePrice,
}: Props) {
  const isDiscountedPrice = discountedPrice !== originPrice && discountedPrice !== null;

  return (
    <Container className={`${className} ${isDiscountedPrice ? 'discount-price' : ''}`}>
      <div>
        {!isDiscountedPrice && !!discountRate ? (
          <DiscountRate className="discount-rate">{discountRate}%</DiscountRate>
        ) : null}
        <PriceTag className={isDiscountedPrice ? 'dimmed-price' : 'sales-price'}>
          <span className="price-number">{addComma(originPrice)}</span>
          <span className="won">원</span>
          {!isDiscountedPrice && isMultiplePrice ? '~' : null}
        </PriceTag>
      </div>
      {isDiscountedPrice ? (
        <div className="discount">
          {!!discountRate ? <DiscountRate className="discount-rate">{discountRate}%</DiscountRate> : null}
          {!isNull(discountedPrice) ? (
            <PriceTag className="sales-price">
              <span className="price-number">{addComma(discountedPrice)}</span>
              <span className="won">원</span>
              {isMultiplePrice && '~'}
            </PriceTag>
          ) : null}
        </div>
      ) : null}
    </Container>
  );
}
