import styled from '@emotion/styled';
import { vars } from '@thefarmersfront/kpds-css';

import TagList from './TagList';
import { CartProduct } from '../../interface/CartProduct';
import ItemStickers from './ItemStickers';
import ItemImage from './ItemImage';
import ItemPrice from './ItemPrice';
import ItemTitle from './ItemTitle';
import ExpiredDateNotice from './ExpiredDateNotice';
import { THUMBNAIL_HEIGHT } from '../../constants/Thumbnail';
import Stepper from '../../../../shared/components/KPDS/Stepper/Stepper';
import { CartDeliveryGroup } from '../../constants/CartDeliveryGroup';
import Tags from './Tags';
import StorageTag from './StorageTag';
import useItemContents from '../../hooks/useItemContents';

const Wrapper = styled.div`
  padding: ${vars.spacing.$4} ${vars.spacing.$0} ${vars.spacing.$16} 34px;
`;

const ItemDetailWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: ${vars.spacing.$12};
`;

const ItemDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: ${THUMBNAIL_HEIGHT}px;
`;

interface Props {
  type: CartDeliveryGroup;
  product: CartProduct;
  onChange: (changedQuantity: number) => void;
}

export default function ItemContents({ type, product, onChange }: Props) {
  const { detailUrl, subTitle, isShowStorageTag } = useItemContents({ type, product });
  const {
    membershipLabels,
    dealProductName,
    tagNames,
    storageType,
    productVerticalSmallUrl,
    productPrice,
    retailPrice,
    discountPrice,
    isNotEnoughStock,
    voucher,
    quantity,
    salesUnit,
    minQuantity,
  } = product;

  return (
    <Wrapper>
      <ItemStickers stickers={membershipLabels} />
      <ExpiredDateNotice expiredDate={voucher?.endDateText} />
      <ItemTitle title={dealProductName} subTitle={subTitle} detailUrl={detailUrl} />
      <TagList>
        {isShowStorageTag && <StorageTag storageType={storageType} />}
        <Tags tagNames={tagNames} />
      </TagList>
      <ItemDetailWrapper>
        <ItemImage imageUrl={productVerticalSmallUrl} detailUrl={detailUrl} />
        <ItemDetail>
          <ItemPrice
            productPrice={productPrice}
            retailPrice={retailPrice}
            discountPrice={discountPrice}
            quantity={quantity}
            isNotEnoughStock={isNotEnoughStock}
          />
          <Stepper
            quantity={quantity}
            unit={salesUnit}
            onChangeQuantity={onChange}
            minusDisabled={quantity <= minQuantity}
          />
        </ItemDetail>
      </ItemDetailWrapper>
    </Wrapper>
  );
}
