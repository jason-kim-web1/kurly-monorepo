import { MdChoicesOption } from '../../../../main/interfaces/MainSection.interface';
import { getPayLoadData } from './getPayLoadData';
import { getPackageInfo } from '../product/getPackageInfo';
import { isPC } from '../../../../../util/window/getDevice';
import { getStickerText } from '../getStickerText';

interface Props {
  sectionType: string;
  eventName: string;
  payload: any;
  target?: string | number;
  position?: number;
  selectedOption?: MdChoicesOption;
}

// 아래 이벤트는 src/main/components/shared/MainSectionFactory.tsx 해당 파일 참조
const PRODUCT_EVENT_NAME = [
  'TODAY_RECOMMEND_PRODUCTS',
  'RANDOM_COLLECTION',
  'SPECIAL_DEALS',
  'MD_CHOICES',
  'CLOSING_SALE',
  'RANDOM_COLLECTION_ARTICLE',
  'GROUP_COLLECTION_CIRCLE',
  'MAIN_BANNER_CAROUSEL',
  'MAIN_BANNER_CAROUSEL_HORIZONTAL',
  'MAB_COLLECTION',
];

const REVIEW_COUNT_EVENT = [
  'TODAY_RECOMMEND_PRODUCTS',
  'RANDOM_COLLECTION',
  'SPECIAL_DEALS',
  'MD_CHOICES',
  'CLOSING_SALE',
  'MAB_COLLECTION',
];

export function getProductData({ sectionType, eventName, payload, target, position, selectedOption }: Props) {
  const isProduct = PRODUCT_EVENT_NAME.some((it) => it === eventName);

  const payloadPosition = position ? position : 0;
  const sectionTypeList = ['content', 'cart', 'purchase', 'restock_notification', 'detail'];

  if (sectionTypeList.includes(sectionType) && target && isProduct) {
    const productSpecialDeals = eventName === 'SPECIAL_DEALS' ? payload.deals[payloadPosition].product : null;

    const productMdChoices =
      eventName === 'MD_CHOICES'
        ? getPayLoadData({
            payload: selectedOption,
            compare: target,
            compareKey: 'no',
            key: 'products',
          })
        : null;

    const productException = productSpecialDeals || productMdChoices;

    const product = productException
      ? productException
      : getPayLoadData({
          payload,
          compare: target,
          compareKey: 'no',
          key: 'products',
        }) || null;

    if (!product) {
      return null;
    }

    const { no, name, groupProduct, isGiftable, salesPrice, discount, stickers_v2, reviewCount } = product;
    const { isGroup: isGroupProduct } = groupProduct;

    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    const stickerName = getStickerText(stickers_v2) || null;

    const reviewCountText = REVIEW_COUNT_EVENT.includes(eventName) ? reviewCount : null;
    const review = eventName === 'MD_CHOICES' && !isPC ? null : reviewCountText;

    return {
      content_id: no,
      content_name: name,
      sales_price: salesPrice || null,
      price: discount?.price || salesPrice || null,
      is_gift_purchase: isGiftable || false,
      package_id: packageId,
      package_name: packageName,
      sticker: stickerName,
      ...(review && { review_count: review }),
    };
  }

  return null;
}
