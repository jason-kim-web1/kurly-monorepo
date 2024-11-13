import styled from '@emotion/styled';
import { useMemo } from 'react';

import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { FriendBenefitInfo } from '../../../../shared/api/events/member/benefit.api';
import ScreenOut from '../../../../shared/components/Pagination/ScreenOut';
import {
  FRIEND_DEFAULT_NOTICE,
  FRIEND_NOTICE_POINT_INFO,
  FRIEND_NOTICE_POINT_VALID,
  FRIEND_SHARE_BUTTON_TEXT,
  FRIEND_SHARE_IMAGE_MO,
  FRIEND_SHARE_LINK_URL,
  FriendShareType,
} from '../../constants';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import useFriendBenefitShare from '../../hooks/useFriendBenefitShare';
import { isProduction } from '../../../../shared/configs/config';

const Container = styled.div`
  background-color: ${COLOR.kurlyGray200};
  margin-bottom: -8px;
  padding-bottom: 10vw;
`;

const ImageBox = styled.div`
  position: relative;
  height: 107.6vw;
  margin: 0 auto;
`;

const ShareBox = styled.div`
  position: relative;
  height: 77.3vw;
`;

const ShareButton = styled.button`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 6%;
  right: 6%;
  height: 15vw;

  &:nth-of-type(2) {
    top: 24%;
  }

  &:nth-of-type(3) {
    top: 65%;
    left: 43%;
    width: 13.5vw;
    height: 13vw;
  }
`;

const URLInput = styled.input`
  position: absolute;
  left: -9999px;
`;

const NoticeBox = styled.div`
  margin: 0 6vw;
  border-top: 1px solid ${COLOR.kurlyGray350};
  font-size: 3vw;
  line-height: 1.3;
  letter-spacing: -0.5px;
`;

const NoticeTitle = styled.strong`
  display: block;
  padding: 4.5vw 4vw;
  font-weight: 500;
  font-size: 3.2vw;
`;

const NoticeList = styled.ul`
  padding-left: 2vw;
`;

const NoticeItem = styled.li`
  position: relative;
  margin-bottom: 3vw;
  padding-left: 2vw;
  word-break: keep-all;

  strong {
    display: block;
    font-weight: 400;
    margin-bottom: 1vw;
  }

  p {
    margin-bottom: 3px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  .underline {
    text-decoration: underline;
  }

  &::before {
    position: absolute;
    top: 1.5vw;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 100%;
    background-color: ${COLOR.kurlyGray800};
    content: '';
  }
`;

interface Props {
  isDefaultEvent: boolean;
  friendBenefitInfo: FriendBenefitInfo;
}

export default function FriendBenefit({ isDefaultEvent, friendBenefitInfo }: Props) {
  const {
    title,
    description,
    imgUrlMobile,
    kakaoTemplateId: kakaoTemplateIdObj,
    addNotice,
    joinBenefitUrl,
    shareEventUrl,
  } = friendBenefitInfo;

  const { joinInputRef, eventInputRef, handleClickKaKaoShare, handleClickLinkShare } = useFriendBenefitShare();

  const kakaoTemplateId = useMemo(() => kakaoTemplateIdObj[isProduction() ? 'prod' : 'dev'], [kakaoTemplateIdObj]);

  return (
    <Container>
      <ScreenOut>
        <h2>{title}</h2>
      </ScreenOut>
      <ImageBox>
        <NextImage src={imgUrlMobile} layout="fill" objectFit="cover" alt={description} />
      </ImageBox>
      <ShareBox>
        <NextImage src={FRIEND_SHARE_IMAGE_MO} layout="fill" objectFit="cover" alt="이벤트 공유하기" />
        <ShareButton onClick={() => handleClickKaKaoShare(kakaoTemplateId)}>
          <ScreenOut>{FRIEND_SHARE_BUTTON_TEXT[FriendShareType.Kakao]}</ScreenOut>
        </ShareButton>
        <ShareButton onClick={() => handleClickLinkShare(joinInputRef)}>
          <ScreenOut>{FRIEND_SHARE_BUTTON_TEXT[FriendShareType.Join]}</ScreenOut>
          <URLInput readOnly ref={joinInputRef} type="text" value={joinBenefitUrl} />
        </ShareButton>
        <ShareButton onClick={() => handleClickLinkShare(eventInputRef)}>
          <ScreenOut>{FRIEND_SHARE_BUTTON_TEXT[FriendShareType.Event]}</ScreenOut>
          <URLInput readOnly ref={eventInputRef} type="text" value={shareEventUrl || FRIEND_SHARE_LINK_URL} />
        </ShareButton>
      </ShareBox>
      <NoticeBox>
        <NoticeTitle>유의사항</NoticeTitle>
        <NoticeList>
          {isDefaultEvent && (
            <NoticeItem>
              <RawHTML html={FRIEND_NOTICE_POINT_INFO} />
            </NoticeItem>
          )}
          <NoticeItem>
            <RawHTML html={FRIEND_NOTICE_POINT_VALID} />
          </NoticeItem>
          {!isDefaultEvent && // 더블적립 이벤트 기간일 때
            addNotice.map(({ text }, index) => (
              <NoticeItem key={`add-notice-${index}`}>
                <RawHTML html={text} />
              </NoticeItem>
            ))}
          {FRIEND_DEFAULT_NOTICE.map((text, index) => (
            <NoticeItem key={`notice-${index}`}>{text}</NoticeItem>
          ))}
        </NoticeList>
      </NoticeBox>
    </Container>
  );
}
