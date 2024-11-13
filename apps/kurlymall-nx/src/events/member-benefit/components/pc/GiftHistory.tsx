import styled from '@emotion/styled';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';

import Link from 'next/link';

import { useState } from 'react';

import { css } from '@emotion/react';

import { Swiper as SwiperClass } from 'swiper/types';

import { GiftHistoryList } from '../../../../shared/api/events/member/benefit.api';
import { PRODUCT_PATH } from '../../../../shared/constant';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import { ArrowRight } from '../../../../shared/icons';
import useGiftHistoryStatus from '../../hooks/useGiftHistoryStatus';

const Container = styled.div`
  margin-bottom: 90px;
  padding: 90px 0;
  background-color: ${COLOR.bg};
`;

const InnerWrap = styled.div`
  width: 810px;
  margin: 0 auto;
  letter-spacing: -0.5px;
`;

const HistoryTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-weight: 300;
  font-size: 14px;
  color: ${COLOR.kurlyGray450};
`;

const HistoryTitle = styled.h4`
  font-weight: 500;
  font-size: 16px;
  color: ${COLOR.kurlyPurple};
`;

const HistoryInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.35px;
  color: ${COLOR.kurlyWhite};

  .history-text {
    display: block;
    height: 100%;
    padding: 10px;
  }
`;

const DateText = styled.div`
  margin-bottom: 5px;
  font-weight: 500;
`;

const ArrowIconWrap = styled.div`
  position: absolute;
  right: 13px;
  bottom: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 100%;
  background-color: ${COLOR.kurlyGray250};
`;

const ThumbImage = styled.div`
  position: relative;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    content: '';
  }
`;

const SwiperWrap = styled.div`
  position: relative;
  margin-bottom: 40px;

  .swiper {
    width: 780px;
    height: 220px;
    margin-left: 30px;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 30px;
  background-color: ${COLOR.gradeToolTipBorder};

  > svg {
    vertical-align: middle;
  }
  &:last-of-type {
    left: auto;
    right: 0;
  }
`;

const prevArrowStyle = css`
  transform: rotate(180deg);
`;

const NoticeWrap = styled.div`
  display: flex;
  padding-top: 25px;
  border-top: 1px solid ${COLOR.kurlyGray400};
  font-size: 13px;
  line-height: 23px;
`;

const NoticeTitle = styled.strong`
  width: 140px;
  font-weight: 500;
  letter-spacing: -0.5px;
  color: ${COLOR.kurlyGray600};
`;

const NoticeItem = styled.li`
  position: relative;
  padding-left: 7px;
  font-weight: 300;
  color: ${COLOR.kurlyGray450};

  &::before {
    position: absolute;
    top: 11px;
    left: 0;
    width: 3px;
    height: 3px;
    border-radius: 100%;
    background-color: ${COLOR.kurlyGray400};
    content: '';
  }
`;

interface Props {
  giftHistory: GiftHistoryList[];
  currentMonthGift: string;
}

export default function GiftHistory({ giftHistory, currentMonthGift }: Props) {
  const [swiper, setSwiper] = useState<SwiperClass>();

  const { firstHistoryDate, lastHistoryDate, nextMonth, prevMonth, currentMonth } = useGiftHistoryStatus(giftHistory);

  const handleClickSwiperPrev = () => {
    swiper?.slidePrev();
  };

  const handleClickSwiperNext = () => {
    swiper?.slideNext();
  };

  const giftHistoryItemRender = (id: string, name: string, goodsNo: number) => {
    if (goodsNo !== 0) {
      const goodsUrl = `${PRODUCT_PATH.detail.uri}/${goodsNo}`;

      return (
        <Link href={goodsUrl} passHref>
          <a href={goodsUrl} className="history-text">
            <DateText>{id}</DateText>
            <RawHTML html={name} />
            <ArrowIconWrap>
              <ArrowRight width={28} height={28} stroke={COLOR.kurlyGray900} />
            </ArrowIconWrap>
          </a>
        </Link>
      );
    }

    return (
      <div className="history-text">
        <DateText>{id}</DateText>
        <RawHTML html={name} />
      </div>
    );
  };

  return (
    <Container>
      <InnerWrap>
        <HistoryTitleWrap>
          <HistoryTitle>Gift History</HistoryTitle>
          {`${lastHistoryDate} - ${firstHistoryDate}`}
        </HistoryTitleWrap>
        <SwiperWrap>
          <Swiper onSwiper={setSwiper} slidesPerView={6}>
            {giftHistory.map(({ id, name, thumbImgPC, goodsNo }) => (
              <SwiperSlide key={id}>
                <HistoryInfo>{giftHistoryItemRender(id, name, goodsNo)}</HistoryInfo>
                <ThumbImage>
                  <NextImage src={thumbImgPC} width={130} height={220} alt="상품 이미지" />
                </ThumbImage>
              </SwiperSlide>
            ))}
          </Swiper>
          <NavButton onClick={handleClickSwiperPrev}>
            <ScreenOut>이전</ScreenOut>
            <ArrowRight css={prevArrowStyle} width={28} height={28} stroke={COLOR.kurlyGray450} />
          </NavButton>
          <NavButton onClick={handleClickSwiperNext}>
            <ScreenOut>다음</ScreenOut>
            <ArrowRight width={28} height={28} stroke={COLOR.kurlyGray450} />
          </NavButton>
        </SwiperWrap>
        <NoticeWrap>
          <NoticeTitle>더퍼플 선물 안내</NoticeTitle>
          <ul>
            <NoticeItem>
              {currentMonth}월 실적을 기준으로 {nextMonth}월 더퍼플 등급 적용 후 {nextMonth}월 3주차 이내에 안내
              메시지가 발송됩니다.
            </NoticeItem>
            <NoticeItem>
              {prevMonth}월 실적을 기준으로 {currentMonth}월 더퍼플에 선정되신 고객분께는 {currentMonthGift}’를/을
              보내드립니다.
            </NoticeItem>
            <NoticeItem>선물은 매달 변경되며, 상품 및 구성품 변경 또는 적립금으로의 대체는 불가능합니다.</NoticeItem>
          </ul>
        </NoticeWrap>
      </InnerWrap>
    </Container>
  );
}
