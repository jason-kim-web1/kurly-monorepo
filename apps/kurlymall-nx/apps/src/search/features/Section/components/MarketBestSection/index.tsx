import { css } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import type { MarketBestSectionViewModel, MarketBestSectionItemViewModel } from '../../factory';
import ProductCard from '../../../../../product/list/m/components/ProductCard';
import COLOR from '../../../../../shared/constant/colorset';
import { ImpressionSection } from '../../shared/components/ImpressionSection';
import { DeliveryInfoName } from '../../../../../product/types';
import { ImpressionSectionItem } from '../../shared/components/ImpressionSectionItem';
import { ProductShortCutMeta, useLogger } from '../../../../contexts/LogSearchContext';
import { ProductSelectData } from '../../../../../shared/interfaces';

const titleStyle = css`
  padding: 20px 16px 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR.kurlyGray800};
`;

const titleHighlightStyle = css`
  color: ${COLOR.loversPurple};
`;

const productListWrapStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 16px;
`;

const productListItemStyle = css`
  width: 50%;
  padding-right: 4px;
  &:nth-of-type(2n) {
    padding-right: 0;
    padding-left: 4px;
  }
`;

type OnClickProductCardFn = (product: MarketBestSectionItemViewModel) => void;
type OnClickProductCardShortCutFn = (product: MarketBestSectionItemViewModel, meta: ProductShortCutMeta) => void;

type SectionItemProps = {
  data: MarketBestSectionItemViewModel;
  fusionQueryId: string;
  onClickProductCard: OnClickProductCardFn;
  onClickProductShortCut: OnClickProductCardShortCutFn;
};

const SectionItemImpl = (
  { data, fusionQueryId, onClickProductCard, onClickProductShortCut }: SectionItemProps,
  ref: ForwardedRef<HTMLLIElement>,
) => {
  const {
    no,
    name,
    salesPrice,
    discountedPrice,
    discountRate,
    productVerticalMediumUrl,
    tags,
    // TODO: sticker
    isMultiplePrice,
    isBuyNow,
    isGiftable,
    reviewCount,
    canRestockNotify,
    groupProduct,
    _status,
    _deliveryTypeNames,
  } = data;

  const handleClickProductCard = () => onClickProductCard(data);

  const handleClickProductShortcut = (selectShortcut: ProductSelectData) => {
    const { type } = selectShortcut;
    if (!type) {
      return;
    }
    onClickProductShortCut(data, {
      type,
    });
  };

  return (
    <li ref={ref} className={productListItemStyle}>
      <ProductCard
        name={name}
        productNo={no}
        price={salesPrice}
        discount={{
          price: discountedPrice || null,
          rate: discountRate,
        }}
        imageUrl={productVerticalMediumUrl}
        tags={tags}
        // TOFIX: 문자열 원시타입으로 변경?
        deliveryTypeNames={_deliveryTypeNames as DeliveryInfoName[]}
        status={_status}
        isGroupProduct={groupProduct.isGroup}
        canRestockNotify={canRestockNotify}
        isMultiplePrice={isMultiplePrice}
        isBuyNow={isBuyNow}
        queryId={fusionQueryId}
        handleLinkClick={handleClickProductCard}
        selectProduct={handleClickProductShortcut}
        isGiftable={isGiftable}
        reviewCount={reviewCount}
        // TOFIX: Market Best 스티커 노출 여부 확인
        stickers_v2={[]}
      />
    </li>
  );
};

const SectionItem = forwardRef(SectionItemImpl);

type Props = {
  section: MarketBestSectionViewModel;
};

const MarketBestSection = ({ section }: Props) => {
  const { data } = section;
  const { items } = data;
  const { fusionQueryId, logSelectSectionItem, logSelectSectionItemShortCut } = useLogger();

  const handleClickProductCard: OnClickProductCardFn = (product) => logSelectSectionItem(section, product);

  const handleClickProductShortcut: OnClickProductCardShortCutFn = (product, meta) =>
    logSelectSectionItemShortCut(section, product, meta);

  return (
    <ImpressionSection section={section}>
      <h2 className={titleStyle}>
        <span className={titleHighlightStyle}>컬리 베스트 상품</span>은 어때요?
      </h2>
      <ul className={productListWrapStyle}>
        {items.map((item) => {
          const { _id } = item;
          return (
            <ImpressionSectionItem key={_id} section={section} item={item}>
              <SectionItem
                data={item}
                fusionQueryId={fusionQueryId}
                onClickProductCard={handleClickProductCard}
                onClickProductShortCut={handleClickProductShortcut}
              />
            </ImpressionSectionItem>
          );
        })}
      </ul>
    </ImpressionSection>
  );
};

export { MarketBestSection };
