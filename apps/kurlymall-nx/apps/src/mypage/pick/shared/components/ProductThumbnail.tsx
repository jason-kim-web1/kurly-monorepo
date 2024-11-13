import { useCallback } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { PickProductExtend } from '../../../../shared/api';
import { kurlyBlankImage } from '../../../../shared/images';
import NextImage from '../../../../shared/components/NextImage';

const ImageThumbnail = styled.span<{ width: number; height: number }>`
  position: absolute;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;

  img {
    border-radius: 4px;
  }
`;

const BlurredFilter = styled.span`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
`;

const DimmedFilter = styled.span<{ fontWeight: number }>`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: ${({ fontWeight }) => fontWeight};
  line-height: 1;
  text-transform: capitalize;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
  color: ${COLOR.kurlyWhite};
  border-radius: 4px;
`;

interface Props {
  product: PickProductExtend;
  width?: number;
  height?: number;
  fontWeight?: number;
}

export default function ProductThumbnail({ product, width = 90, height = 117, fontWeight = 600 }: Props) {
  const { productVerticalSmallUrl, listImageUrl, soldOutTitle, isUnavailable, isSoldOut } = product;

  const RenderImageThumbnail = useCallback(() => {
    const imageUrl = productVerticalSmallUrl || listImageUrl || kurlyBlankImage;

    if (isUnavailable) {
      return (
        <>
          <ImageThumbnail width={width} height={height}>
            <NextImage src={imageUrl} layout="fill" objectFit="cover" alt="" />
          </ImageThumbnail>
          <BlurredFilter />
        </>
      );
    }

    if (isSoldOut) {
      return (
        <>
          <ImageThumbnail width={width} height={height}>
            <NextImage src={imageUrl} layout="fill" objectFit="cover" alt="" />
          </ImageThumbnail>
          <DimmedFilter fontWeight={fontWeight}>{soldOutTitle}</DimmedFilter>
        </>
      );
    }

    return (
      <ImageThumbnail width={width} height={height}>
        <NextImage src={imageUrl} layout="fill" objectFit="cover" alt="" />
      </ImageThumbnail>
    );
  }, [productVerticalSmallUrl, listImageUrl, isUnavailable, isSoldOut, width, height, fontWeight, soldOutTitle]);

  return <RenderImageThumbnail />;
}
