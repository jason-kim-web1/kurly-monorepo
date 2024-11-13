import { useCallback, useEffect, useMemo, useState } from 'react';

import { addComma } from '../../../shared/services';

import { MenuKeyType, MenuListType, MENU_KEY_LIST, MENU_LIST } from '../../menu-section/constants';
import { isNotEmpty } from '../../../shared/utils/lodash-extends';
import { useAppSelector } from '../../../shared/store';
import { MEMBER_BENEFIT_PATH, MEMBERSHIP_PATH } from '../../../shared/constant';
import { isPC } from '../../../../util/window/getDevice';
import { MAIN_TITLE, MO_MENU_ARRAY, PC_MENU_ARRAY } from '../constants';
import { Menu } from '../../menu-section/interfaces';

export function useMenuUpdate() {
  const { badge } = useAppSelector(({ header }) => ({
    badge: header.userNotification.badge,
  }));

  const { isSubscribed } = useAppSelector(({ member }) => ({
    isSubscribed: member.subscription.isSubscribed,
  }));

  const { freePoint, prepaidPoint, couponCount, isKurlyPassEnabled, pickCount, recommendMenu, membersMenu } =
    useAppSelector(({ myKurly }) => ({
      isKurlypayFailure: myKurly.isKurlypayFailure,
      freePoint: myKurly.freePoint,
      prepaidPoint: myKurly.prepaidPoint,
      couponCount: myKurly.couponCount,
      isKurlyPassEnabled: myKurly.isKurlyPassEnabled,
      pickCount: myKurly.pickCount,
      recommendMenu: myKurly.recommendMenu,
      membersMenu: myKurly.membersMenu,
    }));

  const [menuMap, setMenuMap] = useState<MenuListType>(MENU_LIST);

  const extractMenu = useCallback(
    (...keys: MenuKeyType[]) => {
      return keys.filter((key) => isNotEmpty(menuMap[key])).map((key) => menuMap[key]);
    },
    [menuMap],
  );

  const loadNotificationBadge = useCallback(() => {
    setMenuMap((menu) => {
      return {
        ...menu,
        [MENU_KEY_LIST.myKurlyStyle]: {
          ...menu[MENU_KEY_LIST.myKurlyStyle],
          badge: badge.profile,
        },
        [MENU_KEY_LIST.invite]: {
          ...menu[MENU_KEY_LIST.invite],
          badge: badge.friendsInvite,
        },
        [MENU_KEY_LIST.kurlypay]: {
          ...menu[MENU_KEY_LIST.kurlypay],
          badge: badge.kurlypay,
        },
        [MENU_KEY_LIST.myMembership]: {
          ...menu[MENU_KEY_LIST.myMembership],
          badge: badge.kurlyMembers,
        },
        [MENU_KEY_LIST.coupon]: {
          ...menu[MENU_KEY_LIST.coupon],
          badge: badge.coupon,
        },
        [MENU_KEY_LIST.vipGuide]: {
          ...menu[MENU_KEY_LIST.vipGuide],
          badge: badge.vip,
        },
      };
    });
  }, [badge.coupon, badge.friendsInvite, badge.kurlyMembers, badge.kurlypay, badge.profile, badge.vip]);

  const loadCouponWithPickCount = useCallback(() => {
    setMenuMap((menu) => {
      return {
        ...menu,
        [MENU_KEY_LIST.coupon]: {
          ...menu[MENU_KEY_LIST.coupon],
          text: couponCount.toLocaleString(),
        },
        [MENU_KEY_LIST.pick]: {
          ...menu[MENU_KEY_LIST.pick],
          text: pickCount.toLocaleString(),
        },
      };
    });
  }, [couponCount, pickCount]);

  const loadAvailableAmount = useCallback(() => {
    setMenuMap((menu) => {
      return {
        ...menu,
        [MENU_KEY_LIST.emoney]: {
          ...menu[MENU_KEY_LIST.emoney],
          text: addComma(freePoint.point).toLocaleString(),
          link: freePoint.redirectUrl,
        },
        [MENU_KEY_LIST.kurlycash]: {
          ...menu[MENU_KEY_LIST.kurlycash],
          text: addComma(prepaidPoint.point).toLocaleString(),
          link: prepaidPoint.redirectUrl,
        },
      };
    });
  }, [freePoint.point, freePoint.redirectUrl, prepaidPoint.point, prepaidPoint.redirectUrl]);

  const loadMenuBanners = useCallback(() => {
    setMenuMap((menu) => {
      return {
        ...menu,
        [MENU_KEY_LIST.invite]: {
          ...menu[MENU_KEY_LIST.invite],
          text: recommendMenu?.title || '',
          link: recommendMenu?.link || MEMBER_BENEFIT_PATH.friend.uri,
        },
        [MENU_KEY_LIST.myMembership]: {
          ...menu[MENU_KEY_LIST.myMembership],
          text: isPC || isSubscribed ? '' : membersMenu?.title || '',
          link: membersMenu?.link || MEMBERSHIP_PATH.membership.uri,
        },
        [MENU_KEY_LIST.kurlypass]: {
          ...menu[MENU_KEY_LIST.kurlypass],
          text: isKurlyPassEnabled ? '사용중' : '',
        },
      };
    });
  }, [
    isKurlyPassEnabled,
    isSubscribed,
    membersMenu?.link,
    membersMenu?.title,
    recommendMenu?.link,
    recommendMenu?.title,
  ]);

  const menuInfoMap: { [key: string]: Menu[] } = useMemo(() => {
    return [MAIN_TITLE[0], MAIN_TITLE[1], MAIN_TITLE[2], MAIN_TITLE[3], MAIN_TITLE[4], MAIN_TITLE[5]].reduce(
      (acc, title) => {
        let temp = MO_MENU_ARRAY[title];
        if (isPC) {
          temp = PC_MENU_ARRAY[title];
        }
        return {
          ...acc,
          [title]: temp.length > 0 ? extractMenu(...temp) : [],
        };
      },
      {},
    );
  }, [extractMenu]);

  useEffect(() => {
    loadNotificationBadge();
  }, [loadNotificationBadge]);
  useEffect(() => {
    loadCouponWithPickCount();
  }, [loadCouponWithPickCount]);
  useEffect(() => {
    loadAvailableAmount();
  }, [loadAvailableAmount]);
  useEffect(() => {
    loadMenuBanners();
  }, [loadMenuBanners]);

  return {
    extractMenu,
    menuInfoMap,
  };
}
