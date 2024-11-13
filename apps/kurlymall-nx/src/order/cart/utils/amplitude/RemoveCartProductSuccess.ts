import { head } from 'lodash';

import { amplitudeService } from '../../../../shared/amplitude';

import { AmplitudeEvent } from '../../../../shared/amplitude/AmplitudeEvent';
import { DeleteType } from '../../constants/SelectionType';
import { CartProduct } from '../../interface/CartProduct';
import { CurrentAddress } from '../../interface/CurrentAddressResponse';
import { calculateProductPrices } from '../calculateProductPrices';
import { CART_DELIVERY_TYPE } from '../../constants/CartDeliveryType';
import { DELIVERY_TYPE, DeliveryType } from '../../constants/Address';
import { CART_SOLD_OUT } from '../../constants/CartSoldOutType';

interface Payload {
  // 컨텐츠의 번호 (CMS 기준의 컨텐츠 ID) (*optional : 컨텐츠 번호 정보가 없을 경우 Null)
  contentId: number | null;
  // 컨텐츠의 이름 (CMS 기준의 컨텐츠 이름) (*optional : 컨텐츠 이름 정보가 없을 경우 Null)
  contentName: string | null;
  // 딜의 번호 (CMS 기준의 딜 ID) (*일반 (단일) 상품의 경우 package_id와 동일하게 적용)
  dealId: number | null;
  // 딜의 이름 (CMS 기준의 딜 이름) (*일반 (단일) 상품의 경우 package_id와 동일하게 적용)
  dealName: string | null;
  // deal의 원물 관리용 번호 (deal_id가 있는 이벤트에 항상 같이 존재해야함)
  masterId: string | null;
  // deal의 원물 관리용 이름 (deal_name이 있는 이벤트에 항상 같이 존재해야함)
  masterName: string | null;
  // 장바구니/주문서 화면의 배송 유형 정보 (기본 배송 | 하루배송)
  deliveryType: string | null;
  // 권장소비자가 (*optional : 권장소비자가 정보 없는 경우 Null)
  retailPrice: number | null;
  // 컬리판매가
  basePrice: number;
  // 현재가 (*optional : 할인가 정보 없는 경우 컬리판매가로 대체 적용됨)
  // case1. 상품 선택 단 : 유저에게 보이는 현재가
  // case2. 장바구니, 주문서 단 : 유저가 구매하는 최종 현재가
  price: number;
  // 패키지 품절 여부(true, false)
  isSoldout: boolean;
  // 상품 온도 유형 (Room, Cold, Frozen)
  packingType: 'Room' | 'Cold' | 'Frozen';
  // 1) 상품개편 배포 이전에 등록된 상품 : 패키지 번호 (*optional : 패키지 번호 정보가 없을 경우 null)
  // 2) 상품개편 배포 이후에 등록된 상품 : 값 발생하지 않음
  packageId: number | null;
  // 1) 상품개편 배포 이전에 등록된 상품 : 패키지 이름 (*optional : 패키지 번호 정보가 없을 경우 null)
  // 2) 상품개편 배포 이후에 등록된 상품 : 값 발생하지 않음
  packageName: string | null;
  // 수량
  quantity: number;
  // 장바구니 삭제 버튼 유형 (선택삭제, 상품별 'X' 버튼, 품절상품삭제버튼) 중 선택된 type 값
  selectionType: DeleteType;
}

/**
 * 장바구니에 담긴 상품 삭제
 * 1) 선택 삭제 버튼 (ALL)
 * 2) 상품별 - 버튼 (ALL)
 * 3) 품절 상품 삭제 버튼 (PC만)
 * @extends AmplitudeEvent
 */
export class RemoveCartProductSuccess extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('remove_cart_product_success', payload);
  }

  getPayload() {
    return {
      content_id: this.payload.contentId,
      content_name: this.payload.contentName,
      deal_id: this.payload.dealId,
      deal_name: this.payload.dealName,
      master_id: this.payload.masterId,
      master_name: this.payload.masterName,
      delivery_type: this.payload.deliveryType,
      retail_price: this.payload.retailPrice,
      base_price: this.payload.basePrice,
      price: this.payload.price,
      is_soldout: this.payload.isSoldout,
      packing_type: this.payload.packingType,
      package_id: this.payload.packageId,
      package_name: this.payload.packageName,
      quantity: this.payload.quantity,
      selection_type: this.payload.selectionType,
    };
  }
}

