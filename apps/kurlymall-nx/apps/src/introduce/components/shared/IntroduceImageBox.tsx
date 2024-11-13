import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import NextImage from '../../../shared/components/NextImage';

const Container = styled.div<{ height?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: ${({ height }) => (height ? height : 90)}px;
`;

const Text = styled.strong<{ fontSize?: number }>`
  position: relative;
  z-index: 1;
  display: block;
  font-weight: 300;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 16)}px;
  line-height: 1.5;
  color: ${COLOR.kurlyWhite};
  text-align: center;
`;

interface Props {
  imageUrl: string;
  height?: number;
  fontSize?: number;
  text?: string;
  subText?: string;
}

export default function IntroduceImageBox({ imageUrl, height, fontSize, text, subText }: Props) {
  return (
    <Container height={height}>
      <NextImage src={imageUrl} layout="fill" objectFit="cover" alt={''} />
      {text && (
        <Text fontSize={fontSize}>
          {text}
          <br />
          {subText && subText}
        </Text>
      )}
    </Container>
  );
}
