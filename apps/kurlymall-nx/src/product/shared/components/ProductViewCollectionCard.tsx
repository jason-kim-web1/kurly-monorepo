import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { Typography } from '@thefarmersfront/kpds-react';

import Link from 'next/link';

import { ProductData } from '../../../shared/interfaces';
import NextImage from '../../../shared/components/NextImage';
import { multiMaxLineText } from '../../../shared/utils';
import { addComma } from '../../../shared/services';
import { useProductCollectionPolicy } from '../providers/ProductCollectionPolicyProvider';
import { useProductCollectionGroupAmplitudeEvents } from '../providers/ProductCollectionGroupAmplitudePropertyProvider';

interface Props extends ProductData {
  collectionCode: string;
}

const Wrapper = styled.article`
  width: 120px;
`;

const ThumbnailImage = styled(NextImage)`
  border-radius: ${vars.radius.$10};
  background-color: ${vars.color.background.$background3};
`;

const ProductName = styled.h3`
  margin: ${vars.spacing.$4} 0 0 0;
  font-size: inherit;
  ${multiMaxLineText(2)}
`;

const DiscountValue = styled(Typography)`
  color: ${vars.color.main.$tertiary};
`;

const PriceValue = styled.strong`
  color: ${vars.color.text.$primary};
  font-size: ${vars.fontSize.$14};
  font-style: normal;
  font-weight: 700;
  line-height: ${vars.fontSize.$20};
`;

const ProductPrices = styled.div`
  display: flex;
  gap: ${vars.spacing.$4};
  margin-top: ${vars.spacing.$4};

  ${DiscountValue} {
    flex: 0 0 auto;
  }
`;

const ProductViewCollectionCard = ({
  productVerticalMediumUrl,
  listImageUrl,
  name,
  discount,
  salesPrice,
  isMultiplePrice,
  no,
  collectionCode,
}: Props) => {
  const { mapProductName } = useProductCollectionPolicy();
  const isDiscounted = discount.rate > 0;

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
          <ThumbnailImage src={productVerticalMediumUrl || listImageUrl} width={120} height={120} objectFit={'cover'} />
          <ProductName>
            <Typography variant={'$largeRegular'} as={'span'}>
              {mapProductName(name)}
            </Typography>
          </ProductName>
          <ProductPrices>
            {isDiscounted ? (
              <DiscountValue variant={'$largeBold'} as={'span'}>
                {discount.rate}%
              </DiscountValue>
            ) : null}
            <PriceValue>
              {addComma(discount.price || salesPrice)}원{isMultiplePrice ? '~' : null}
            </PriceValue>
          </ProductPrices>
        </Wrapper>
      </a>
    </Link>
  );
};

export { ProductViewCollectionCard };
