import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  overflow: hidden;
  max-width: 348px;
`;

const Image = styled.img`
  width: 46px;
  height: 60px;
  object-fit: cover;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 260px;
  padding-left: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
`;

const ProductNameText = styled.span`
  overflow: hidden;
  width: 100%;
  padding-bottom: 4px;
  color: ${COLOR.kurlyGray450};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const InformationText = styled.span`
  color: ${COLOR.kurlyGray800};
`;

interface Props {
  productImageUrl: string;
  productName: string;
  isInCart: boolean;
}

export default function CartItemPanel({ productImageUrl, productName, isInCart }: Props) {
  return (
    <Container>
      <Image src={productImageUrl} alt="상품 이미지" />
      <Contents>
        <ProductNameText>{productName}</ProductNameText>
        <InformationText>장바구니에 상품을 담았습니다.</InformationText>
        {isInCart && <InformationText>이미 담은 상품의 수량을 추가했습니다.</InformationText>}
      </Contents>
    </Container>
  );
}
