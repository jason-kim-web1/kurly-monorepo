import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isUndefined } from 'lodash';

import { useAppSelector } from '../../../../shared/store';

import useCheckoutAddress from '../../shared/hooks/useCheckoutAddress';

import Button from '../../../../shared/components/Button/Button';
import Address from '../components/Address';
import ShippingTitle from '../components/ShippingTitle';
import LoadingShipping from '../components/Loading/LoadingShipping';
import { Divider } from '../../../../shared/components/Divider/Divider';
import { useCheckoutAddressQuery } from '../../shared/hooks/queries';

const styles = {
  button: css`
    margin-left: 12px;
    flex-shrink: 0;
    > span {
      font-size: 14px;
      font-weight: 500;
    }
  `,
};

const Wrapper = styled.div<{ isDefaultAddress: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px 20px;
  min-height: 64px;
`;

export default function ShippingContainer() {
  const { receiverForm, isDirectCheckout } = useAppSelector(({ checkout }) => ({
    receiverForm: checkout.receiverForm,
    isDirectCheckout: checkout.isDirectCheckout,
  }));

  useCheckoutAddressQuery();
  const { notifyAndRedirectToCart } = useCheckoutAddress();

  if (!receiverForm || receiverForm?.addressNo === -1) {
    return (
      <>
        <LoadingShipping />
        <Divider />
      </>
    );
  }

  const { isDefaultAddress } = receiverForm;

  return (
    <>
      <div id="shipping-container">
        <ShippingTitle />
        <Wrapper isDefaultAddress={isDefaultAddress}>
          <Address receiverForm={receiverForm} />
          {!isUndefined(isDirectCheckout) && !isDirectCheckout && (
            <Button
              theme="tertiary"
              text="변경"
              width={52}
              height={38}
              radius={4}
              css={styles.button}
              onClick={notifyAndRedirectToCart}
            />
          )}
        </Wrapper>
      </div>
      <Divider />
    </>
  );
}
