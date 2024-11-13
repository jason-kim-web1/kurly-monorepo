import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { buildFormattedDateInString } from '../../../shared/utils/productDetailState';
import { buildProductStorageText } from '../../../shared/utils/productStorageUtil';

import type { ProductInfoDictionaryItem, ProductInfoItemTitleType } from '../../../types';
import type { StorageType } from '../../../../../shared/enums';

import ProductInfoItemWrapper from './ProductInfoItemWrapper';
import COLOR from '../../../../../shared/constant/colorset';

const ProductInformationListWrapper = styled.ul`
  margin-top: 20px;
`;

const ProductInfoItemValue = styled.p`
  color: ${COLOR.kurlyGray800};
  font-weight: 400;
  line-height: 19px;
  white-space: pre-line;
  word-break: break-all;
  overflow: hidden;
`;

const ProductInfoSubItemValue = styled.p`
  display: block;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  padding-top: 4px;
  line-height: 16px;
  white-space: pre-line;
`;

interface ProductInfoItemProps {
  title: ProductInfoItemTitleType | string;
  value: string;
  subValue?: string;
}

const ProductInfoItem = ({ title, value, subValue = '' }: ProductInfoItemProps) => {
  return (
    <ProductInfoItemWrapper title={title}>
      <ProductInfoItemValue>{value}</ProductInfoItemValue>
      {!isEmpty(subValue) ? <ProductInfoSubItemValue>{subValue}</ProductInfoSubItemValue> : null}
    </ProductInfoItemWrapper>
  );
};

interface Props {
  deliveryName: string;
  deliveryGuide: string;
  isDelivery: boolean;
  salesUnit: string | null;
  volume: string | null;
  todayBrix: string | null;
  sellerName: string;
  storageTypes: StorageType[];
  allergy: string | null;
  expirationDate: string | null;
  soldOutText: string;
  extraInfos: ProductInfoDictionaryItem[];
  guide: string;
  notSalesText: string;
  afterSaleServiceInfo: string;
}

export default function ProductInfoList({
  deliveryName,
  deliveryGuide,
  isDelivery,
  salesUnit,
  volume,
  todayBrix,
  sellerName,
  storageTypes,
  allergy,
  expirationDate,
  soldOutText,
  extraInfos,
  guide,
  notSalesText,
  afterSaleServiceInfo,
}: Props) {
  return (
    <ProductInformationListWrapper>
      {deliveryName ? <ProductInfoItem title="배송" value={deliveryName} subValue={deliveryGuide} /> : null}
      {sellerName ? <ProductInfoItem title="판매자" value={sellerName} /> : null}
      {isDelivery && !isEmpty(storageTypes) ? (
        <ProductInfoItem
          title="포장타입"
          value={`${buildProductStorageText(storageTypes)} (종이포장)`}
          subValue="택배배송은 에코 포장이 스티로폼으로 대체됩니다."
        />
      ) : null}
      {salesUnit ? <ProductInfoItem title="판매단위" value={salesUnit} /> : null}
      {volume ? <ProductInfoItem title="중량/용량" value={volume} /> : null}
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
    </ProductInformationListWrapper>
  );
}
