import { get, head } from 'lodash';

import { ProductData } from '../../../interfaces/Product';
import { ProductAvailableSort, ProductListPagination } from '../../../../product/list/types';

import { AmplitudeEvent } from '../../AmplitudeEvent';
import { getPackageInfo } from '../product/getPackageInfo';

import { isPC } from '../../../../../util/window/getDevice';
import { getStickerText } from '../getStickerText';

interface Payload {
  index: number;
  sort: {
    item: ProductAvailableSort[];
    selectedType: string;
    selectedName: string;
    defaultSort: string;
  };
  perPage: number;
  section: string;
  paramCode: string;
  pagination: Pick<ProductListPagination, 'currentPage' | 'totalProductsCount'>;
  product: Pick<
    ProductData,
    | 'no'
    | 'name'
    | 'discount'
    | 'salesPrice'
    | 'status'
    | 'isGiftable'
    | 'deliveryTypeNames'
    | 'stickers_v2'
    | 'reviewCount'
  >;
  isSorting: boolean;
  isGroupProduct: boolean;
  queryId?: string;
  position?: number;
}

export class SelectListProduct extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_product', payload);
  }

  getPayload() {
    const {
      index,
      position,
      sort,
      perPage,
      section,
      paramCode,
      pagination,
      product,
      isSorting,
      isGroupProduct,
      queryId,
    } = this.payload;
    const { currentPage, totalProductsCount } = pagination;
    const { item, selectedName, defaultSort } = sort;
    const { no, name, discount, salesPrice, status, isGiftable, stickers_v2, deliveryTypeNames, reviewCount } = product;
    const { packageId, packageName } = getPackageInfo({
      isGroupProduct,
      no,
      name,
    });

    const defaultSortType = item.find((it) => it.type === defaultSort)?.name || null;

    const stickerName = getStickerText(stickers_v2) || null;

    const positionNumber = isPC ? (currentPage - 1) * perPage + index + 1 : index + 1;

    return {
      content_id: no,
      content_name: name,
      content_type: null, // 콘텐츠의 유형에 대한 정보 : 해당 정보값 api 에 없음
      delivery_type: deliveryTypeNames.join() || null,
      sales_price: salesPrice,
      price: discount?.price || salesPrice,
      is_sorting: isSorting,
      is_soldout: status.code === 'SOLD_OUT',
      is_gift_purchase: isGiftable,
      position: position || positionNumber,
      package_id: packageId,
      package_name: packageName,
      // optional
      sticker: stickerName,
      default_sort_type: defaultSortType,
      selection_sort_type: selectedName,
      server_sort_type: get(head(item), 'name') || null,
      content_count: section === 'search' ? totalProductsCount : null, // search
      keyword: section === 'search' ? paramCode : null, // search
      ...(reviewCount && { review_count: reviewCount }),
      ...(queryId && section === 'search' && { fusion_query_id: queryId }),
    };
  }
}
