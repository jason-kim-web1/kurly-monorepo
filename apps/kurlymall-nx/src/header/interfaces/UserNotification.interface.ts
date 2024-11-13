export interface UserNotification {
  hasNew: boolean;
  badge: {
    coupon: boolean;
    friendsInvite: boolean;
    member: boolean;
    profile: boolean;
    kurlypay: boolean;
    kurlyMembers: boolean;
    vip: boolean;
  };
}
