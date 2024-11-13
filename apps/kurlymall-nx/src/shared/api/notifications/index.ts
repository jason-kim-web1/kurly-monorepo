import { format } from 'date-fns';

import httpClient from '../../configs/http-client';
import { UnknownError } from '../../errors';
import { NotificationCategory, NotificationItem, NotificationType } from '../../interfaces/Notification';
import { BaseApiResponse } from '../../interfaces';
import { convertToCamelKeys } from '../../utils/convert-to-camel-keys';
import { getNotificationsMock } from './mock';

interface NotificationItemResponse {
  id: number;
  notification_type: NotificationType;
  notification_category: NotificationCategory;
  title: string;
  contents: string;
  image_url: string;
  landing_link: string;
  created_at: string;
}

interface NotificationSearchResponse {
  content: NotificationItemResponse[];
  last: boolean;
  number: number;
}

interface NotificationBadgeResponse {
  isBadge: boolean;
}

export const searchNotifications = async (
  {
    notificationCategory,
    startAt,
    endAt,
  }: {
    notificationCategory?: NotificationCategory;
    startAt?: Date;
    endAt?: Date;
  },
  page: number,
  size: number,
): Promise<{
  number: number;
  last: boolean;
  content: NotificationItem[];
}> => {
  // region mock
  const mock = getNotificationsMock(page, size, notificationCategory);

  if (mock) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mock;
  }
  // endregion

  const endpoint = '/marketing-message-notification-api/v1/notifications/search';
  try {
    const response = await httpClient.post<BaseApiResponse<NotificationSearchResponse>>(
      endpoint,
      {
        notification_category: notificationCategory,
        start_at: startAt ? format(startAt, `yyyy-MM-dd'T'HH:mm:ss`) : undefined,
        end_at: endAt ? format(endAt, `yyyy-MM-dd'T'HH:mm:ss`) : undefined,
      },
      {
        params: { page, size },
      },
    );

    const {
      data: { data },
    } = response || {};

    return {
      number: data?.number,
      last: data?.last,
      content: data?.content.map((x) => {
        const converted = convertToCamelKeys<
          Omit<NotificationItem, 'createdAt'> & {
            createdAt: string;
          },
          NotificationItemResponse
        >(x);
        return {
          ...converted,
          createdAt: new Date(converted.createdAt),
          landingLink: converted.landingLink || undefined,
        };
      }),
    };
  } catch (err) {
    throw new UnknownError(err);
  }
};
export const checkBadges = async (): Promise<boolean> => {
  const endpoint = '/marketing-message-notification-api/v1/notifications/badges';
  try {
    const {
      data: { data },
    } = await httpClient.get<BaseApiResponse<NotificationBadgeResponse>>(endpoint);

    return data.isBadge;
  } catch (err) {
    throw new UnknownError(err);
  }
};

export const deleteBadges = async (): Promise<void> => {
  const endpoint = '/marketing-message-notification-api/v1/notifications/badges';
  try {
    await httpClient.delete(endpoint);
  } catch (err) {
    throw new UnknownError(err);
  }
};
