import { memo, useCallback } from 'react';

import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { Menu } from '../interfaces';
import { amplitudeService } from '../../shared/amplitude';
import {
  SelectMyKurlyBulkOrder,
  SelectMyKurlyCouponList,
  SelectMyKurlyFrequentlyQna,
  SelectMyKurlyNoticeList,
  SelectMyKurlyOrderHistory,
  SelectMyKurlyPersonalInquiryHistory,
  SelectMyKurlyPointHistory,
  SelectMyKurlyProductInquiryHistory,
  SelectMyKurlyReviewHistory,
} from '../../shared/amplitude/events/mypage';
import { SelectMyKurlyPickList } from '../../shared/amplitude/events';
import COLOR from '../../shared/constant/colorset';
import { SelectMyKurlyStyle } from '../../shared/amplitude/events/mykurly-style';

import NewBadge from '../../shared/icons/NewBadge';
import { useCheckKurlyPay } from '../../mypage/menu-section/hooks/useCheckKurlyPay';
import { BOARD_PATH, INQUIRY_PATH, MYPAGE_PATH, MY_KURLY_STYLE, COMMON_PATH } from '../../shared/constant';
import { flushNaverCpsCookies } from '../../shared/utils/cookie';
import { redirectTo } from '../../shared/reducers/page';
import { SelectMyKurlyFrequentlyPurchaseProductList } from '../../shared/amplitude/events/favorite';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 34px;
  width: 130px;
  padding: 3px 9px;
  border: 1px solid ${COLOR.lightGray};
  background-color: ${COLOR.kurlyWhite};
`;

const LinkItem = styled.div`
  display: block;
  height: 24px;
  line-height: 24px;
  cursor: pointer;
  svg {
    margin: -2px 0 0 4px;
    vertical-align: middle;
  }
`;

interface Props {
  className?: string;
  menus: Menu[];
}

function SubMenu({ className, menus }: Props) {
  const dispatch = useDispatch();

  const { handleCheckKurlyPay } = useCheckKurlyPay();

  const handleSubMenuLink = useCallback(
    async ({ title, link }: { title: string; link: string }) => {
      const isKurlyPayMenu = await handleCheckKurlyPay(title);
      if (isKurlyPayMenu) return false;

      switch (title) {
        case MYPAGE_PATH.pick.name:
          amplitudeService.logEvent(new SelectMyKurlyPickList({ selectionType: 'dropdown' }));
          break;
        case MYPAGE_PATH.review.name:
          amplitudeService.logEvent(new SelectMyKurlyReviewHistory({ selectionType: 'dropdown' }));
          break;
        case MYPAGE_PATH.productInquiry.name:
          amplitudeService.logEvent(new SelectMyKurlyProductInquiryHistory({ selectionType: 'dropdown' }));
          break;
        case MYPAGE_PATH.emoney.name:
          amplitudeService.logEvent(new SelectMyKurlyPointHistory({ selectionType: 'dropdown' }));
          break;
        case MYPAGE_PATH.coupon.name:
          amplitudeService.logEvent(new SelectMyKurlyCouponList({ selectionType: 'dropdown' }));
          break;
        case MY_KURLY_STYLE.myKurlyStyle.name:
          amplitudeService.logEvent(new SelectMyKurlyStyle({ selectionType: 'dropdown' }));
          break;
        case BOARD_PATH.notice.name:
          amplitudeService.logEvent(new SelectMyKurlyNoticeList());
          break;
        case BOARD_PATH.faq.name:
          amplitudeService.logEvent(new SelectMyKurlyFrequentlyQna());
          break;
        case INQUIRY_PATH.inquiry.name:
          amplitudeService.logEvent(new SelectMyKurlyPersonalInquiryHistory());
          break;
        case MYPAGE_PATH.bulkOrder.name:
          amplitudeService.logEvent(new SelectMyKurlyBulkOrder());
          break;
        case MYPAGE_PATH.favorite.name:
          amplitudeService.logEvent(new SelectMyKurlyFrequentlyPurchaseProductList());
          break;
        case MYPAGE_PATH.orderList.name:
          amplitudeService.logEvent(new SelectMyKurlyOrderHistory());
          break;
        case COMMON_PATH.logout.name:
          flushNaverCpsCookies();
          break;
        default:
          break;
      }

      const isBulkOrderMenu = title === MYPAGE_PATH.bulkOrder.name;
      if (isBulkOrderMenu) return window.open(link, '_blank');

      dispatch(redirectTo({ url: link }));
    },
    [dispatch, handleCheckKurlyPay],
  );
  return (
    <Container className={className}>
      {menus.map(({ title, link, hasNew }) => (
        <LinkItem key={title} onClick={() => handleSubMenuLink({ title, link })}>
          {title}
          {hasNew && <NewBadge width={12} height={12} />}
        </LinkItem>
      ))}
    </Container>
  );
}

export default memo(SubMenu);
