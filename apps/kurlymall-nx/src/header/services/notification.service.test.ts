import { getUserNotification } from './notification.service';

import { fetchNotification } from '../../shared/api';

import { userNotificationFixture } from '../../../fixtures';

jest.mock('../../shared/api/mypage/notification');

describe('Notification service', () => {
  describe('getUserNotification', () => {
    context('when badge does not exist', () => {
      beforeEach(() => {
        (fetchNotification as jest.Mock).mockReturnValue({
          ...userNotificationFixture,
          badge: {
            coupon: false,
            friendsInvite: false,
            member: false,
            profile: false,
            kurlypay: false,
            vip: false,
          },
        });
      });

      it('returns hasNew to be false', async () => {
        const userNotification = await getUserNotification();

        expect(userNotification).toEqual(
          expect.objectContaining({
            hasNew: false,
          }),
        );
      });
    });

    context('when any badge exist', () => {
      beforeEach(() => {
        (fetchNotification as jest.Mock).mockReturnValue({
          ...userNotificationFixture,
          badge: {
            coupon: true,
            emoney: false,
            friendsInvite: false,
            member: false,
            profile: false,
            kurlypay: false,
          },
          kurlyLoversBenefit: null,
        });
      });

      it('returns hasNew to be true', async () => {
        const userNotification = await getUserNotification();

        expect(userNotification).toEqual(
          expect.objectContaining({
            hasNew: true,
          }),
        );
      });
    });
  });
});
