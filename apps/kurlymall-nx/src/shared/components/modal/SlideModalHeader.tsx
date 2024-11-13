import styled from '@emotion/styled';

import { BottomSheetClose } from '../../images';

interface Props {
  onClose(): void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 12px 0;
`;

const CloseButton = styled.button`
  width: 35px;
  height: 4px;
  display: inline-block;
  background-image: url(${BottomSheetClose});
  background-size: cover;
  background-position: center;
`;

export default function SlideModalHeader({ onClose }: Props) {
  return (
    <Container>
      <CloseButton type="button" onClick={onClose} />
    </Container>
  );
}
