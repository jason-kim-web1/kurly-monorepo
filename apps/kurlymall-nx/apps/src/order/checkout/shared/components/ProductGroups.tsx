import { memo } from 'react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { CheckoutType, ProductGroup } from '../../../../shared/interfaces';
import ProductItem from './ProductItem';
import Divider from '../../../common/components/Divider';
import { multiLineEllipsisStyle } from '../../../common/utils/multiLineEllipsisStyle';

const Wrapper = styled.ul`
  padding-top: ${vars.spacing.$12};
`;

const PartnerName = styled(Typography)`
  color: ${vars.color.text.$secondary};
  margin-bottom: ${vars.spacing.$12};
  ${multiLineEllipsisStyle(1)};
`;

interface Props {
  productGroups: ProductGroup[];
  isGiveaway?: boolean;
  checkoutType?: CheckoutType;
}

function ProductGroups({ productGroups, isGiveaway = false, checkoutType }: Props) {
  return (
    <Wrapper>
      {productGroups.map(({ products, isKurlyFulfillmentProduct, partnerName }, index) => (
        <div key={`${index}-${partnerName}`}>
          <Divider width="100%" height={`${vars.spacing.$1}`} margin={`0 0 ${vars.spacing.$12}`} />
          {!isKurlyFulfillmentProduct && partnerName && (
            <PartnerName variant={'$largeRegular'}>{partnerName}</PartnerName>
          )}
          {products?.map((product) => (
            <ProductItem key={product.id} product={product} isGiveaway={isGiveaway} checkoutType={checkoutType} />
          ))}
        </div>
      ))}
    </Wrapper>
  );
}

export default memo(ProductGroups);
