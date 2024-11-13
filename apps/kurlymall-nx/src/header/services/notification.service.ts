import { fetchNotification } from '../../shared/api';

export const getUserNotification = async () => {
  const notification = await fetchNotification();
  return {
    hasNew: !!(
      notification.badge.coupon ||
      notification.badge.profile ||
      notification.badge.friendsInvite ||
      notification.badge.kurlypay ||
      notification.badge.kurlyMembers ||
      notification.badge.vip
    ),
    ...notification,
  };
};
