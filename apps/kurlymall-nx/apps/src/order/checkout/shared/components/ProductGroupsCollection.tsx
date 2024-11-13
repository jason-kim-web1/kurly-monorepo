import { memo } from 'react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import { isEmpty } from 'lodash';

import { CheckoutType, ProductGroupsByDeliveryPolicy } from '../../../../shared/interfaces';
import ProductGroups from './ProductGroups';

const Wrapper = styled.ul`
  background-color: ${vars.color.$white};
  padding: ${vars.spacing.$16} ${vars.spacing.$16} ${vars.spacing.$4};
  border-radius: ${vars.radius.$12};
  font-size: ${vars.fontSize.$16};
  line-height: ${vars.lineHeight.$22};
`;

interface Props {
  productGroupsByDeliveryPolicy?: ProductGroupsByDeliveryPolicy;
  isGiveaway?: boolean;
  checkoutType?: CheckoutType;
}

function ProductGroupsCollection({ productGroupsByDeliveryPolicy, isGiveaway = false, checkoutType }: Props) {
  if (!productGroupsByDeliveryPolicy || isEmpty(productGroupsByDeliveryPolicy.productGroups)) {
    return null;
  }

  return (
    <Wrapper>
      <Typography variant={'$xlargeSemibold'}>{productGroupsByDeliveryPolicy.deliveryPolicyDisplayName}</Typography>
      <ProductGroups
        productGroups={productGroupsByDeliveryPolicy.productGroups}
        isGiveaway={isGiveaway}
        checkoutType={checkoutType}
      />
    </Wrapper>
  );
}

export default memo(ProductGroupsCollection);
