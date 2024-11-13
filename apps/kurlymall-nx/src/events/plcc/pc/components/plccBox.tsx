import styled from '@emotion/styled';

import NextImage from '../../../../shared/components/NextImage';
import { plccImageUrl } from '../../shared/constant';

interface Props {
  height: string;
  backgroundColor: string;
  src: string;
  alt: string;
}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
`;

export default function PlccBox({ height, backgroundColor, src, alt }: Props) {
  const imageUrl = `${plccImageUrl}${src}`;

  return (
    <Wrapper style={{ height: height, backgroundColor: backgroundColor }}>
      <NextImage src={imageUrl} alt={alt} layout="fill" objectFit="cover" loading="eager" />
    </Wrapper>
  );
}
