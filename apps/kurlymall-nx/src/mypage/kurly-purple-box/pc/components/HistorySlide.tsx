import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { HISTORY_IMAGE_LIST, PC_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { HISTORY_SLIDE_TEXT } from '../../shared/constants/alternativeText';
import SwiperComponent from './SwiperComponent';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  background: #f4f1fb;
  padding-bottom: 100px;
`;

const HistoryList = styled.ul`
  overflow: hidden;
  position: absolute;
  width: 0;
  height: 0;
  z-index: -1;
`;

const styles = css`
  .swiper {
    overflow: visible;
  }
`;

export default function HistorySlide() {
  const slideImages = HISTORY_IMAGE_LIST.map((url, index) => (
    <NextImage src={url} alt={`history ${index}`} key={`history-${index}`} width={1050} height={430} />
  ));
  return (
    <Wrapper>
      <NextImage src={`${PC_PURPLE_BOX_URL}img_purplebox_17.jpg`} alt={HISTORY_SLIDE_TEXT} width={1900} height={399} />
      <SwiperComponent items={slideImages} slidesPerView={1} slidesOffsetBefore={95} css={styles} />
      <HistoryList>
        <li>2015.08 샛별박스. 현관문에 부착하는 가정용 무인 택배함</li>
        <li>2017.04 에코박스 v1. 냉동,냉장 스티로폼 박스를 냉장 박스 종이로 변경</li>
        <li>2019.01 에코박스 v2 & v3. 외부 종이, 내부 비닐 냉장박스를 재생지 냉장박스로 변경</li>
        <li>2019.09 올 페이퍼 챌린지. 모든 배송 포장재를 종이로 변경</li>
        <li>2021.05 컬리 퍼플 박스. 친환경과 편의, 신선도를 모두 갖춘 재사용 포장재</li>
      </HistoryList>
    </Wrapper>
  );
}
