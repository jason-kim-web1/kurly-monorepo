import styled from '@emotion/styled';

import { css } from '@emotion/react';

import Modal from '@material-ui/core/Modal';

import { Slide } from '@material-ui/core';

import { useEffect, useState } from 'react';

import CloseButton from '../../../../../shared/components/Button/CloseButton';
import RawHTML from '../../../../../shared/components/layouts/RawHTML';
import { PersonalInquiryListItem } from '../../types';
import InquiryQnaNotice from './InquiryQnaNotice';
import COLOR from '../../../../../shared/constant/colorset';

const Header = styled.div`
  height: 44px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const closeButtonStyle = css`
  position: absolute;
  left: 5px;
`;

const HeaderText = styled.span`
  font-size: 16px;
  font-weight: 600;
`;

const Body = styled.div`
  background-color: #fafafa;
  height: calc(100vh - 44px);
  overflow-y: scroll;
  padding-bottom: 100px;
`;

const NoticeTitle = styled.div`
  background-color: ${COLOR.kurlyWhite};
`;

const Contents = styled.div`
  padding: 20px 20px;
  p {
    word-break: break-all;
  }
`;

interface Props {
  open: boolean;
  onClose(): void;
  item?: PersonalInquiryListItem;
}

export default function PersonalInquiryNoticeModal({ onClose, open, item }: Props) {
  const [prevScrollPosition, setPrevScrollPosition] = useState(0);

  const cleanUpBodyStyle = () => {
    document.body.style.removeProperty('position');
    window.scrollTo({ top: prevScrollPosition });
  };

  // safari 에서 모달이 스크롤 될 경우 background 도 같이 스크롤 되는 이슈로 모달 열리면 position fixed 처리
  useEffect(() => {
    setPrevScrollPosition(window.pageYOffset);

    if (open) {
      document.body.style.position = 'fixed';
      return;
    }

    cleanUpBodyStyle();
  }, [open]);

  useEffect(() => {
    return () => {
      cleanUpBodyStyle();
    };
  }, []);

  if (!item || !open) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="select-modal-title"
      aria-describedby="select-modal-description"
      BackdropProps={{
        style: {
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      }}
    >
      <Slide in={open} direction="left">
        <div>
          <Header>
            <CloseButton onClick={onClose} css={closeButtonStyle} />
            <HeaderText>공지</HeaderText>
          </Header>
          <Body>
            <NoticeTitle>
              <InquiryQnaNotice title={item.title} contents={item.contents} expanded={item.expanded} displayOverflow />
            </NoticeTitle>
            <Contents>
              <RawHTML html={item.contents} />
            </Contents>
          </Body>
        </div>
      </Slide>
    </Modal>
  );
}
