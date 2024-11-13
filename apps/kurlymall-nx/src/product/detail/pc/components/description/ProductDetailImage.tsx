import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const DetailImage = styled.img`
  width: 100%;
`;

interface Props {
  detailImages: string[];
}

export default function ProductDetailImage({ detailImages }: Props) {
  if (isEmpty(detailImages)) {
    return null;
  }

  return (
    <Container>
      {detailImages.map((imageUrl) => (
        <DetailImage key={imageUrl} src={imageUrl} alt="자세히보기 이미지" />
      ))}
    </Container>
  );
}
