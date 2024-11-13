// Y:정상 N:구독중단 F:결제실패 P:무료사용중
export enum KurlyPassStatus {
  Y = 'NORMAL',
  N = 'STOP_SUBSCRIPTION',
  P = 'FREE_IN_USE',
}

export type KurlyPassStatusType = keyof typeof KurlyPassStatus;

export const KurlyPassStatusTextMap: Record<KurlyPassStatusType, string> = {
  Y: '사용중',
  N: '만료 예정',
  P: '무료체험',
};

export interface BillingHistory {
  detail: string;
  orderNo: number;
  paymentPrice: number;
  date: number;
  seq: number;
  status: 'NORMAL' | 'REFUND';
}

export interface CurrentKurlyPass {
  isExpired: boolean;
  startDate: number;
  endDate: number;
  expiredDate: number;
  status: KurlyPassStatusType;
}

export interface KurlyPassHistoryResponse {
  list: BillingHistory[];
  currentKurlyPass?: CurrentKurlyPass;
  paging: {
    isFullyLoaded: boolean;
    pages: number;
    currentPages: number;
  };
}

export interface KurlyPassCancelResponse {
  success: boolean;
}
