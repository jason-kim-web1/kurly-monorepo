import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../constant/colorset';

import { zIndex } from '../../../styles';

import Button from '../../Button/Button';
import Loading from '../../Loading/Loading';
import AddressItemList from '../AddressItemList';
import { AddressListProps } from '../../../interfaces/ShippingAddress';

const Wrapper = styled.div`
  padding: 135px 30px 60px;
  letter-spacing: -0.5px;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.fixedHeader};
  padding: 30px 30px 0;
  box-sizing: border-box;
  background: ${COLOR.kurlyWhite};
`;

const Title = styled.h2`
  font-weight: 500;
  font-size: 24px;
  line-height: 36px;
`;

const Description = styled.span`
  display: inline-block;
  padding-left: 12px;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray450};
`;

const ListHeader = styled.div`
  display: flex;
  overflow: hidden;
  margin-top: 18px;
  padding: 15px 0 13px;
  border-top: 2px solid ${COLOR.kurlyGray800};
  border-bottom: 1px solid ${COLOR.kurlyGray800};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  > span {
    width: 64px;
    &:nth-of-type(2) {
      flex: 1;
    }
  }
`;

const ListContainer = styled.div();

const Empty = styled.div`
  display: flex;
  height: calc(100vh - 197px);
  justify-content: center;
  align-items: center;
`;

const Message = styled.p`
  text-align: center;
`;

const NewAddressWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  button {
    > span {
      font-weight: 500;
      line-height: 24px;
      img {
        width: 16px;
        height: 16px;
        margin-top: 5px;
        vertical-align: top;
      }
    }
    border: 0;
    border-radius: 0;
    border-top: 1px solid ${COLOR.bg};
  }
`;

interface Props {
  loading: boolean;
  list?: AddressListProps[];
  handleCreate: () => void;
  handleChecked: (addressNo: number) => void;
  handleUpdate: (addressNo: number) => void;
}

export default function AddressList({ loading, list = [], handleCreate, handleChecked, handleUpdate }: Props) {
  return (
    <Wrapper>
      <HeaderWrapper>
        <Title>
          배송지
          <Description>배송지에 따라 상품정보 및 배송유형이 달라질 수 있습니다.</Description>
        </Title>
        <ListHeader>
          <span>선택</span>
          <span>배송 정보</span>
          <span>수정</span>
        </ListHeader>
      </HeaderWrapper>
      <ListContainer>
        {loading && <Loading testId="loading" />}
        {!loading && isEmpty(list) && (
          <Empty>
            <Message>상품 구매를 위한 배송지를 설정해주세요</Message>
          </Empty>
        )}
        {list?.map((item: AddressListProps) => (
          <AddressItemList
            key={`kurly-address-${item.no}`}
            addressItem={item}
            onChangeChecked={() => handleChecked(item.no)}
            onClickUpdate={() => handleUpdate(item.no)}
          />
        ))}
      </ListContainer>
      <NewAddressWrapper>
        <Button
          text="새 배송지 추가"
          theme="tertiary"
          height={60}
          icon="https://res.kurly.com/pc/ico/2006/ico_add_16x16.svg"
          onClick={handleCreate}
        />
      </NewAddressWrapper>
    </Wrapper>
  );
}
