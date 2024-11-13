import { isEmpty } from 'lodash';

import { fetchNoticeDetail, fetchNoticeList, NoticeInterface } from '../shared/api/board/notice';
import { FaqInterface, fetchFaqList } from '../shared/api/board/faq';

export interface BoardResponses<T> {
  data: T;
  nextPage: number;
  prevPage: number;
  isLastPage: boolean;
}

interface BoardListProps {
  page: number;
  size?: number;
}

interface FaqListProps {
  page: number;
  size?: number;
  type?: string;
}

export const getNoticeList = async (options: BoardListProps): Promise<BoardResponses<NoticeInterface[]>> => {
  const responses = await fetchNoticeList(options);

  const isEmptyData = isEmpty(responses);

  return {
    data: responses,
    nextPage: isEmptyData ? options.page : options.page + 1,
    prevPage: options.page >= 1 ? options.page - 1 : 0,
    isLastPage: isEmptyData,
  };
};

export const getNoticeDetail = async (no: string) => {
  return fetchNoticeDetail(no);
};

export const getFaqList = async (options: FaqListProps): Promise<BoardResponses<FaqInterface[]>> => {
  const responses = await fetchFaqList(options);

  const isEmptyData = isEmpty(responses);

  return {
    data: responses,
    nextPage: isEmptyData ? options.page : options.page + 1,
    prevPage: options.page >= 1 ? options.page - 1 : 0,
    isLastPage: isEmptyData,
  };
};
