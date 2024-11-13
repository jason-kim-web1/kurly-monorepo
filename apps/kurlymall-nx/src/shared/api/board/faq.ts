import { BaseApiResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';

export const FAQ_TYPE = {
  all: 'ALL',
  top: 'TOP',
  member: 'MEMBER',
  product: 'PRODUCT',
  order: 'ORDER',
  delivery: 'DELIVERY',
  package: 'PACKAGE',
  eventCouponPoint: 'EVENT_COUPON_POINT',
  cancelRefund: 'CANCEL_REFUND',
  kurlyPassMembers: 'KURLYPASS_MEMBERS',
  gift: 'GIFT',
  selfPickup: 'SELF_PICKUP',
  purpleBox: 'PURPLE_BOX',
  kurlypay: 'KURLYPAY',
  siteHelp: 'SITE_HELP',
  systemError: 'SYSTEM_ERROR',
};

export type FaqKeyType = typeof FAQ_TYPE[keyof typeof FAQ_TYPE];
export interface FaqListInterface {
  id: number;
  value: FaqKeyType;
  name: string;
}
export interface FaqListResponse {
  id: number;
  type: FaqKeyType;
  desc: string;
}

export const FAQ_ADD_CATEGORY: FaqListInterface[] = [
  {
    id: 0,
    value: FAQ_TYPE.all,
    name: '전체',
  },
  {
    id: 1,
    value: FAQ_TYPE.top,
    name: 'TOP 공지',
  },
];

export interface FaqInterface {
  no: number;
  category: string;
  question: string;
  answer: string;
}

interface FaqListProps {
  page: number;
  size?: number;
  type?: FaqKeyType;
}

export const fetchFaqCategory = async () => {
  try {
    const url = '/member/proxy/member-board/v1/faq/types/shop';

    const { data } = await httpClient.get<BaseApiResponse<FaqListResponse[]>>(url);

    return data.data.map((category, index) => ({
      id: index,
      value: category.type,
      name: category.desc,
    }));
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const fetchFaqList = async ({ page = 0, size = 10, type = 'ALL' }: FaqListProps): Promise<FaqInterface[]> => {
  const url = `/member/proxy/member-board/v1/faq/posts/shop${type === 'TOP' ? '/top' : ''}`;

  const { data } = await httpClient.get<BaseApiResponse<FaqInterface[]>>(url, {
    params: {
      page,
      size,
      ...(!['ALL', 'TOP'].includes(type) && {
        faqType: type,
      }),
    },
  });
  return data.data;
};
