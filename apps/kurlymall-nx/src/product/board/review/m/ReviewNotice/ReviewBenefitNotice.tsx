import styled from '@emotion/styled';

import { useState } from 'react';

import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';
import { Modal } from '../../pc/ReviewModal/styled-components';
import { asset10x16C999 } from '../../../../../shared/images';
import ReviewNoticeGuideContents from './ReviewNoticeGuideContents';
import { useReviewNotice } from '../../hooks';
import { isPC } from '../../../../../../util/window/getDevice';
import ReviewBenefitGuide from '../../pc/ReviewBenefits/ReviewBenefitGuide';

const ReviewBenefitNoticeWrapper = styled.div<{ pageType?: string }>`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: ${COLOR.kurlyGray800};
  border-bottom: ${({ pageType }) => (pageType === 'mypage' ? `8px solid ${COLOR.mykurlyBg}` : 'none')};
  padding: ${({ pageType }) => (pageType === 'mypage' ? '16px 20px' : '0 0 16px')};
`;

const NoticeTitle = styled.h3`
  margin-bottom: 4px;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: ${COLOR.kurlyGray800};
`;

const NoticeItem = styled.li`
  position: relative;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
  padding-left: 12px;
  :before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 10px;
    height: 16px;
    background: url(${asset10x16C999}) no-repeat 50% 50%;
    line-height: 16px;
  }
`;

const ModalStyle = css`
  .MuiPaper-root {
    border-radius: 12px;

    ${isPC
      ? css`
          max-width: 440px;
          max-height: 533px;
        `
      : css`
          max-width: 327px;
          max-height: 586px;
        `}
  }
`;

const NoticeDetailButton = styled.button`
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-decoration-line: underline;
  color: ${COLOR.kurlyGray700};
  margin-top: 4px;
  margin-left: 10px;
`;

interface Props {
  pageType?: string;
}

export default function ReviewBenefitNotice({ pageType }: Props) {
  const { reviewBenefitsNotice, isLoading } = useReviewNotice();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleClickNoticeModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const renderModal = () => {
    if (isPC) {
      return <ReviewBenefitGuide onDismiss={handleClickNoticeModal} />;
    }
    return <ReviewNoticeGuideContents onDismiss={handleClickNoticeModal} />;
  };

  if (isLoading) {
    return <ReviewBenefitNoticeWrapper pageType={pageType} css={{ minHeight: '147px' }} />;
  }

  if (!reviewBenefitsNotice) {
    return null;
  }

  const { title, contents } = reviewBenefitsNotice;

  return (
    <ReviewBenefitNoticeWrapper pageType={pageType}>
      {title && <NoticeTitle>{title}</NoticeTitle>}
      <ul>
        {contents.map((content, index) => (
          <NoticeItem key={`content-${index}`} dangerouslySetInnerHTML={{ __html: content }} />
        ))}
      </ul>
      <NoticeDetailButton onClick={handleClickNoticeModal}>자세히 보기</NoticeDetailButton>
      <Modal open={isOpenModal} onBackdropClick={handleClickNoticeModal} css={ModalStyle}>
        {renderModal()}
      </Modal>
    </ReviewBenefitNoticeWrapper>
  );
}
