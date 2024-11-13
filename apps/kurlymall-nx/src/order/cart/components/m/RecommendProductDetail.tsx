import styled from '@emotion/styled';

import { Typography } from '@thefarmersfront/kpds-react';

import { vars } from '@thefarmersfront/kpds-css';

import { memo } from 'react';

import { multiMaxLineText } from '../../../../shared/utils';
import { addComma } from '../../../../shared/services';
import { MembershipLabel as ProductLabel } from '../../../../shared/interfaces';
import RecommendProductLabel from './RecommendProductLabel';

const Wrapper = styled.div`
  width: 100%;
  margin-right: ${vars.spacing.$12};
`;

const Title = styled(Typography)`
  margin: ${vars.spacing.$4} ${vars.spacing.$0};
  ${multiMaxLineText(2)};
`;

const Price = styled(Typography)`
  display: flex;
  align-items: center;
  color: ${vars.color.text.$primary};
`;

const DiscountPercent = styled.span`
  margin-right: ${vars.spacing.$4};
  color: ${vars.color.main.$tertiary};
`;
interface RecommendProductDetailProps {
  labels: ProductLabel[];
  discountRate: number | null;
  productName: string;
  price: number;
}

const RecommendProductDetail = ({ labels, productName, discountRate, price }: RecommendProductDetailProps) => {
  return (
    <Wrapper>
      <RecommendProductLabel labels={labels} />
      <Title variant={'$largeRegular'} as={'p'}>
        {productName}
      </Title>
      <Price variant={'$largeBold'} as={'p'}>
        {discountRate && <DiscountPercent>{discountRate}%</DiscountPercent>}
        {addComma(price)}
      </Price>
    </Wrapper>
  );
};

export default memo(RecommendProductDetail);
