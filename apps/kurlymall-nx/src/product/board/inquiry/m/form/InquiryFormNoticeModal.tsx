import styled from '@emotion/styled';
import { Dialog, DialogActions } from '@material-ui/core';
import { css } from '@emotion/react';

import InquiryFormNoticeTerm from './InquiryFormNoticeTerm';
import COLOR from '../../../../../shared/constant/colorset';

const modalStyle = css`
  .MuiDialogContent-root {
    padding: 0;
  }
  .MuiPaper-elevation24 {
    box-shadow: none;
  }
  .MuiPaper-rounded {
    border-radius: 12px;
  }
  .MuiDialogActions-root {
    padding: 0;
  }
  .MuiDialog-paper {
    margin: 24px;
  }
`;

const Container = styled.div`
  overflow: auto;
  width: 100%;
  height: 596px;
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 56px;
`;

const Button = styled.button`
  color: ${COLOR.kurlyPurple};
  font-size: 16px;
  font-weight: 600;
  line-height: 40px;
  text-align: center;
`;

interface Props {
  open: boolean;
  onClose(): void;
}

export default function InquiryFormNoticeModal({ open, onClose }: Props) {
  return (
    <Dialog css={modalStyle} open={open}>
      <Container>
        <InquiryFormNoticeTerm />
      </Container>
      <DialogActions>
        <ButtonWrap>
          <Button type="button" onClick={onClose}>
            확인
          </Button>
        </ButtonWrap>
      </DialogActions>
    </Dialog>
  );
}
