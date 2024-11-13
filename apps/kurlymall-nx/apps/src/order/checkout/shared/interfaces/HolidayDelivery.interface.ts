import { SpecialHolidayDeliveryPage } from '../../../../shared/enums';

export interface HolidayDelivery {
  startDate: string;
  endDate: string;
  title: string;
  description: string;
  src?: string;
  // 사용 유무(급하게 사용 종료처리할때)
  isUsePage?: SpecialHolidayDeliveryPage[];
}

export interface HolidayDeliveryLimit {
  startDate: string;
  endDate: string;
  description: string;
}

export interface HolidayDeliveryResponse {
  regionCode: string[];
  ALL?: HolidayDeliveryLimit;
  AA?: HolidayDeliveryLimit;
  AB?: HolidayDeliveryLimit;
  BS?: HolidayDeliveryLimit;
  UL?: HolidayDeliveryLimit;
  NJ?: HolidayDeliveryLimit;
  NK?: HolidayDeliveryLimit;
  NO?: HolidayDeliveryLimit;
}

export interface DeliveryDoneTime {
  orderUntilAt: string;
  deliveryDoneAt: string;
  courierNotice?: string;
}
