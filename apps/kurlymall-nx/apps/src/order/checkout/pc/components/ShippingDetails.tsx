import styled from '@emotion/styled';

import { ReceiverForm } from '../../shared/interfaces';

import Empty from './ShippingDetails/Empty';
import Orderer from './ShippingDetails/Orderer';
import Details from './ShippingDetails/Details';

import Button from '../../../../shared/components/Button/Button';
import InformationRow from '../../../../shared/components/layouts/InformationRow';
import {
  REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE,
  REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE,
} from '../../shared/constants/delivery-request-validate-message';

const Wrapper = styled.div`
  > div > span:first-of-type {
    line-height: 24px;
  }
`;

const styles = {
  button: {
    '> span': {
      fontSize: '12px',
      lineHeight: '28px',
      fontWeight: 500,
    },
  },
  space: {
    paddingBottom: '0px',
  },
};

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

interface Props {
  receiverForm: ReceiverForm;
  onClick: () => void;
}

export default function ShippingDetails({ receiverForm, onClick }: Props) {
  const { name, phone, requiredFillReceiverDetail, requiredFillReceiverContact } = receiverForm;

  if (requiredFillReceiverContact && requiredFillReceiverDetail) {
    return (
      <Wrapper id="checkout-shipping-details">
        <InformationRow title="배송 요청사항">
          <Empty text={REQUIRED_FILL_RECEIVER_DETAIL_AND_CONTACT_MESSAGE} />
          <ButtonWrapper>
            <Button
              theme="secondary"
              text="입력"
              width={60}
              height={30}
              radius={3}
              css={styles.button}
              onClick={onClick}
            />
          </ButtonWrapper>
        </InformationRow>
      </Wrapper>
    );
  }

  return (
    <Wrapper id="checkout-shipping-details">
      <InformationRow title="배송 요청사항" css={styles.space}>
        <>
          <Details receiverForm={receiverForm} />
          {requiredFillReceiverContact ? (
            <Empty text={REQUIRED_FILL_RECEIVER_CONTACT_MESSAGE} />
          ) : (
            <Orderer name={name} phone={phone} />
          )}
        </>
        <ButtonWrapper>
          <Button
            theme="tertiary"
            text="수정"
            width={60}
            height={30}
            radius={3}
            css={styles.button}
            onClick={onClick}
          />
        </ButtonWrapper>
      </InformationRow>
    </Wrapper>
  );
}
