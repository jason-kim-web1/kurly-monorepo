import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';

const Container = styled.div`
  position: relative;
  margin-right: 0;
`;

const ImageCard = styled.div`
  ${productCardImageWrapper('133.3%')};
  width: 100%;
  background-color: ${COLOR.kurlyGray200};
`;

const Wrap = styled.div`
  margin-top: 8px;
  padding-right: 8px;
  padding-bottom: 8px;
`;

const Row = styled.div`
  background-color: ${COLOR.kurlyGray200};
  height: 19px;
  margin-top: 3px;
`;

const ShortRow = styled(Row)`
  width: 50%;
`;

interface Props {
  className?: string;
}

export default function ProductCardSkeleton({ className }: Props) {
  return (
    <Container className={className}>
      <ImageCard />
      <Wrap>
        <Row />
        <Row />
        <ShortRow />
      </Wrap>
    </Container>
  );
}
