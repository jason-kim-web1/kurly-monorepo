import styled from '@emotion/styled';

import { MemberOrderProduct } from '../../../../shared/types';
import useOrderProductItem from '../../../../hook/useOrderProductItem';
import Checkbox from '../../../../../../shared/components/Input/Checkbox';
import { NoProductImageLogo } from '../../../../../../shared/images';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 16px 0;
`;

const CheckboxWrap = styled.div`
  flex-shrink: 0;
  margin-right: 12px;
  label {
    padding: 0;
    img {
      margin-right: 0;
    }
  }
`;

const InquiryProductWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
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
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
  ${({ src }) =>
    src &&
    `
    background-image: url('${src}');
  `}
`;

const Product = styled.span`
  flex: 2;
  overflow: hidden;
  width: 250px;
  margin-left: 16px;
  > p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const ProductName = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #333333;
`;

const PackageName = styled.p`
  font-size: 12px;
  line-height: 18px;
  color: #999999;
  margin-top: 2px;
`;

const Payment = styled.div`
  width: 98px;
  text-align: right;
  color: #333;
  line-height: 17px;
`;

const Amount = styled.p({
  fontSize: '12px',
});

const Price = styled.p`
  margin-top: 2px;
  font-size: 14px;
  span {
    font-weight: bold;
  }
`;

interface Props {
  product: MemberOrderProduct;
}

export default function ProductItem({ product }: Props) {
  const { contentsProductName, dealProductName, quantity, paymentAmount, imageUrl, selected } = product;

  const { toggleSelect, selectionEnabled } = useOrderProductItem(product);

  return (
    <Container>
      <CheckboxWrap>
        <Checkbox label="" checked={selected} onChange={toggleSelect} disabled={!selectionEnabled} />
      </CheckboxWrap>
      <InquiryProductWrap>
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
        <Payment>
          <Amount>{quantity.toLocaleString()}개</Amount>
          <Price>
            <span>{paymentAmount.toLocaleString()}</span>원
          </Price>
        </Payment>
      </InquiryProductWrap>
    </Container>
  );
}
