import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { Dialog, DialogActions, DialogContent } from '@material-ui/core';

import Button from '../../../../shared/components/Button/Button';
import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

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

const Header = styled.div<{ isPc: boolean }>`
  font-weight: ${({ isPc }) => (isPc ? 500 : 600)};
  color: ${COLOR.kurlyGray800};
  font-size: 18px;
  margin-bottom: ${({ isPc }) => (isPc ? '24px' : '16px')};
`;

const Content = styled.p<{ isPc: boolean }>`
  color: ${COLOR.kurlyGray800};
  font-size: 16px;
  letter-spacing: ${({ isPc }) => (isPc ? '-0.5px' : 0)};
  line-height: 21px;

  > span {
    display: flex;
    margin-bottom: 8px;
  }

  span::before {
    display: block;
    content: '';
    background-color: ${COLOR.kurlyGray600};
    border-radius: 50%;
    min-width: 3px;
    height: 3px;
    margin-right: 8px;
    margin-top: 9px;
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PointInformationPopup = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} css={dialogStyle(isPC)}>
      <DialogContent css={dialogContentStyle(isPC)}>
        <Header isPc={isPC}>적립금 · 컬리캐시 안내</Header>
        <Content isPc={isPC}>
          <span>컬리캐시는 컬리 상품권으로 전환된 충전형 결제수단 입니다.</span>
          <span>구매 시 적립 받은 적립금과 컬리캐시의 총 합산 잔액입니다.</span>
          <span>
            사용 시 적립금이 먼저 소진되며 컬리캐시 잔액을 포함하는 경우 컬리페이 결제수단으로만 결제가 가능합니다.
          </span>
        </Content>
      </DialogContent>
      <DialogActions css={dialogActionsStyle(isPC)}>
        <Button text="확인" theme="secondary" height={56} css={buttonStyle(isPC)} onClick={onClose} />
      </DialogActions>
    </Dialog>
  );
};

export default PointInformationPopup;
