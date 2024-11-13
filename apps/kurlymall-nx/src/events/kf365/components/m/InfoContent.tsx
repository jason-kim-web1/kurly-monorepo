import styled from '@emotion/styled';

import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import NextImage from '../../../../shared/components/NextImage';

const Container = styled.div`
  position: relative;
  height: 115vw;
`;

interface Props {
  info: string;
  bgImage: string;
}

export default function InfoContent({ info, bgImage }: Props) {
  return (
    <Container>
      <NextImage src={bgImage} layout="fill" objectFit="cover" alt="" />
      <ScreenOut>{info}</ScreenOut>
    </Container>
  );
}
