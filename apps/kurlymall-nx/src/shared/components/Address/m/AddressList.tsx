import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../constant/colorset';

import Loading from '../../Loading/Loading';

import AddressItemList from '../AddressItemList';
import { AddressListProps } from '../../../interfaces/ShippingAddress';

const Wrapper = styled.div``;

const Empty = styled.div`
  display: flex;
  position: relative;
  height: calc(100vh - 88px);
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  text-align: center;
`;

const Description = styled.p`
  padding: 13px 0 0 20px;
  height: 44px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray450};
  background-color: ${COLOR.kurlyGray100};
  &:before {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-top: 3px;
    background: url('https://res.kurly.com/mobile/ico/2006/ico_info_v4.svg') 0 0 no-repeat;
    background-size: 14px 14px;
    vertical-align: top;
    content: '';
  }
`;

const ListContainer = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

interface Props {
  loading: boolean;
  list?: AddressListProps[];
  handleChecked: (addressNo: number) => void;
  handleUpdate: (addressNo: number) => void;
}

export default function AddressList({ loading, list = [], handleChecked, handleUpdate }: Props) {
  return (
    <Wrapper>
      <Description>배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.</Description>
      <ListContainer>
        {loading && <Loading testId="loading" />}
        {!loading && isEmpty(list) && (
          <Empty>
            <Message>상품 구매를 위한 배송지를 설정해주세요</Message>
          </Empty>
        )}
        {list.map((item: AddressListProps) => (
          <AddressItemList
            key={`kurly-address-${item.no}`}
            addressItem={item}
            onChangeChecked={() => handleChecked(item.no)}
            onClickUpdate={() => handleUpdate(item.no)}
          />
        ))}
      </ListContainer>
    </Wrapper>
  );
}
