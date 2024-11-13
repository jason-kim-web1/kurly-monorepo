import styled from '@emotion/styled';

import { getPartnersImagesByDevice } from '../../service/product.service';

import type { PartnersContent, PartnersContentBlockType } from '../types';
import NextImage from '../../../shared/components/NextImage';

const Container = styled.div<{ isPC: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${({ isPC }) => (isPC ? '1010px' : '710px')};
  padding: 0 10px;
  margin: 0 auto;
`;

const ImageWrapper = styled.div`
  width: 100%;
  & > span {
    position: unset !important;
    & .autoImage {
      object-fit: contain !important;
      position: relative !important;
      height: auto !important;
    }
  }
`;

interface Props {
  partnersContent: PartnersContent;
  blockType: PartnersContentBlockType;
  isPC?: boolean;
}

export default function PartnersContents({ partnersContent, blockType, isPC = true }: Props) {
  const partnersImages = getPartnersImagesByDevice(partnersContent, blockType, isPC);

  return (
    <Container isPC={isPC}>
      {partnersImages.map((image, index) => (
        <ImageWrapper key={`partners-${blockType}-image-${index}`}>
          <NextImage
            className="autoImage"
            src={image}
            layout="fill"
            alt={`컬리 파트너스 ${blockType} 이미지`}
            disableImageDrag
          />
        </ImageWrapper>
      ))}
    </Container>
  );
}
