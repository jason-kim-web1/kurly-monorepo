import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { eventNotice } from '../../../../../../styles/product/eventNotice.css';
import { pcBannerText } from '../../../../../../styles/product/pcBannerText.css';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';
import { RESOURCE_URL } from '../../../../../shared/configs/config';

import COLOR from '../../../../../shared/constant/colorset';
import { ArrowDown24x24 } from '../../../../../shared/icons/ArrowDown24x24';
import { GiveawayNoticeInfo } from '../../../../../shared/icons/GiveawayNoticeInfo';

import type { ProductDetailGiveawayContentsBox } from '../../../types';

const Wrapper = styled.div`
  border: 1px solid ${COLOR.kurlyGray250};
  width: 802px;
  margin: 0 auto 120px;

  p {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    word-break: break-all;
  }

  .ql-size-large {
    font-size: 24px;
    line-height: 34px;
  }

  .ql-size-small {
    font-size: 14px;
    line-height: 20px;
  }

  strong {
    font-weight: 500;
  }
`;

const Banner = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  height: 160px;
`;

const BannerEventIcon = styled.div`
  position: absolute;
  left: -2px;
  top: -2px;
  width: 114px;
  height: 114px;
  background: url(${RESOURCE_URL}/kurly/img/2023/img_contents_box_event_pc.svg) no-repeat 0 0;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
`;

const BannerContent = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 24px;

  div {
    overflow: hidden;
    width: 378px;
    max-height: 102px;
    p {
      display: block;
      width: 100%;
      height: 34px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;

const BannerImage = styled.img`
  width: 158px;
  height: 158px;
`;

const ArrowButton = styled(ArrowDown24x24)<{ openContent: boolean }>`
  overflow: hidden;
  position: absolute;
  top: 43%;
  right: 7%;
  font-size: 0;
  line-height: 0;
  text-indent: -9999px;
  cursor: pointer;

  ${({ openContent }) =>
    openContent &&
    css`
      transform: rotate(180deg);
    `}
`;

const Content = styled.div<{ openContent: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  border-top: 1px solid ${COLOR.kurlyWhite};
  opacity: 0;
  transition: border 0.3s, max-height 0.3s ease-in-out, opacity 0.5s ease-in-out;

  strong {
    font-weight: 600;
  }

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
  padding: 48px 64px 0px;

  strong {
    font-weight: 600;
  }

  p {
    justify-content: center;
    text-align: center;
  }
`;

const MainImage = styled.img`
  margin: 24px 0 16px;
`;

const Term = styled.strong`
  display: flex;
  justify-content: center;
  width: 100%;
  border-top: 1px solid ${COLOR.kurlyGray350};
  border-bottom: 1px solid ${COLOR.kurlyGray350};
  margin: 24px 0 48px;
  padding: 8px 0;
  font-size: 18px;
  line-height: 24px;
  word-break: break-all;
`;

const EventNotice = styled.div`
  background-color: ${COLOR.kurlyGray150};
  padding: 32px 64px 38px;
`;

const TitleNotice = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: fit-content;
  height: 32px;
  margin-bottom: 16px;
  padding-right: 12px;
  background-color: ${COLOR.kurlyGray500};
  border-radius: 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  color: ${COLOR.kurlyWhite};
`;

const StyledGiveawayNoticeInfo = styled(GiveawayNoticeInfo)`
  margin: 0px 6px 0px 8px;
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
          <RawHTML css={pcBannerText} html={bannerText} />
        </BannerContent>
        <ArrowButton openContent={openContent} onClick={handleArrowButton} />
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
