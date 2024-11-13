import { ReactNode, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import COLOR from '../../../../src/shared/constant/colorset';

import { amplitudeService } from '../../amplitude';
import { SelectMyKurlyPickList } from '../../amplitude/events';
import {
  SelectMyKurlyCouponList,
  SelectMyKurlyOrderHistory,
  SelectMyKurlyPointHistory,
  SelectMyKurlyProductInquiryHistory,
  SelectMyKurlyReviewHistory,
  SelectServiceBulkOrder,
  SelectServiceFrequentlyQna,
  SelectServiceNoticeList,
  SelectServicePersonalInquiryHistory,
} from '../../amplitude/events/mypage';
import { BOARD_PATH, INQUIRY_PATH, MY_KURLY_STYLE, MYPAGE_PATH } from '../../constant';
import { SelectMyKurlyStyle } from '../../amplitude/events/mykurly-style';
import { useCheckKurlyPay } from '../../../mypage/menu-section/hooks/useCheckKurlyPay';
import ArrowRight from '../../icons/ArrowRight';
import { redirectTo } from '../../reducers/page';
import { SelectMyKurlyFrequentlyPurchaseProductList } from '../../amplitude/events/favorite';

interface SideNavigationBarOption {
  id: number;
  text: string;
  url: string;
  subMenu?: string[];
}

const Container = styled.div`
  width: 200px;
`;

const Title = styled.div`
  height: 75px;
  padding: 5px 0 35px 1px;
  font-weight: 500;
  font-size: 28px;
  line-height: 35px;
  color: ${COLOR.kurlyGray800};
  letter-spacing: -1px;
`;

const Ul = styled.ul`
  border: 1px solid ${COLOR.btnGray};
`;

const LinkMenu = styled.a`
  cursor: pointer;
  border-bottom: 1px solid ${COLOR.btnGray};
  padding: 15px 13px 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 19px;
  letter-spacing: -0.3px;
  font-size: 14px;
  color: ${COLOR.kurlyGray600};
  &.active,
  &:hover {
    background-color: ${COLOR.kurlyGray100};
    color: ${COLOR.kurlyPurple};
    font-weight: 500;
  }
  &:hover use {
    stroke: ${COLOR.kurlyPurple};
  }
`;

interface Props {
  title: string;
  options: SideNavigationBarOption[];
  children?: ReactNode;
}

export default function SideNavigationBar({ title, options, children }: Props) {
  const { isReady, pathname } = useRouter();
  const dispatch = useDispatch();

  const { handleCheckKurlyPay } = useCheckKurlyPay();

  const [activeId, setActiveId] = useState<number>();

  const handleClick = async ({ url, text }: { url: string; text: string }) => {
    const isKurlyPayMenu = await handleCheckKurlyPay(text);
    if (isKurlyPayMenu) return false;

    switch (text) {
      case MYPAGE_PATH.pick.name:
        amplitudeService.logEvent(new SelectMyKurlyPickList({ selectionType: 'mypage' }));
        break;
      case MYPAGE_PATH.review.name:
        amplitudeService.logEvent(new SelectMyKurlyReviewHistory({ selectionType: 'mypage' }));
        break;
      case MYPAGE_PATH.productInquiry.name:
        amplitudeService.logEvent(new SelectMyKurlyProductInquiryHistory({ selectionType: 'mypage' }));
        break;
      case MYPAGE_PATH.emoney.name:
        amplitudeService.logEvent(new SelectMyKurlyPointHistory({ selectionType: 'mypage' }));
        break;
      case MYPAGE_PATH.coupon.name:
        amplitudeService.logEvent(new SelectMyKurlyCouponList({ selectionType: 'mypage' }));
        break;
      case MY_KURLY_STYLE.myKurlyStyle.name:
        amplitudeService.logEvent(new SelectMyKurlyStyle({ selectionType: 'side' }));
        break;
      case BOARD_PATH.notice.name:
        amplitudeService.logEvent(new SelectServiceNoticeList());
        break;
      case BOARD_PATH.faq.name:
        amplitudeService.logEvent(new SelectServiceFrequentlyQna());
        break;
      case INQUIRY_PATH.inquiry.name:
        amplitudeService.logEvent(new SelectServicePersonalInquiryHistory());
        break;
      case MYPAGE_PATH.bulkOrder.name:
        amplitudeService.logEvent(new SelectServiceBulkOrder());
        break;
      case MYPAGE_PATH.favorite.name:
        amplitudeService.logEvent(new SelectMyKurlyFrequentlyPurchaseProductList());
        break;
      case MYPAGE_PATH.orderList.name:
        amplitudeService.logEvent(new SelectMyKurlyOrderHistory());
        break;
      default:
        break;
    }

    const isBulkOrderMenu = text === MYPAGE_PATH.bulkOrder.name;
    if (isBulkOrderMenu) return window.open(url, '_blank');

    dispatch(redirectTo({ url }));
  };

  useEffect(() => {
    if (isReady) {
      const activeOption = options.find(({ url }) => {
        if (url) {
          return pathname.startsWith(url);
        }
      });

      if (activeOption) {
        setActiveId(activeOption.id);
      }

      const activeSubmenuOption = options.find(({ subMenu = [] }) => subMenu.includes(pathname));
      if (activeSubmenuOption) {
        setActiveId(activeSubmenuOption.id);
      }
    }
  }, [isReady, options, pathname]);

  return (
    <Container>
      <Title>{title}</Title>
      <Ul>
        {options.map(({ id, url, text }) => (
          <li key={id}>
            <LinkMenu onClick={() => handleClick({ url, text })} className={activeId === id ? 'active' : ''}>
              {text}
              <ArrowRight
                width={19}
                height={19}
                strokeWidth={1.8}
                stroke={activeId === id ? COLOR.kurlyPurple : COLOR.kurlyGray450}
              />
            </LinkMenu>
          </li>
        ))}
      </Ul>
      {children}
    </Container>
  );
}
