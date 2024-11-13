import styled from '@emotion/styled';

import { css } from '@emotion/react';
import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import COLOR from '../../../../shared/constant/colorset';
import { isPC } from '../../../../../util/window/getDevice';
import { HYUNDAI_POINT_DIALOG_SUBJECT, HYUNDAI_POINT_DIALOG_TITLE } from '../constants/hyundai-point-message';
import Button from '../../../../shared/components/Button/Button';

const Header = styled.div<{ isPc: boolean }>`
  font-weight: ${({ isPc }) => (isPc ? 500 : 600)};
  color: ${COLOR.kurlyGray800};
  font-size: 18px;
  margin-bottom: ${({ isPc }) => (isPc ? '24px' : '16px')};
`;

const Content = styled.p<{ isPc: boolean }>`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 400;
  letter-spacing: ${({ isPc }) => (isPc ? '-0.5px' : 0)};
  line-height: 21px;

  > span {
    display: flex;
    margin-bottom: 2px;
    white-space: pre-line;
  }

  span::before {
    display: block;
    content: '';
    background-color: ${COLOR.kurlyGray350};
    border-radius: 50%;
    min-width: 3px;
    height: 3px;
    margin-right: 8px;
    margin-top: 9px;
  }
`;

const dialogStyle = (isPc: boolean) => css`
  .MuiPaper-root {
    border-radius: 12px;
    box-shadow: none !important;
    ${isPc
      ? `
      width: 360px;
      margin: 0;
    `
      : `
      width: calc(100% - 48px);
      max-height: 549px;
      margin: 0 20px;
    `}
  }
`;

const dialogContentStyle = (isPc: boolean) => css`
  &.MuiDialogContent-root {
    padding: ${isPc ? '30px' : '24px 24px 16px 24px'} !important;
  }
`;

const dialogActionsStyle = (isPc: boolean) => css`
  &.MuiDialogActions-root {
    border-top: ${isPc ? '1px solid #f7f7f7' : ''};
    padding: ${isPc ? '18px 30px' : '8px 10px'};
  }
`;

const buttonStyle = (isPc: boolean) => css`
  border: 0;
  font-weight: 600;
  ${isPc
    ? `
    width: 300px;
    height: 21px;
    `
    : `
    display:inline-block;
    width: 60px;
    height: 38px;`}
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function HyundaiPointInfoDialog({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} css={dialogStyle(isPC)}>
      <DialogContent css={dialogContentStyle(isPC)}>
        <Header isPc={isPC}>{HYUNDAI_POINT_DIALOG_TITLE}</Header>
        <Content isPc={isPC}>
          {HYUNDAI_POINT_DIALOG_SUBJECT.map((text) => (
            <span key={text}>{text}</span>
          ))}
        </Content>
      </DialogContent>
      <DialogActions css={dialogActionsStyle(isPC)}>
        <Button text="확인" theme="secondary" height={56} css={buttonStyle(isPC)} onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
}
