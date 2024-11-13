import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';

import { useAppSelector } from '../../../../shared/store';
import ProductGroupsCollection from './ProductGroupsCollection';
import { isPC } from '../../../../../util/window/getDevice';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${vars.spacing.$16};
  background-color: ${isPC ? '#fafafa' : COLOR.bg};
  padding: ${isPC ? vars.spacing.$24 : `${vars.spacing.$16} ${vars.spacing.$16} ${vars.spacing.$12}`};
  letter-spacing: normal;
`;

export default function ProductContents() {
  const { giveawayProducts, checkoutType, productGroupsByDeliveryPolicies } = useAppSelector(({ checkout }) => ({
    products: checkout.products,
    productGroupsByDeliveryPolicies: checkout.productGroupsByDeliveryPolicies,
    giveawayProducts: checkout.giveawayProducts,
    checkoutType: checkout.checkoutType,
  }));

  return (
    <Wrapper>
      {productGroupsByDeliveryPolicies?.map((productGroupsByDeliveryPolicy) => (
        <ProductGroupsCollection
          key={productGroupsByDeliveryPolicy.deliveryPolicy}
          productGroupsByDeliveryPolicy={productGroupsByDeliveryPolicy}
          checkoutType={checkoutType}
        />
      ))}
      {!isEmpty(giveawayProducts) && (
        <ProductGroupsCollection
          productGroupsByDeliveryPolicy={{
            deliveryPolicy: 'GIVEAWAY',
            deliveryPolicyDisplayName: '증정상품',
            productGroups: [{ products: giveawayProducts }],
          }}
          isGiveaway
        />
      )}
    </Wrapper>
  );
}
