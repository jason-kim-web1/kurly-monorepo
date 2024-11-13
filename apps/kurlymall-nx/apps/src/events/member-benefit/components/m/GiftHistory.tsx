import styled from '@emotion/styled';

import Link from 'next/link';

import { GiftHistoryList } from '../../../../shared/api/events/member/benefit.api';
import { PRODUCT_PATH } from '../../../../shared/constant';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { ArrowRight } from '../../../../shared/icons';
import useGiftHistoryStatus from '../../hooks/useGiftHistoryStatus';

const Container = styled.div`
  padding: 40px 0 13px;
  background-color: #171717;
`;

const HistoryTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px 10px;
  font-size: 12px;
  color: ${COLOR.kurlyGray450};
`;

const HistoryTitle = styled.h4`
  font-weight: 500;
  font-size: 14px;
  color: #ba99e1;
`;

const HistoryInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  font-weight: 300;
  color: ${COLOR.kurlyWhite};

  .history-text {
    display: block;
    height: 100%;
    padding: 20px 8px;
    font-size: 12px;
    line-height: 1.4;
    word-break: keep-all;
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

const SlideWrap = styled.div`
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  white-space: nowrap;
  padding-left: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideItem = styled.div`
  scroll-snap-align: center;
  display: inline-block;
  position: relative;
  width: 29%;

  &:last-of-type {
    margin-right: 20px;
  }
`;

const ThumbImage = styled.div`
  position: relative;
  height: 52vw;

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

const NoticeWrap = styled.div`
  margin: 45px 20px 50px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: -0.3px;
  color: ${COLOR.kurlyGray450};
`;

const NoticeTitle = styled.strong`
  display: block;
  width: 140px;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 13px;
`;

const NoticeItem = styled.li`
  position: relative;
  padding-left: 7px;
  font-weight: 400;
  font-size: 12px;
  line-height: 1.7;

  &::before {
    position: absolute;
    top: 9px;
    left: 0;
    width: 2px;
    height: 2px;
    background-color: ${COLOR.kurlyGray400};
    content: '';
  }
`;

interface Props {
  giftHistory: GiftHistoryList[];
  currentMonthGift: string;
}

export default function GiftHistory({ giftHistory, currentMonthGift }: Props) {
  const { firstHistoryDate, lastHistoryDate, nextMonth, prevMonth, currentMonth } = useGiftHistoryStatus(giftHistory);

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
      <HistoryTitleWrap>
        <HistoryTitle>Gift History</HistoryTitle>
        {`${lastHistoryDate} - ${firstHistoryDate}`}
      </HistoryTitleWrap>
      <SlideWrap>
        {giftHistory.map(({ id, name, thumbImgMobile, goodsNo }) => (
          <SlideItem key={id}>
            <HistoryInfo>{giftHistoryItemRender(id, name, goodsNo)}</HistoryInfo>
            <ThumbImage>
              <NextImage src={thumbImgMobile} layout="fill" objectFit="cover" alt="상품 이미지" />
            </ThumbImage>
          </SlideItem>
        ))}
      </SlideWrap>
      <NoticeWrap>
        <NoticeTitle>더퍼플 선물 안내</NoticeTitle>
        <ul>
          <NoticeItem>
            {currentMonth}월 실적을 기준으로 {nextMonth}월 더퍼플 등급 적용 후 {nextMonth}월 3주차 이내에 안내 메시지가
            발송됩니다.
          </NoticeItem>
          <NoticeItem>
            {prevMonth}월 실적을 기준으로 {currentMonth}월 더퍼플에 선정되신 고객분께는 ’{currentMonthGift}’를/을
            보내드립니다.
          </NoticeItem>
          <NoticeItem>선물은 매달 변경되며, 상품 및 구성품 변경 또는 적립금으로의 대체는 불가능합니다.</NoticeItem>
        </ul>
      </NoticeWrap>
    </Container>
  );
}
