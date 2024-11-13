import { BaseApiResponse } from '../../interfaces';
import httpClient from '../../configs/http-client';

export interface NoticeInterface {
  displayNo: string;
  no: number;
  subject: string;
  regdt: string;
  contents: string;
}

interface NoticeListProps {
  page: number;
  size?: number;
}

export interface NoticeDetailInterface {
  no: number;
  subject: string;
  regdt: string;
  contents: string;
}

export const fetchNoticeList = async ({ page = 0, size = 10 }: NoticeListProps): Promise<NoticeInterface[]> => {
  const url = '/member/proxy/member-board/v1/notice/posts/shop';
  const {
    data: { data },
  } = await httpClient.get<BaseApiResponse<NoticeInterface[]>>(url, {
    params: {
      page,
      size,
    },
  });

  return data;
};

export const fetchNoticeDetail = async (no: string): Promise<NoticeDetailInterface> => {
  const url = `/member/proxy/member-board/v1/notice/posts/shop/${no}`;
  const { data } = await httpClient.get<BaseApiResponse<NoticeDetailInterface>>(url);
  return data.data;
};
