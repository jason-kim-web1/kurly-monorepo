import httpClient from '../../configs/http-client';

import { handleUnauthenticated } from '../../error-handlers';
import { UnknownError } from '../../errors';

import { BaseResponse } from '../../interfaces';

export const BADGE_KEY = {
  coupon_badge: 'coupon_badge',
  friends_invite_badge: 'friends_invite_badge',
  profile_badge: 'profile_badge',
  kurlypay_badge: 'kurlypay_badge',
  membership_badge: 'membership_badge',
  vip_badge: 'vip_badge',
} as const;

type BADGE = typeof BADGE_KEY[keyof typeof BADGE_KEY];

type Notification = Record<BADGE, boolean>;

export const fetchNotification = async () => {
  const url = '/member/proxy/member-mykurly/v1/notifications';
  try {
    const {
      data: { data },
    } = await httpClient.get<BaseResponse<Notification>>(url);

    return {
      badge: {
        coupon: data.coupon_badge,
        profile: data.profile_badge,
        friendsInvite: data.friends_invite_badge,
        kurlypay: data.kurlypay_badge,
        kurlyMembers: data.membership_badge,
        vip: data.vip_badge,
      },
    };
  } catch (err) {
    handleUnauthenticated(err as Error);

    throw new UnknownError(err as Error);
  }
};

export const updateReadBadge = async (badge: BADGE) => {
  const endpoint = '/member/proxy/member-mykurly/v1/notifications/read';

  try {
    await httpClient.post(endpoint, {
      badge_type: [badge],
    });
  } catch {
    // 에러 처리 하지 않음
  }
};

export const updateUnreadBadge = async (badge: BADGE) => {
  const endpoint = '/member/proxy/member-mykurly/v1/notifications';

  try {
    await httpClient.put(endpoint, {
      badge_type: badge,
    });
  } catch {
    // 에러 처리 하지 않음
  }
};
