import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import Link from 'next/link';

import { css } from '@emotion/react';

import { ProductData } from '../../../shared/interfaces';
import NextImage from '../../../shared/components/NextImage';
import { useProductCollectionPolicy } from '../providers/ProductCollectionPolicyProvider';
import { useProductCollectionGroupAmplitudeEvents } from '../providers/ProductCollectionGroupAmplitudePropertyProvider';

interface Props extends ProductData {
  isFirst: boolean;
  isLast: boolean;
  isSingle: boolean;
  collectionCode: string;
}

const Wrapper = styled.article`
  position: relative;
  width: 120px;
  height: 156px;
`;

const radiusStyle = ({ isSingle, isLast, isFirst }: { isFirst: boolean; isLast: boolean; isSingle: boolean }) => css`
  ${isSingle
    ? `border-radius: ${vars.radius.$16};`
    : isFirst
    ? `border-radius: ${vars.radius.$16} 0 0 ${vars.radius.$16};`
    : isLast
    ? `border-radius: 0 ${vars.radius.$16} ${vars.radius.$16} 0;`
    : ''}
`;

const DimmedWrapper = styled.div<{ isFirst: boolean; isLast: boolean; isSingle: boolean }>`
  position: absolute;
  height: 96px;
  bottom: 0;
  right: 0;
  left: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.25) 100%);
  ${(options) => radiusStyle(options)}
`;

const ThumbnailImage = styled(NextImage)<{ isFirst: boolean; isLast: boolean; isSingle: boolean }>`
  background-color: ${vars.color.background.$background3};
  ${(options) => radiusStyle(options)}
`;

const ProductName = styled.h3`
  position: absolute;
  width: calc(100% - ${vars.spacing.$16});
  max-height: ${vars.lineHeight.$36};
  bottom: 0;
  font-size: inherit;
  margin: auto ${vars.spacing.$8} ${vars.spacing.$12} ${vars.spacing.$8};
  color: ${vars.color.text.$inverseUniversal};
  overflow-wrap: break-word;
  white-space: pre-wrap;
  text-overflow: clip;
  overflow: hidden;
`;

const GalleryViewProductCard = ({
  productVerticalMediumUrl,
  listImageUrl,
  name,
  no,
  isFirst,
  isLast,
  isSingle,
  collectionCode,
}: Props) => {
  const { mapProductName } = useProductCollectionPolicy();
  const { handleSelectCollection } = useProductCollectionGroupAmplitudeEvents();

  const handleClickCard = () => {
    handleSelectCollection({
      selectionType: 'content',
      contentId: no,
      collectionId: collectionCode,
    });
  };

  return (
    <Link href={`/goods/${no}`} passHref>
      <a href={`/goods/${no}`} onClick={handleClickCard}>
        <Wrapper>
          <ThumbnailImage
            src={productVerticalMediumUrl || listImageUrl}
            width={120}
            height={156}
            isFirst={isFirst}
            isLast={isLast}
            isSingle={isSingle}
            objectFit={'cover'}
          />
          <DimmedWrapper isFirst={isFirst} isLast={isLast} isSingle={isSingle}>
            <ProductName>
              <Typography variant={'$mediumSemibold'} as={'span'}>
                {mapProductName(name)}
              </Typography>
            </ProductName>
          </DimmedWrapper>
        </Wrapper>
      </a>
    </Link>
  );
};

export { GalleryViewProductCard };
