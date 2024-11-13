import styled from '@emotion/styled';

import { KURLY_PAY_IMAGE_M_URL, KURLY_PAY_IMAGE_PC_URL } from '../constants';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div<{ imageHeight: string }>`
  position: relative;
  width: 100%;
  height: ${({ imageHeight }) => (imageHeight ? imageHeight : 0)};
`;

interface ImageProps {
  imageName: string;
  imageHeight: string;
  altText: string;
  isPC?: boolean;
}

export default function EventImage({ imageName, imageHeight, altText, isPC }: ImageProps) {
  return (
    <Wrapper imageHeight={imageHeight}>
      <NextImage
        src={`${isPC ? KURLY_PAY_IMAGE_PC_URL : KURLY_PAY_IMAGE_M_URL}${imageName}.jpg`}
        layout="fill"
        objectFit="cover"
        unoptimized
        alt={altText}
      />
    </Wrapper>
  );
}
