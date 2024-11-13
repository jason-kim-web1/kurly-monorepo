import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ReceiverForm } from '../../shared/interfaces';

const Wrapper = styled.div`
  padding-top: 4px;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 3px 8px;
  height: 22px;
  border-radius: 11px;
  font-weight: 600;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  background-color: ${COLOR.bg};
  white-space: nowrap;
`;

const AddressText = styled.span`
  display: block;
  word-break: break-word;
  font-weight: 600;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
`;

const EmptyAddressDetail = styled.p`
  padding-top: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: ${COLOR.invalidRed};
`;

interface Props {
  receiverForm?: ReceiverForm;
}

export default function Address({ receiverForm }: Props) {
  if (!receiverForm?.address) {
    return (
      <Wrapper>
        <AddressText></AddressText>
      </Wrapper>
    );
  }

  const { isDefaultAddress, address, addressDetail } = receiverForm;

  return (
    <Wrapper>
      {isDefaultAddress && <Badge>기본배송지</Badge>}
      <AddressText>
        {address} {addressDetail}
      </AddressText>
      {!addressDetail && <EmptyAddressDetail>상세주소를 입력해주세요</EmptyAddressDetail>}
    </Wrapper>
  );
}
