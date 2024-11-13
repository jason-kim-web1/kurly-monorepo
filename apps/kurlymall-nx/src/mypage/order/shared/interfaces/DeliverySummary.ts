import { WeekDay } from '../../../../shared/constant/weekDay';

export interface DeliverySummary {
  completionInfo: {
    //배송 완료 시간 YYYY-MM-ddTHH:mm:ss
    deliveredAt: string;
    //배송 완료 요일
    deliveredDayOfWeek: WeekDay;
    //배송완료 이미지
    imageUrl: string;
  } | null;
}
