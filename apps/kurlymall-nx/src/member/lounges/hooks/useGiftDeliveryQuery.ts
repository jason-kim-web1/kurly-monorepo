import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AxiosError } from 'axios';

import {
  deleteEventBoardComment,
  fetchEventBoardComments,
  postEventBoardComment,
} from '../../../shared/api/lounges/lounges.api';
import { getSecond } from '../../../shared/utils/time';
import { useAppSelector } from '../../../shared/store';
import Alert from '../../../shared/components/Alert/Alert';
import { UnknownError } from '../../../shared/errors';
import { EventBoardComment } from '../../../shared/api/lounges/api.type';
import { DeliveryProps } from '../../../shared/interfaces/ShippingAddress';

const STALE_TIME = getSecond(60 * 1000);

function useGiftDeliveryQuery({ eventBoardId }: { eventBoardId?: number }) {
  const queryClient = useQueryClient();

  const { hasSession, isGuest, memberNo } = useAppSelector(({ auth, member }) => ({
    hasSession: auth.hasSession,
    isGuest: auth.isGuest,
    memberNo: member.info?.memberNo,
  }));

  const [userDeliveryData, setUserDeliveryData] = useState<{
    deliveryMethod: string;
    deliveryDate: Date;
    deliveryAddress?: string;
  }>();

  const [excludeDates, setExcludeDates] = useState<Date[]>([]);

  const [currentCommentId, setCurrentCommentId] = useState<string>('');

  const queryKey = ['giftDelivery', eventBoardId];

  const {
    refetch,
    data: response,
    status: fetchStatus,
    error: fetchError,
  } = useQuery(queryKey, fetchEventBoardComments(eventBoardId), {
    enabled: hasSession && !isGuest && !!eventBoardId,
    staleTime: STALE_TIME,
    select: (data) => data?.data,
  });

  const setCurrentData = useCallback((text?: string, commentId?: string) => {
    if (!text || !commentId) {
      return;
    }

    const [deliveryMethod, deliveryDate, deliveryAddress] = text?.split('_') || [];

    setUserDeliveryData({
      deliveryMethod,
      deliveryDate: new Date(deliveryDate),
      deliveryAddress,
    });

    setCurrentCommentId(commentId);
  }, []);

  const getFilteredExcludeDates = ({ content }: EventBoardComment) => {
    const strDates = content.reduce((acc: Record<string, number>, { text }) => {
      const [, deliveryDate] = text.split('_');

      if (acc[deliveryDate]) {
        acc[deliveryDate] = acc[deliveryDate] + 1;
        return acc;
      }

      return {
        ...acc,
        [deliveryDate]: 1,
      };
    }, {});

    return Object.entries(strDates)
      .filter(([, count]) => count >= 100)
      .map(([key]) => new Date(key));
  };

  useEffect(() => {
    if (!!response?.success) {
      const { content } = response.data;
      const userComment = content.find(({ userNo }) => userNo === memberNo);

      setCurrentData(userComment?.text, userComment?.commentId);

      const filteredExcludeDates = getFilteredExcludeDates(response.data);

      setExcludeDates(filteredExcludeDates);
    }
  }, [response, memberNo, setCurrentData]);

  useEffect(() => {
    if (fetchError) {
      Alert({
        text: (fetchError as Error).message,
      });
    }
  }, [fetchError]);

  const { mutateAsync: registerGiftDeliveryData } = useMutation(postEventBoardComment(eventBoardId), {
    onSuccess: (data) => {
      const {
        data: { commentId, text },
      } = data?.data || {};

      setCurrentData(text, commentId);

      queryClient.cancelQueries(queryKey);
    },
  });

  const { mutateAsync: deleteGiftDeliveryData } = useMutation(deleteEventBoardComment, {
    onError: (err) => {
      console.error(err);
    },
    onSuccess: () => {
      queryClient.cancelQueries(queryKey);
    },
  });

  const initUserDeliveryData = () => {
    setUserDeliveryData(undefined);
  };

  const saveGiftDeliveryData = async ({
    deliveryMethod,
    deliveryDate,
    deliveryAddress,
  }: {
    deliveryMethod: string;
    deliveryDate: Date;
    deliveryAddress?: DeliveryProps;
  }) => {
    try {
      if (currentCommentId) {
        await deleteGiftDeliveryData(currentCommentId);
      }

      const text = [
        deliveryMethod,
        format(deliveryDate, 'yyyy-MM-dd'),
        deliveryAddress
          ? `[${deliveryAddress?.zipcode}] ${deliveryAddress?.roadAddress} ${deliveryAddress?.addressDetail}`
          : undefined,
      ]
        .filter((str) => !!str)
        .join('_');

      await registerGiftDeliveryData({
        text,
      });
    } catch (err) {
      const message = (err as AxiosError).response?.data?.message;
      if (message) {
        throw new Error(message);
      }

      throw new UnknownError(err as Error);
    }
  };

  const isGiftLimitationExceed = async (selectedDate: number) => {
    const data = await refetch();

    if (data?.data) {
      const filteredExcludeDates = getFilteredExcludeDates(data.data.data);

      return filteredExcludeDates.some((date) => date.getDate() === selectedDate);
    }

    return true;
  };
  return {
    isGiftLimitationExceed,
    userDeliveryData,
    excludeDates,
    fetchStatus,
    initUserDeliveryData,
    saveGiftDeliveryData,
  };
}

export default useGiftDeliveryQuery;
