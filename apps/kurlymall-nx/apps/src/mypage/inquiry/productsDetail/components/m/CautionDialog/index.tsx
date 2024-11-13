import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ModalProps } from '@mui/material/Modal';

import { CAUTION_CONTENT } from '../../../constants';
import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    padding: '0',
    minWidth: '87vw',
    minHeight: '95%',
    borderRadius: '12px',
  },
  '& .MuiDialogActions-root': {
    padding: '8px',
  },
}));

const CautionContainer = styled.div`
  > .row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
    > .title-text {
      font-size: 18px;
      font-weight: 700;
      line-height: 23px;
      color: ${COLOR.kurlyGray800};
      margin-bottom: 16px;
    }
    > .description-list {
      > li {
        padding-left: 12px;
        line-height: 20px;
        font-size: 15px;
        font-weight: 400;
        margin-bottom: 8px;
        color: ${COLOR.kurlyGray600};
        &:last-child {
          margin-bottom: 0;
        }
        &::before {
          overflow: hidden;
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: ${COLOR.kurlyGray600};
          margin: 7px 8px 0 -11px;
          content: '';
          vertical-align: top;
        }
      }
    }
    > .caution-text {
      padding: 8px 0 0 16px;
      font-size: 15px;
      font-weight: 400;
      line-height: 20px;
      color: ${COLOR.invalidRed};
      &::before {
        margin: 0 4px 0 -16px;
        content: '\\203B';
      }
    }
  }
`;

const TextButton = styled.button`
  width: 67px;
  border: 0;
  background: 0;
  color: ${COLOR.kurlyPurple};
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
`;

interface Props {
  open: boolean;
  onClose(): void;
}

const CautionDialog = (props: Props) => {
  const { open, onClose } = props;
  const handleClose: ModalProps['onClose'] = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    return onClose();
  };
  return (
    <Container open={open} onClose={handleClose} disableEscapeKeyDown scroll="paper">
      <DialogContent>
        <CautionContainer>
          {CAUTION_CONTENT.map((dataItem, dataIndex) => {
            const { title, descriptions, cautionText } = dataItem;
            return (
              <div key={dataIndex} className="row">
                <p className="title-text">{title}</p>
                <ul className="description-list">
                  {descriptions.map((descriptionItem, descriptionIndex) => (
                    <li key={descriptionIndex}>{descriptionItem}</li>
                  ))}
                </ul>
                {cautionText ? <p className="caution-text">{cautionText}</p> : null}
              </div>
            );
          })}
        </CautionContainer>
      </DialogContent>
      <DialogActions>
        <TextButton type="button" onClick={onClose}>
          확인
        </TextButton>
      </DialogActions>
    </Container>
  );
};

export default CautionDialog;
