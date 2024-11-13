import styled from '@emotion/styled';
import { useState } from 'react';

import { css } from '@emotion/react';

import COLOR from '../../../../../shared/constant/colorset';

import { asset10x16C999 } from '../../../../../shared/images';
import ReviewBenefitGuide from './ReviewBenefitGuide';
import { Modal } from '../ReviewModal/styled-components';
import { useReviewNotice } from '../../hooks';

const Wrapper = styled.article<{ pageType?: string }>`
  padding: ${({ pageType }) => (pageType === 'mypage' ? '22px 0 40px 3px' : '20px 0 40px')};
`;

const Title = styled.h3`
  font-size: 14px;
  line-height: 21px;
  font-weight: 500;
  color: ${COLOR.kurlyGray600};
`;

const List = styled.ul`
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${COLOR.kurlyGray600};
`;

const Item = styled.li`
  position: relative;
  padding-left: 11px;
  font-weight: 400;
  color: ${COLOR.kurlyGray450};
  :before {
    content: '';
    position: absolute;
    left: 1px;
    top: -1px;
    width: 10px;
    height: 21px;
    background: url(${asset10x16C999}) no-repeat 50% 50%;
    line-height: 21px;
  }
`;

const NoticeDetailButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  text-decoration-line: underline;
  color: ${COLOR.kurlyGray700};
  margin-top: 6px;
  margin-left: 11px;
`;

const ModalStyle = css`
  .MuiPaper-root {
    border-radius: 12px;
    max-width: 440px;
    max-height: 533px;
  }
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

  if (isLoading || !reviewBenefitsNotice) {
    return null;
  }

  const { title, contents } = reviewBenefitsNotice;

  return (
    <Wrapper pageType={pageType}>
      <Title>{title}</Title>
      <List>
        {contents.map((content, index) => (
          <Item key={`content-${index}`} dangerouslySetInnerHTML={{ __html: content }} />
        ))}
      </List>
      <NoticeDetailButton onClick={handleClickNoticeModal}>자세히 보기</NoticeDetailButton>
      <Modal open={isOpenModal} onBackdropClick={handleClickNoticeModal} css={ModalStyle}>
        <ReviewBenefitGuide onDismiss={handleClickNoticeModal} />
      </Modal>
    </Wrapper>
  );
}
