import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { memo } from 'react';

import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  position: relative;
  width: 64px;
  height: 83px;
  border-radius: ${vars.spacing.$8};
  overflow: hidden;
  flex-shrink: 0;
  margin-right: ${vars.spacing.$12};
`;

interface RecommendProductImageProps {
  imageUrl: string;
  productName: string;
}

const RecommendProductImage = ({ imageUrl, productName }: RecommendProductImageProps) => {
  return (
    <Wrapper>
      <NextImage src={imageUrl} alt={productName} layout="fill" objectFit="cover" />
    </Wrapper>
  );
};

export default memo(RecommendProductImage);
