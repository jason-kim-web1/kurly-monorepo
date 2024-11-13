import styled from '@emotion/styled';
import { isEmpty } from 'lodash';
import { useState } from 'react';

import COLOR from '../../../constant/colorset';

import Button from '../../Button/Button';
import Checkbox from '../../Input/Checkbox';
import Loading from '../../Loading/Loading';
import AdditionalAddress from './AdditionalAddress';
import DeliveryPolicyInfo from './DeliveryPolicyInfo';
import NotAvailablePlaces from '../SearchAddress/result/NotAvailablePlaces';
import { AddressPoliciesProps, SearchAddressResultResponse } from '../../../interfaces/ShippingAddress';

const DefaultAddress = styled.div`
  padding-bottom: 12px;
`;

const Description = styled.p`
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
  padding: 8px 0 12px;
`;

const styles = {
  text: {
    paddingTop: '12px',
    fontSize: '15px',
  },
  buttonText: {
    span: {
      fontWeight: 600,
    },
  },
  notAvailablePlacesMW: {
    p: {
      padding: '4px 0px',
    },
    span: {
      fontSize: '12px',
      color: COLOR.kurlyGray450,
    },
    strong: {
      fontSize: '12px',
      fontWeight: 600,
    },
  },
};

interface Props {
  loading: boolean;
  isGuest: boolean;
  isEmptyAddress?: boolean;
  searchAddressResult?: SearchAddressResultResponse;
  onChangeAddress: (params: { name?: string; value: string }) => void;
  onClick: (isDefault: boolean) => void;
}

export default function AddressResult({
  loading,
  isGuest,
  isEmptyAddress,
  searchAddressResult,
  onChangeAddress,
  onClick,
}: Props) {
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const onChange = () => {
    setIsDefault((v) => !v);
  };

  if (loading || !searchAddressResult) {
    return <Loading />;
  }

  const { address, addressDetail, deliveryType, policies } = searchAddressResult;

  const policy = policies?.find((it: AddressPoliciesProps) => !isEmpty(it.deactivation));

  return (
    <>
      <DeliveryPolicyInfo type={deliveryType} deactivation={policy?.deactivation} />
      <AdditionalAddress address={address} addressDetail={addressDetail} onChange={onChangeAddress} />
      <DefaultAddress>
        {isGuest && (
          <Description>
            ※ 저장된 배송지는 최대 7일 간 임시 저장 후 자동 삭제됩니다.
            <br />
            로그인 할 경우, 회원님의 배송지 목록에 추가됩니다.
          </Description>
        )}
        {!isGuest && !isEmptyAddress && (
          <Checkbox label="기본 배송지로 저장" checked={isDefault} onChange={onChange} css={styles.text} />
        )}
      </DefaultAddress>

      <Button
        data-testid="submit-button"
        text="저장"
        onClick={() => onClick(isDefault)}
        radius={6}
        css={styles.buttonText}
      />
      <div css={styles.notAvailablePlacesMW}>{deliveryType === 'direct' && <NotAvailablePlaces />}</div>
    </>
  );
}
