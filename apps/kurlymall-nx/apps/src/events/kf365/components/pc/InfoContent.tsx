import styled from '@emotion/styled';

import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import NextImage from '../../../../shared/components/NextImage';

const Container = styled.div<{ bgImage: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 1050px;
  background-color: #e8e7ec;

  @media (max-width: 1050px) {
    overflow: hidden;
  }
`;

const Inner = styled.div`
  min-width: 1900px;
`;

interface Props {
  info: string;
  bgImage: string;
}

export default function InfoContent({ info, bgImage }: Props) {
  return (
    <Container bgImage={bgImage}>
      <Inner>
        <NextImage src={bgImage} width={1900} height={874} objectPosition="center" alt="" />
        <ScreenOut>{info}</ScreenOut>
      </Inner>
    </Container>
  );
}
