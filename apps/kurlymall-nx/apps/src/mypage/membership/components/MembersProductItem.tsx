import { Typography } from '@thefarmersfront/kpds-react';

import styled from '@emotion/styled';

import { vars } from '@thefarmersfront/kpds-css';

import { useDispatch } from 'react-redux';

import { addComma } from '../../../shared/services';
import NextImage from '../../../shared/components/NextImage';
import { isWebview } from '../../../../util/window/getDevice';
import { PRODUCT_PATH } from '../../../shared/constant';
import { multiMaxLineText } from '../../../shared/utils';
import deepLinkUrl from '../../../shared/constant/deepLink';
import { logEventMembershipCollection } from '../shared/utils';
import { redirectTo } from '../../../shared/reducers/page';

const ProductItem = styled.div`
  gap: 4px;
  min-width: 128px;
  width: 128px;
`;

const ProductButton = styled.button`
  display: flex;
  flex-direction: column;
  text-align: left;
  width: 112px;
`;

const ThumbnailImage = styled(NextImage)`
  border-radius: ${vars.radius.$6};
  background-color: ${vars.color.background.$background3};
`;

const ProductName = styled.div`
  margin: 6px 0 4px;
  ${multiMaxLineText(2)}
`;

const ProductPrices = styled.div`
  display: flex;
  gap: 2px;
  font-weight: 700;
  line-height: 20px;
  white-space: nowrap;

  .discount-value {
    color: ${vars.color.main.$tertiary};
  }
`;

interface Props {
  name: string;
  no: number;
  discount: {
    rate: number;
    price: number | null;
  };
  listImageUrl: string;
  productVerticalMediumUrl: string;
  salesPrice: number;
  isMultiplePrice: boolean;
}

export default function MembersProductItem({
  name,
  no,
  discount,
  salesPrice,
  listImageUrl,
  productVerticalMediumUrl,
  isMultiplePrice,
}: Props) {
  const dispatch = useDispatch();

  const handleClickItem = () => {
    logEventMembershipCollection({ selectionType: 'item' });

    if (isWebview()) {
      location.href = `${deepLinkUrl.PRODUCT}${no}`;
      return;
    }

    dispatch(redirectTo({ url: `${PRODUCT_PATH.detail.uri}/${no}` }));
  };

  return (
    <ProductItem>
      <ProductButton onClick={handleClickItem}>
        <ThumbnailImage src={productVerticalMediumUrl || listImageUrl} width={112} height={112} objectFit="cover" />
        <ProductName>
          <Typography variant={'$mediumRegular'} as={'span'}>
            {name}
          </Typography>
        </ProductName>
        <ProductPrices>
          {discount.rate > 0 ? <div className="discount-value">{discount.rate}%</div> : null}
          <div className="price-value">
            {addComma(discount.price || salesPrice)}원{isMultiplePrice ? '~' : null}
          </div>
        </ProductPrices>
      </ProductButton>
    </ProductItem>
  );
}
