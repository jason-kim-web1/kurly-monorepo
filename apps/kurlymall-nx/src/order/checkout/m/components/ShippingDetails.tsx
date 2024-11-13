import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { ReceiverForm } from '../../shared/interfaces';

import Button from '../../../../shared/components/Button/Button';
import Empty from './ShippingDetails/Empty';
import Details from './ShippingDetails/Details';
import Orderer from './ShippingDetails/Orderer';
import { REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE } from '../../shared/constants/delivery-request-validate-message';

const styles = {
  button: css`
    flex-shrink: 0;
    > span {
      font-size: 14px;
      font-weight: 500;
    }
  `,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 64px;
  justify-content: space-between;
  align-items: center;
`;

const Contents = styled.div`
  padding: 16px 14px 20px 0;
`;

interface Props {
  receiverForm: ReceiverForm;
  onClick: () => void;
}

export default function ShippingDetails({ receiverForm, onClick }: Props) {
  const { name, phone, requiredFillReceiverContact, requiredFillReceiverDetail } = receiverForm;

  if (requiredFillReceiverContact && requiredFillReceiverDetail) {
    return (
      <Wrapper id="checkout-shipping-details" onClick={onClick}>
        <Empty text={REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE} hasArrow />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Contents id="checkout-shipping-details">
        <Details receiverForm={receiverForm} />
        <Orderer name={name} phone={phone} requiredFillReceiverContact={requiredFillReceiverContact} />
      </Contents>
      <Button theme="tertiary" text="수정" width={52} height={38} radius={4} css={styles.button} onClick={onClick} />
    </Wrapper>
  );
}
