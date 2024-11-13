import { AmplitudeEvent } from '../../AmplitudeEvent';
import { MembersBannerType } from '../../../../order/checkout/shared/constants/kurly-members-banner';

type SelectionType = 'coupon_select' | 'coupon' | 'order_info' | 'kurlypay_select';

interface Payload {
  /**
   * 주문서 내 배너 위치 구분
   * - coupon_select : 쿠폰함 선택시
   * - coupon : 쿠폰 하단 선택시
   * - order_info : 결제정보 하단 선택시
   * - kurlypay_select : 결제수단 컬리페이 선택시
   */
  selectionType: SelectionType;
}

/**
 * 컬리멤버스 배너 클릭 SelectionType Event Map
 */
export const KurlyMembersBannerTypeEventMap: Record<MembersBannerType, SelectionType> = {
  ORDER_MOBILE_KURLY_MEMBERS_COUPON: 'coupon',
  ORDER_PC_KURLY_MEMBERS_COUPON: 'coupon',
  ORDER_MOBILE_KURLY_MEMBERS_COUPON_BOTTOM: 'coupon_select',
  ORDER_PC_KURLY_MEMBERS_COUPON_BOTTOM: 'coupon_select',
  ORDER_MOBILE_KURLY_MEMBERS_ORDER_INFO_BOTTOM: 'order_info',
  ORDER_PC_KURLY_MEMBERS_ORDER_INFO_BOTTOM: 'order_info',
  ORDER_KURLYPAY_KURLY_MEMBERS_BANNER_MOBILE: 'kurlypay_select',
  ORDER_KURLYPAY_KURLY_MEMBERS_BANNER_PC: 'kurlypay_select',
};

/**
 * 컬리멤버스 배너 클릭
 * @extends AmplitudeEvent
 */
export class SelectOrderSheetBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_order_sheet_banner', payload);
  }

  getPayload() {
    return {
      url: 'https://www.kurly.com/member/membership',
      selection_type: this.payload.selectionType,
    };
  }
}
