import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useAppSelector } from '../../../../shared/store';

import COLOR from '../../../../shared/constant/colorset';
import { ReceiverForm } from '../../shared/interfaces';

import InformationRow from '../../../../shared/components/layouts/InformationRow';
import Button from '../../../../shared/components/Button/Button';

const styles = {
  button: css`
    > span {
      font-size: 12px;
      line-height: 28px;
      font-weight: 500;
    }
  `,
  space: css`
    padding-bottom: 0px;
  `,
};

const Wrapper = styled.div`
  border-bottom: 1px solid ${COLOR.bg};
  padding-bottom: 20px;
  > div > span:first-of-type {
    line-height: 24px;
  }
`;

const DefaultAddress = styled.span`
  display: inline-block;
  height: 22px;
  padding: 0 8px;
  margin-bottom: 8px;
  border-radius: 11px;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  color: ${COLOR.kurlyGray600};
  background-color: ${COLOR.bgLightGray};
  vertical-align: top;
`;

const AddressText = styled.p`
  display: block;
  font-size: 14px;
  line-height: 24px;
  color: ${COLOR.kurlyGray800};
  > span {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 24px;
    span {
      height: 100%;
    }
  }
`;

const EmptyAddressDetail = styled.p`
  padding-top: 8px;
  font-size: 14px;
  line-height: 24px;
  color: ${COLOR.invalidRed};
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;

interface Props {
  receiverForm: ReceiverForm;
  onClick: () => void;
}

export default function Address({ receiverForm, onClick }: Props) {
  const isDirectCheckout = useAppSelector(({ checkout }) => checkout.isDirectCheckout);
  const { isDefaultAddress, address, addressDetail } = receiverForm;

  return (
    <Wrapper>
      <InformationRow title="배송지">
        {isDefaultAddress && <DefaultAddress>기본배송지</DefaultAddress>}
        <AddressText>
          {address} {addressDetail}
        </AddressText>
        {!addressDetail && <EmptyAddressDetail>상세주소를 입력해주세요</EmptyAddressDetail>}
        {!isDirectCheckout && (
          <ButtonWrapper>
            <Button
              theme="tertiary"
              text="변경"
              width={60}
              height={30}
              radius={3}
              css={styles.button}
              onClick={onClick}
            />
          </ButtonWrapper>
        )}
      </InformationRow>
    </Wrapper>
  );
}
