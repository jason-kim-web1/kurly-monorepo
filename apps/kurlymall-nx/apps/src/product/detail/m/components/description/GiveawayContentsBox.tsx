import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { eventNotice } from '../../../../../../styles/product/eventNotice.css';
import { mobileBannerText } from '../../../../../../styles/product/mobileBannerText.css';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';
import { RESOURCE_URL } from '../../../../../shared/configs/config';

import COLOR from '../../../../../shared/constant/colorset';
import { ArrowDown24x24 } from '../../../../../shared/icons/ArrowDown24x24';
import { GiveawayNoticeInfo } from '../../../../../shared/icons/GiveawayNoticeInfo';

import type { ProductDetailGiveawayContentsBox } from '../../../types';

const Wrapper = styled.div`
  margin: 16px 16px 13px;
  border: 1px solid ${COLOR.kurlyGray250};

  p {
    font-size: 13px;
    font-weight: 400;
    display: flex;
    align-items: center;
    line-height: 18px;
    flex-wrap: wrap;
    word-break: break-all;
  }

  .ql-size-large {
    font-size: 16px;
    line-height: 22px;
  }

  .ql-size-small {
    font-size: 11px;
    line-height: 14px;
  }

  strong {
    font-weight: 600;
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  height: 98px;
`;

const BannerEventIcon = styled.div`
  position: absolute;
  left: -2px;
  top: -2px;
  width: 78px;
  height: 78px;
  background: url(${RESOURCE_URL}/kurly/img/2023/img_contents_box_event_mobile.svg) no-repeat 0 0;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
`;

const BannerContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin: 0px 40px;
  gap: 12px;

  div {
    overflow: hidden;
    max-width: 146px;
    max-height: 88px;

    p {
      display: block;
      width: 100%;
      height: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const BannerImage = styled.img`
  width: 96px;
  height: 96px;
`;

const ArrowButton = styled(ArrowDown24x24)<{ openContent: boolean }>`
  overflow: hidden;
  position: absolute;
  top: 40%;
  right: 16px;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
  ${({ openContent }) =>
    openContent &&
    css`
      transform: rotate(180deg);
    `}
`;

const Content = styled.div<{ openContent: boolean }>`
  display: flex;
  flex-direction: column;
  max-height: 0;
  border-top: 1px solid ${COLOR.kurlyWhite};
  opacity: 0;
  transition: border 0.3s, max-height 0.3s ease-in-out, opacity 0.5s ease-in-out;
  overflow: hidden;

  ${({ openContent }) =>
    openContent &&
    css`
      border-top: 1px solid ${COLOR.kurlyGray250};
      max-height: 9999px;
      opacity: 1;
      transition: border 0.3s, max-height 0.3s ease-in-out, opacity 0.3s ease-in-out;
    `};
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 32px 16px 0px;

  p {
    justify-content: center;
    text-align: center;
  }
`;

const MainImage = styled.img`
  margin: 16px 0 12px;
`;

const Term = styled.strong`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 1px solid ${COLOR.kurlyGray350};
  border-bottom: 1px solid ${COLOR.kurlyGray350};
  margin: 16px 0 32px;
  padding: 6px 0;
  font-size: 13px;
  line-height: 18px;
  word-break: break-all;
`;

const EventNotice = styled.div`
  background-color: ${COLOR.kurlyGray150};
  padding: 16px 15px 23px;
`;

const TitleNotice = styled.strong`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: fit-content;
  height: 24px;
  margin-bottom: 12px;
  padding-right: 8px;
  background-color: ${COLOR.kurlyGray500};
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  color: ${COLOR.kurlyWhite};
`;

const StyledGiveawayNoticeInfo = styled(GiveawayNoticeInfo)`
  margin: 0px 4px;
`;

interface Props {
  giveawayContentsBox: NonNullable<ProductDetailGiveawayContentsBox>;
}

export const GiveawayContentsBox = ({ giveawayContentsBox }: Props) => {
  const [openContent, setOpenContent] = useState(false);
  const { bannerImage, mainImage, contents, term, attention } = giveawayContentsBox;
  const { productContentsBoxBannerUrl, text: bannerText } = bannerImage;
  const { productContentsBoxMainUrl, text: mainText } = mainImage;

  const handleArrowButton = () => {
    setOpenContent((prev) => !prev);
  };

  return (
    <Wrapper>
      <Banner>
        <BannerEventIcon>Event</BannerEventIcon>
        <BannerContent>
          <BannerImage src={productContentsBoxBannerUrl} alt="배너 이미지" />
          <RawHTML css={mobileBannerText} html={bannerText} />
        </BannerContent>
        <ArrowButton type="button" openContent={openContent} onClick={handleArrowButton} />
      </Banner>
      <Content openContent={openContent}>
        <Main>
          {contents ? <RawHTML html={contents} /> : null}
          <MainImage src={productContentsBoxMainUrl} alt="본문 이미지" />
          {mainText ? <RawHTML html={mainText} /> : null}
          <Term>{`기간 : ${term}`}</Term>
        </Main>
        <EventNotice>
          <TitleNotice>
            <StyledGiveawayNoticeInfo />꼭 읽어주세요
          </TitleNotice>
          {attention ? <RawHTML css={eventNotice} html={attention} /> : null}
        </EventNotice>
      </Content>
    </Wrapper>
  );
};
