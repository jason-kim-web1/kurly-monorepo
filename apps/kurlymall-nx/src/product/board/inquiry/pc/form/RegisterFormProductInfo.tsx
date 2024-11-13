import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  padding: 16px 0;
  border-bottom: 1px solid ${COLOR.bg};
`;

const ThumbnailWarp = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
`;

const Thumbnail = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 4px;
  background-color: ${COLOR.kurlyGray100};
  background-position: 50% 50%;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ProductName = styled.div`
  flex: 6.5;
  display: flex;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: 500;
    line-height: 22px;
    color: ${COLOR.kurlyGray800};
    text-overflow: ellipsis;
    letter-spacing: normal;
  }
`;

interface Props {
  imageUrl: string;
  productName: string;
}

export default function RegisterFormProductInfo({ productName, imageUrl }: Props) {
  return (
    <Container>
      <ThumbnailWarp>
        <Thumbnail src={imageUrl} />
      </ThumbnailWarp>
      <ProductName>
        <span>{productName}</span>
      </ProductName>
    </Container>
  );
}
