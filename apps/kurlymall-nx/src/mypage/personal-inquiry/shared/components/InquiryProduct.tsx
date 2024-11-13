import styled from '@emotion/styled';
import { useState } from 'react';

import { NoProductImageLogo } from '../../../../shared/images';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Img = styled.img({
  width: '50px',
  height: '50px',
  borderRadius: '4px',
  flexShrink: 0,
});

const ProductWrap = styled.div({
  marginLeft: '12px',
});

const ProductName = styled.div({
  paddingTop: '2px',
  fontSize: '14px',
  lineHeight: 'normal',
});

const PackageName = styled.div({
  marginTop: '4px',
  fontSize: '12px',
  lineHeight: 'normal',
  color: '#999999',
});

const PriceWrap = styled.div({
  marginTop: '4px',
});

const Price = styled.span({
  fontSize: '14px',
  fontWeight: 'bold',
});

const Divider = styled.span({
  display: 'inline-block',
  width: '1px',
  height: '10px',
  margin: '0 6px',
  backgroundColor: '#e2e2e2',
});

const Amount = styled.span({
  fontSize: '13px',
  color: '#666666',
});

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
  const [image, setImage] = useState(imageUrl);

  const imageOnErrorHandler = () => setImage(NoProductImageLogo);

  return (
    <Container className="inquiry-product-item">
      <Img src={image} alt="" onError={imageOnErrorHandler} />
      <ProductWrap>
        <ProductName>{dealProductName}</ProductName>
        {showPackageName && contentsProductName && <PackageName>{contentsProductName}</PackageName>}
        <PriceWrap>
          <Price>{paymentAmount.toLocaleString()}원</Price>
          <Divider />
          <Amount>{quantity}개</Amount>
        </PriceWrap>
      </ProductWrap>
    </Container>
  );
}
