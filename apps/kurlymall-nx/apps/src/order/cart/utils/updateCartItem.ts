import { sum } from 'lodash';

import CartDetailResponse, {
  KurlyDeliveryListType,
  PartnerDeliveryType,
  PartnerType,
  StorageType,
  UnavailableOrdersType,
  UnavailableType,
} from '../interface/Cart';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';

type UpdaterType = <T extends StorageType | PartnerType | UnavailableType>(it: T) => T;

interface Params {
  previousCartDetail: CartDetailResponse;
  updater: UpdaterType;
}

const updateDelivery = (updater: UpdaterType) => {
  return function <T extends KurlyDeliveryListType | PartnerDeliveryType | UnavailableOrdersType>(value: T): T | null {
    if (value === null) {
      return value;
    }

    if ('storageTypes' in value) {
      const storageTypes = value.storageTypes
        .map((storageType) => updater<StorageType>(storageType))
        .filter((storageType) => isNotEmpty(storageType.products));

      const productCount = storageTypes.flatMap((storageType) => storageType.products ?? []).length;

      return productCount === 0
        ? null
        : {
            ...value,
            productCount,
            storageTypes,
          };
    }

    if ('partners' in value) {
      const partners = value.partners
        .map((partner) => updater<PartnerType>(partner))
        .filter((partner) => isNotEmpty(partner.products));

      const partnerCount = partners.length ?? 0;
      const productCount = partners.flatMap((partner) => partner.products ?? []).length;

      return productCount === 0
        ? null
        : {
            ...value,
            productCount,
            partnerCount,
            partners,
          };
    }

    if ('products' in value) {
      const unavailableOrders = updater<UnavailableType>(value);
      const productCount = unavailableOrders.products.length ?? 0;

      return productCount === 0
        ? null
        : {
            ...value,
            productCount,
            products: unavailableOrders.products,
          };
    }

    return value;
  };
};

export default function updateCartItem({ previousCartDetail, updater }: Params) {
  const updateDeliveryWithUpdater = updateDelivery(updater);

  const kurly = updateDeliveryWithUpdater<KurlyDeliveryListType>(previousCartDetail.kurlyDelivery);
  const domestic = updateDeliveryWithUpdater<PartnerDeliveryType>(previousCartDetail.partnerDomesticDelivery);
  const international = updateDeliveryWithUpdater<PartnerDeliveryType>(previousCartDetail.partnerInternationalDelivery);
  const unavailable = updateDeliveryWithUpdater<UnavailableOrdersType>(previousCartDetail.unavailableOrders);

  const totalCount =
    sum([kurly?.productCount, domestic?.productCount, international?.productCount, unavailable?.productCount]) ?? 0;

  return {
    ...previousCartDetail,
    totalCount,
    kurlyDelivery: kurly,
    partnerDomesticDelivery: domestic,
    partnerInternationalDelivery: international,
    unavailableOrders: unavailable,
  };
}
