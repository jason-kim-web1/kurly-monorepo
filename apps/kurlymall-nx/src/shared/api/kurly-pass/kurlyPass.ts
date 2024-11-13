import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';
import { KurlyPassCancelResponse, KurlyPassHistoryResponse, KurlyPassStatusType } from '../../interfaces';

interface HistoryFetchResponse {
  data: {
    history_lists: {
      detail: string;
      ordno: number;
      price: number;
      reg_time: number;
      seq: number;
      // (1: 만료 혹은 정상결제, 3: 환불) 이나 상태값 확인 필요
      type: number;
    }[];
    kurly_pass_billing_status: KurlyPassStatusType;
    // 컬리패스 사용중, 만료예정, 무료체험중인 경우만 number 로 값이 들어온다.
    kurly_pass_start_date: number | boolean;
    kurly_pass_next_billing_date: number | boolean;
    kurly_pass_expiration_date: number | boolean;
    kurly_pass_enabled: boolean;
  };
  paging: {
    next: number;
    total: number;
  };
}

export const fetchKurlyPass = async (
  pageNumber: number,
  historyPageSize: number,
): Promise<KurlyPassHistoryResponse> => {
  const url = '/kurlypass/v1/history';

  try {
    const {
      data: {
        data: {
          history_lists: historyLists,
          kurly_pass_billing_status: kurlyPassBillingStatus,
          kurly_pass_expiration_date: kurlyPassExpirationDate,
          kurly_pass_start_date: kurlyPassStartDate,
          kurly_pass_next_billing_date: kurlyPassNextBillingDate,
        },
        paging,
      },
    } = await httpClient.get<HistoryFetchResponse>(url, {
      params: {
        page_limit: historyPageSize,
        page_no: pageNumber,
      },
    });

    const totalPages = Math.ceil(paging.total / historyPageSize);
    const currentPages = pageNumber <= 0 ? 1 : pageNumber;

    // 올바른 컬리패스 정보인지 확인한다.
    const isValidKurlyPass = Number(kurlyPassStartDate) !== 0;

    return {
      list: historyLists?.map((it) => ({
        detail: it.detail,
        orderNo: it.ordno,
        paymentPrice: it.price,
        date: it.reg_time,
        seq: it.seq,
        status: it.type === 1 ? 'NORMAL' : 'REFUND',
      })),
      // 최근 컬리패스 정보
      currentKurlyPass: isValidKurlyPass
        ? {
            isExpired: kurlyPassBillingStatus === 'N',
            status: kurlyPassBillingStatus,
            startDate: Number(kurlyPassStartDate),
            endDate: Number(kurlyPassNextBillingDate),
            expiredDate: Number(kurlyPassExpirationDate),
          }
        : undefined,
      paging: {
        isFullyLoaded: !isValidKurlyPass || (isValidKurlyPass && totalPages === currentPages),
        pages: totalPages,
        currentPages,
      },
    };
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const postStopKurlyPass = async (): Promise<KurlyPassCancelResponse> => {
  const url = '/kurlypass/v1/stop-next-billing';

  try {
    const {
      data: { success },
    } = await httpClient.post<KurlyPassCancelResponse>(url);

    return { success };
  } catch (err) {
    throw new UnknownError(err);
  }
};
