import { css } from '@emotion/css';
import { ForwardedRef, forwardRef } from 'react';

import type { GoogleResultSectionViewModel, GoogleResultSectionItemViewModel } from '../../factory';
import ProductCard from '../../../../../product/list/m/components/ProductCard';
import { Section } from '../../shared/components/Section';
import { ImpressionSectionItem } from '../../shared/components/ImpressionSectionItem';
import { DeliveryInfoName } from '../../../../../product/types';
import { ProductSelectData } from '../../../../../shared/interfaces';
import { useLogger } from '../../../../contexts/LogSearchContext';
import COLOR from '../../../../../shared/constant/colorset';

const sectionTitleStyle = css`
  padding: 16px 10px 16px 16px;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
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

type OnClickProductCardFn = (product: GoogleResultSectionItemViewModel) => void;
type OnClickProductCardShortCutFn = (product: GoogleResultSectionItemViewModel, meta: ProductSelectData) => void;

type SectionItemProps = {
  data: GoogleResultSectionItemViewModel;
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
    isMultiplePrice,
    isBuyNow,
    isGiftable,
    reviewCount,
    canRestockNotify,
    groupProduct,
    _status,
    _stickers,
    _deliveryTypeNames,
  } = data;

  const handleClickProductCard = () => onClickProductCard(data);

  const handleClickProductShortcut = (selectShortcut: ProductSelectData) =>
    onClickProductShortCut(data, selectShortcut);

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
        stickers_v2={_stickers}
      />
    </li>
  );
};

const SectionItem = forwardRef(SectionItemImpl);

type Props = {
  section: GoogleResultSectionViewModel;
};

const GoogleResultSection = ({ section }: Props) => {
  const {
    _type,
    data: { sectionInfo, items },
  } = section;
  const { fusionQueryId, logSelectSectionItem, logSelectSectionItemShortCut } = useLogger();
  const handleClickProductCard: OnClickProductCardFn = (product) => logSelectSectionItem(section, product);

  const handleClickProductShortcut: OnClickProductCardShortCutFn = (product, meta) =>
    logSelectSectionItemShortCut(section, product, meta);

  return (
    <Section type={_type}>
      <h3 className={sectionTitleStyle}>{sectionInfo.title}</h3>
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
    </Section>
  );
};

export { GoogleResultSection };
