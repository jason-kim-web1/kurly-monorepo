import { AxiosError } from 'axios';

import { UnknownError } from '../../errors';
import httpClient from '../../configs/http-client';
import { BaseApiResponse } from '../../interfaces';
import { BenefitIdentifiers, EventBoardComment, EventBoardCommentRequestParams } from './api.type';

const getEventBoardCommentApiUrl = (eventBoardId: number) => `/eventboard/public/v1/user/board/${eventBoardId}/comment`;

const getEventCommentApiUrl = () => `/eventboard/public/v1/user/comment/`;

export const fetchEventBoardComments = (eventBoardId?: number) => async () => {
  if (!eventBoardId) {
    return null;
  }

  try {
    const response = await httpClient.get<BaseApiResponse<EventBoardComment>>(
      getEventBoardCommentApiUrl(eventBoardId),
      {
        params: {
          page: 1,
          size: 999,
        },
      },
    );

    return response;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const postEventBoardComment = (eventBoardId?: number) => async (params: EventBoardCommentRequestParams) => {
  if (!eventBoardId) {
    return null;
  }

  try {
    const response = await httpClient.post(getEventBoardCommentApiUrl(eventBoardId), {
      ...params,
      parentCommentId: null,
    });

    return response;
  } catch (err) {
    console.error((err as AxiosError).response?.data);

    throw err;
  }
};

export const deleteEventBoardComment = async (commentId: string) => {
  try {
    const response = await httpClient.delete(`${getEventCommentApiUrl()}/${commentId}`);

    return response;
  } catch (err) {
    console.error((err as AxiosError).response?.data);

    throw err;
  }
};

export const fetchVipAffiliatesBenefitIdentifier = (identifier?: string) => async () => {
  if (!identifier) {
    return null;
  }

  try {
    const response = await httpClient.get<BenefitIdentifiers>(
      `/member/proxy/membership/v1/vip/affiliates/benefits/${identifier}`,
    );

    return response;
  } catch (err) {
    console.error(err);

    throw new UnknownError(err as Error);
  }
};
