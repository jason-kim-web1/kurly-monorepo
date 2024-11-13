import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background: ${COLOR.kurlyWhite};
`;

const Button = styled.button`
  width: 100%;
  height: 42px;
  font-size: 15px;
  font-weight: 600;
  line-height: 42px;
  border-radius: 6px;
  border: 1px solid ${COLOR.kurlyPurple};
  background-color: ${COLOR.kurlyWhite};
  color: ${COLOR.kurlyPurple};
`;

interface Props {
  onClick(): void;
}

export default function ProductInquiryPageButton({ onClick }: Props) {
  return (
    <Container>
      <Button type="button" onClick={onClick}>
        상품 문의하기
      </Button>
    </Container>
  );
}
