import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../../../shared/constant/colorset';
import { StorageType } from '../../../../../../shared/enums';
import { buildProductStorageText } from '../../../../shared/utils/productStorageUtil';
import { buildFormattedDateInString } from '../../../../shared/utils/productDetailState';

import ProductInfoItem from './ProductInfoItem';
import AdultInformation from './AdultInformation';
import type { ProductInfoDictionaryItem } from '../../../../types';

const ProductInfoListWrapper = styled.div`
  padding: 0 16px 24px;
`;

const ProductInfoListTitle = styled.h3`
  padding: 24px 0 6px;
  font-weight: bold;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  line-height: 21px;
`;

interface Props {
  isDelivery: boolean;
  salesUnit: string | null;
  volume: string | null;
  todayBrix: string | null;
  productOrigin: string | null;
  storageTypes: StorageType[];
  allergy: string | null;
  expirationDate: string | null;
  soldOutText: string | null;
  extraInfos: ProductInfoDictionaryItem[];
  guide: string;
  notSalesText: string;
  afterSaleServiceInfo: string;
  isOnlyAdult: boolean;
}

export default function ProductInfoList({
  isDelivery,
  salesUnit,
  volume,
  todayBrix,
  productOrigin,
  storageTypes,
  allergy,
  expirationDate,
  soldOutText,
  notSalesText,
  extraInfos,
  guide,
  afterSaleServiceInfo,
  isOnlyAdult,
}: Props) {
  return (
    <ProductInfoListWrapper>
      <ProductInfoListTitle>상품정보</ProductInfoListTitle>
      {isDelivery && !isEmpty(storageTypes) ? (
        <ProductInfoItem
          title="포장타입"
          value={`${buildProductStorageText(storageTypes)} (종이포장)`}
          subText="택배배송은 에코 포장이 스티로폼으로 대체됩니다."
        />
      ) : null}
      {salesUnit ? <ProductInfoItem title="판매단위" value={salesUnit} /> : null}
      {volume ? <ProductInfoItem title="중량/용량" value={volume} /> : null}
      {productOrigin ? <ProductInfoItem title="원산지" value={productOrigin} isBold /> : null}
      {allergy ? <ProductInfoItem title="알레르기정보" value={allergy} /> : null}
      {expirationDate ? <ProductInfoItem title="소비기한(또는 유통기한)정보" value={expirationDate} /> : null}
      {todayBrix ? <ProductInfoItem title="당도" value={todayBrix} /> : null}
      {!isEmpty(extraInfos)
        ? extraInfos.map(({ title, description }, index) => (
            <ProductInfoItem key={`extra-info-${index}`} title={title} value={description} />
          ))
        : null}
      {guide ? <ProductInfoItem title="안내사항" value={guide} /> : null}
      {notSalesText ? <ProductInfoItem title="판매상태" value={buildFormattedDateInString(notSalesText)} /> : null}
      {soldOutText ? <ProductInfoItem title="입고안내" value={buildFormattedDateInString(soldOutText)} /> : null}
      {afterSaleServiceInfo ? <ProductInfoItem title="A/S 안내" value={afterSaleServiceInfo} /> : null}
      {isOnlyAdult ? <AdultInformation /> : null}
    </ProductInfoListWrapper>
  );
}
