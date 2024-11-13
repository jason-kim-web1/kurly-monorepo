import { useCallback } from 'react';

import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { FavoriteProductExtend } from '../../../../shared/interfaces';

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
  productExtend: FavoriteProductExtend;
  width?: number;
  height?: number;
  fontWeight?: number;
}

export default function ProductThumbnail({ productExtend, width = 90, height = 117, fontWeight = 600 }: Props) {
  const { productVerticalMediumUrl, isDealSoldOut, isDealComingSoon } = productExtend;

  const RenderImageThumbnail = useCallback(() => {
    const imageUrl = isEmpty(productVerticalMediumUrl) ? kurlyBlankImage : productVerticalMediumUrl;

    return (
      <>
        <ImageThumbnail width={width} height={height}>
          <NextImage src={imageUrl} layout="fill" objectFit="cover" alt="" />
        </ImageThumbnail>
        {isDealSoldOut && <DimmedFilter fontWeight={fontWeight}>Sold Out</DimmedFilter>}
        {isDealComingSoon && <DimmedFilter fontWeight={fontWeight}>coming soon</DimmedFilter>}
      </>
    );
  }, [isDealSoldOut, isDealComingSoon, fontWeight, height, productVerticalMediumUrl, width]);

  return <RenderImageThumbnail />;
}
