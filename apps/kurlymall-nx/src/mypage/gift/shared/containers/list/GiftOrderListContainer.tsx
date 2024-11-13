import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import moment from 'moment';

import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isUndefined } from 'lodash';

import { useAppSelector } from '../../../../../shared/store';
import { logEventAction } from '../../../../../shared/reducers/amplitude.slice';
import {
  initialState,
  loadGiftOrders,
  postResendMessage,
  setCurrentFilter,
  setInitialStateData,
  setMessageTimeCheck,
} from '../../reducers/mypage-gift.slice';

import { KAKAO_GIFT_TEMPLATE_ID, KAKAO_SHARE_KEY } from '../../../../../shared/configs/config';
import { GiftListItem } from '../../../../../shared/interfaces';
import { SelectMessageResendButton } from '../../../../../shared/amplitude/events';
import { GIFT_PATH, getPageUrl } from '../../../../../shared/constant';

import Loading from '../../../../../shared/components/Loading/Loading';
import GiftOrderList from '../../components/list/GiftOrderList';
import { redirectTo } from '../../../../../shared/reducers/page';
import { Option } from '../../../../../shared/components/Input/Dropdown';
import DateFilterSelector from '../../components/list/DateFilterSelector';
import COLOR from '../../../../../shared/constant/colorset';
import { useScroll } from '../../../../../shared/hooks';
import { isPC } from '../../../../../../util/window/getDevice';
import { MOBILE_HEADER_HEIGHT } from '../../../../../order/cart/constants';
import { ORDER_FILTER_HEADER } from '../../../../../order/order-list/constants/order-list';

const SCROLL_TURNING_POINT = 5;
const FILTER_HIDE_TOP = MOBILE_HEADER_HEIGHT - ORDER_FILTER_HEADER;

const options: Option[] = [
  { id: 0, name: '3개월', value: '3' },
  { id: 1, name: '6개월', value: '6' },
  { id: 2, name: '1년', value: '12' },
  { id: 3, name: '3년', value: '36' },
];

const FilterContainer = styled.div<{ scrollDirection: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: ${COLOR.kurlyWhite};
  transition: top 0.2s ease-in-out;

  button:last-of-type {
    margin-right: 0;
  }

  ${({ scrollDirection }) =>
    isPC
      ? css`
          padding: 20px;
        `
      : css`
          position: sticky;
          top: ${scrollDirection === 'down' ? FILTER_HIDE_TOP : MOBILE_HEADER_HEIGHT}px;
          height: ${ORDER_FILTER_HEADER}px;
          padding: 6px 20px 16px;
        `}
`;

export default function GiftOrderListContainer() {
  const { isReady } = useRouter();
  const dispatch = useDispatch();

  const { orders, scrollYPosition, messageTimeCheck, currentPage, monthFilter } = useAppSelector(({ mypageGift }) => ({
    orders: mypageGift.orders,
    scrollYPosition: mypageGift.scrollYPosition,
    messageTimeCheck: mypageGift.messageTimeCheck,
    currentPage: mypageGift.currentPage,
    monthFilter: mypageGift.monthFilter,
  }));

  const { scrollDirection } = useScroll({
    directionTurningPoint: SCROLL_TURNING_POINT,
    initialScrollYPosition: scrollYPosition,
  });

  const [selectedFilter, setSelectedFilter] = useState<Option>();

  useEffect(() => {
    if (scrollYPosition > 0) {
      window.scrollTo(0, scrollYPosition);
    }
  }, [scrollYPosition]);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    dispatch(setInitialStateData(initialState));
  }, [dispatch, isReady]);

  useEffect(() => {
    if (messageTimeCheck) {
      setTimeout(() => {
        dispatch(setMessageTimeCheck(false));
      }, 2000);
    }
  }, [messageTimeCheck, dispatch]);

  const handleChangeFilter = (option: Option) => {
    dispatch(setInitialStateData(initialState));
    dispatch(setCurrentFilter(option.value));

    if (monthFilter === option.value && currentPage === 1) {
      dispatch(loadGiftOrders({ merge: true }));
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const selectOption = options.find((option) => option.value === monthFilter);
    if (selectOption) {
      setSelectedFilter(selectOption);
    }

    dispatch(loadGiftOrders({ merge: true }));
  }, [currentPage, dispatch, monthFilter]);

  const handleOrderCancel = (groupOrderNo: number) => {
    dispatch(
      redirectTo({
        url: `${getPageUrl(GIFT_PATH.cancel)}${groupOrderNo}`,
      }),
    );
  };

  const handleSmsSend = (gift: GiftListItem) => {
    const { groupOrderNo, recipientName } = gift;
    dispatch(postResendMessage({ groupOrderNo, recipientName }));
    dispatch(logEventAction(new SelectMessageResendButton({ gift })));
  };

  const handlekakaoTalkSend = (gift: GiftListItem) => {
    const kakao = window.Kakao;
    const { externalGroupOrderNo, recipientName, ordererName, availableDate } = gift;

    if (kakao) {
      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_SHARE_KEY);
      }

      kakao.Link.sendCustom({
        templateId: KAKAO_GIFT_TEMPLATE_ID,
        templateArgs: {
          recipientName,
          ordererName,
          month: moment(availableDate).format('MM'),
          day: moment(availableDate).format('DD'),
          externalOrderNo: externalGroupOrderNo,
        },
        installTalk: true,
      });

      dispatch(logEventAction(new SelectMessageResendButton({ gift })));
    }
  };

  if (isUndefined(orders)) {
    return <Loading />;
  }

  return (
    <>
      <FilterContainer scrollDirection={scrollDirection}>
        {options.map((option) => (
          <DateFilterSelector
            key={option.id}
            text={option.name}
            active={selectedFilter?.value === option.value}
            onClick={() => handleChangeFilter(option)}
          />
        ))}
      </FilterContainer>
      <GiftOrderList
        handleOrderCancel={handleOrderCancel}
        handleSmsSend={handleSmsSend}
        handleKakaoTalkSend={handlekakaoTalkSend}
      />
    </>
  );
}
