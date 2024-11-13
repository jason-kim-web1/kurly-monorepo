import styled from '@emotion/styled';

import { useState } from 'react';

import COLOR from '../../../../../../shared/constant/colorset';
import { NoProductImageLogo } from '../../../../../../shared/images';

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`;

const Img = styled.img<{ error: boolean }>`
  overflow: hidden;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 4px;
  background-color: ${COLOR.kurlyGray150};
  object-fit: ${({ error }) => (error ? 'scale-down' : 'cover')};
`;

const Product = styled.div`
  margin-left: 16px;
`;

const ProductName = styled.p`
  overflow: hidden;
  width: 508px;
  font-size: 14px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const PackageName = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
  margin-top: 2px;
`;

const Amount = styled.p`
  width: 68px;
  margin-right: 10px;
  font-size: 12px;
  text-align: right;
  color: ${COLOR.kurlyGray800};
`;

const Price = styled.p`
  width: 100px;
  font-size: 14px;
  text-align: right;
  color: ${COLOR.kurlyGray800};
`;

const Number = styled.span`
  font-weight: bold;
`;

const fallbackImageUrl = NoProductImageLogo;

interface Props {
  dealProductName: string;
  contentsProductName: string | null;
  imageUrl: string;
  paymentAmount: number;
  quantity: number;
  showPackageName?: boolean;
}

export default function InquiryProduct({
  contentsProductName,
  paymentAmount,
  dealProductName,
  imageUrl,
  quantity,
  showPackageName = true,
}: Props) {
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  const imageOnErrorHandler = () => setImageLoadFailed(true);

  return (
    <Container>
      <Img
        alt="product-thumbnail"
        src={imageLoadFailed ? fallbackImageUrl : imageUrl}
        onError={imageOnErrorHandler}
        error={imageLoadFailed}
      />
      <Product>
        {showPackageName && contentsProductName ? (
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
        <Number>{paymentAmount.toLocaleString()}</Number>원
      </Price>
    </Container>
  );
}
