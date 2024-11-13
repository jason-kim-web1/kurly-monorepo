import styled from '@emotion/styled';

import { MemberOrderProduct } from '../../../../shared/types';
import { addComma } from '../../../../../../shared/services';
import { NoProductImageLogo } from '../../../../../../shared/images';

const Container = styled.div`
  padding: 16px 0;
`;

const ProductWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Thumbnail = styled.div`
  overflow: hidden;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 4px;
  background-size: auto;
  background: #f5f5f5 url(${NoProductImageLogo}) no-repeat 50% 50%;
`;

const Image = styled.span<{ src: string }>`
  display: block;
  width: 100%;
  height: 100%;
  background-image: url('${({ src }) => src && src}');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
`;

const Product = styled.div`
  flex-grow: 1;
  margin-left: 16px;
`;

const ProductName = styled.p`
  overflow: hidden;
  max-width: 362px;
  font-size: 14px;
  line-height: 20px;
  color: #333;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PackageName = styled.p`
  margin-top: 2px;
  max-width: 362px;
  font-size: 12px;
  line-height: 18px;
  color: #999;
`;

const Amount = styled.p`
  flex-shrink: 0;
  width: 68px;
  font-size: 12px;
  text-align: right;
`;

const Price = styled.p`
  flex-shrink: 0;
  width: 100px;
  font-size: 14px;
  color: #333;
  text-align: right;
`;

const Number = styled.span`
  font-weight: bold;
`;

const DeleteButton = styled.button`
  display: block;
  width: 30px;
  height: 30px;
  margin-left: 16px;
  border: 0;
  background: url('https://res.kurly.com/kurly/ico/2021/delete-personal-inquiry_30_30.svg') 0 0 no-repeat;
  span {
    overflow: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
    clip: rect(0, 0, 0, 0);
  }
`;

interface Props {
  product: MemberOrderProduct;
  displayDeselectButton: boolean;
  handleDeselected(): void;
}

export default function InquiryOrderProduct({ product, displayDeselectButton, handleDeselected }: Props) {
  const { contentsProductName, dealProductName, imageUrl, quantity, paymentAmount } = product;

  return (
    <Container>
      <ProductWrap>
        <Thumbnail>
          <Image src={imageUrl} />
        </Thumbnail>
        <Product>
          {contentsProductName ? (
            <>
              <ProductName>{dealProductName}</ProductName>
              <PackageName>{contentsProductName}</PackageName>
            </>
          ) : (
            <ProductName>{dealProductName}</ProductName>
          )}
        </Product>
        <Amount>{quantity}개</Amount>
        <Price>
          <Number>{addComma(paymentAmount)}</Number>원
        </Price>
        {displayDeselectButton && (
          <DeleteButton type="button" onClick={handleDeselected}>
            <span>삭제</span>
          </DeleteButton>
        )}
      </ProductWrap>
    </Container>
  );
}
