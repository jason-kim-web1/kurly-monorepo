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
  FRIEND_SHARE_IMAGE_PC,
  FRIEND_SHARE_LINK_URL,
  FriendShareType,
} from '../../constants';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import useFriendBenefitShare from '../../hooks/useFriendBenefitShare';
import { isProduction } from '../../../../shared/configs/config';

const Container = styled.div`
  width: 780px;
  margin: 0 auto;
  padding: 90px 0 105px;
  background-color: ${COLOR.bgLightGray};
`;

const ImageBox = styled.div`
  position: relative;
  width: 480px;
  height: 490px;
  margin: 0 auto;
`;

const ShareBox = styled.div`
  position: relative;
  width: 520px;
  height: 364px;
  margin: 0 auto 53px;
`;

const ShareButton = styled.button`
  position: absolute;
  top: 15px;
  left: 19px;
  width: 480px;
  height: 72px;

  &:nth-of-type(2) {
    top: 107px;
  }

  &:nth-of-type(3) {
    top: 268px;
    left: 224px;
    width: 70px;
    height: 67px;
  }
`;

const URLInput = styled.input`
  position: absolute;
  left: -9999px;
`;

const NoticeBox = styled.div`
  display: flex;
  width: 630px;
  margin: 0 auto;
  padding-top: 30px;
  border-top: 1px solid ${COLOR.kurlyGray350};
  line-height: 1.3;
  letter-spacing: -0.5px;
`;

const NoticeTitle = styled.strong`
  min-width: 110px;
  font-weight: 500;
`;

const NoticeItem = styled.li`
  position: relative;
  margin-bottom: 13px;
  padding-left: 10px;
  font-size: 14px;
  word-break: keep-all;

  strong {
    display: block;
    margin-bottom: 5px;
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
    top: 7px;
    left: 0;
    width: 3px;
    height: 3px;
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
    imgUrlPC,
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
        <NextImage src={imgUrlPC} layout="fill" objectFit="cover" alt={description} />
      </ImageBox>
      <ShareBox>
        <NextImage src={FRIEND_SHARE_IMAGE_PC} width={520} height={364} alt="이벤트 공유하기" />
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
        <ul>
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
        </ul>
      </NoticeBox>
    </Container>
  );
}
