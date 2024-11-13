import styled from '@emotion/styled';

import { CloseIconImg32Color999 } from '../../../../../shared/images';
import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 22px;
  border-bottom: 1px solid ${COLOR.bg};
  letter-spacing: -1px;
`;

const Header = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 30px;
  color: ${COLOR.kurlyGray800};
`;

const CloseButton = styled.span`
  width: 32px;
  height: 32px;
  display: inline-block;
  background-image: url(${CloseIconImg32Color999});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

interface Props {
  onClose(): void;
}

export default function RegisterFormHeader({ onClose }: Props) {
  return (
    <Container>
      <Header>상품 문의하기</Header>
      <CloseButton onClick={onClose} />
    </Container>
  );
}