interface LogEventRemoveCartProductSuccessProps {
  products: CartProduct[];
  dealProductNos: number[];
  selectionType: DeleteType;
  currentAddress?: CurrentAddress;
}

const REMOVE_CART_DELIVERY_TYPE = {
  DIRECT: '샛별배송',
  INDIRECT: '하루배송',
  NORMAL_PARCEL: '판매자배송',
  INTERNATIONAL_DIRECT: '해외직배송',
} as const;

type RemoveCartDeliveryType = typeof REMOVE_CART_DELIVERY_TYPE[keyof typeof REMOVE_CART_DELIVERY_TYPE];

const getDeliveryType = ({
  productDeliveryType,
  currentAddressDeliveryType,
}: {
  productDeliveryType?: string;
  currentAddressDeliveryType?: DeliveryType;
}): RemoveCartDeliveryType | null => {
  //3p 경우 배송타입이 1개지만 1p의 경우 상품에 따라 복수개의 배송타입이 내려오므로, 1p는 배송지 기준으로 검증합니다.

  if (productDeliveryType === CART_DELIVERY_TYPE.NORMAL_PARCEL) {
    return REMOVE_CART_DELIVERY_TYPE.NORMAL_PARCEL;
  }

  if (productDeliveryType === CART_DELIVERY_TYPE.INTERNATIONAL_DIRECT) {
    return REMOVE_CART_DELIVERY_TYPE.INTERNATIONAL_DIRECT;
  }

  switch (currentAddressDeliveryType) {
    case DELIVERY_TYPE.DIRECT:
      return REMOVE_CART_DELIVERY_TYPE.DIRECT;

    case DELIVERY_TYPE.INDIRECT:
      return REMOVE_CART_DELIVERY_TYPE.INDIRECT;

    default:
      return null;
  }
};
export const logEventRemoveCartProductSuccess = ({
  products,
  dealProductNos,
  selectionType,
  currentAddress,
}: LogEventRemoveCartProductSuccessProps) => {
  const currentAddressDeliveryType = currentAddress?.deliveryType;

  products
    .filter((data) => dealProductNos.includes(data.dealProductNo))
    .forEach((cartItem) => {
      const productDeliveryType = head(cartItem.deliveryTypeInfos)?.deliveryType;
      const deliveryType = getDeliveryType({
        productDeliveryType,
        currentAddressDeliveryType,
      });

      // 상품개편 이전에 등록 된 상품은 1,000,000,000 (10억) 보다 작거나 같습니다. 이를 확인합니다.
      const isPackage = cartItem.contentsProductNo <= 1000000000;

      amplitudeService.logEvent(
        new RemoveCartProductSuccess({
          contentId: cartItem.contentsProductNo || null,
          contentName: cartItem.contentsProductName || null,
          dealId: cartItem.dealProductNo || null,
          dealName: cartItem.dealProductName || null,
          masterId: cartItem.masterProductCode || null,
          masterName: cartItem.masterProductName || null,
          deliveryType,
          retailPrice: cartItem.retailPrice || null,
          basePrice: cartItem.productPrice ?? null,
          price: calculateProductPrices({
            productPrice: cartItem.productPrice,
            retailPrice: cartItem.retailPrice,
            discountPrice: cartItem.discountPrice,
          }).price,
          isSoldout: cartItem.soldOutType === CART_SOLD_OUT.SOLD_OUT,
          packingType: cartItem.storageType === 'COLD' ? 'Cold' : cartItem.storageType === 'FROZEN' ? 'Frozen' : 'Room',
          // 상품개편 이전의 등록 된 상품의 id는 content_number - 5,000,000 입니다.
          packageId: isPackage ? cartItem.contentsProductNo - 5000000 : null,
          packageName: isPackage ? cartItem.contentsProductName || null : null,
          quantity: cartItem.quantity,
          selectionType,
        }),
      );
    });
};
