import styled from '@emotion/styled';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { ReactNode } from 'react';

import COLOR from '../../constant/colorset';
import Button from '../Button/Button';

const swal = withReactContent(Swal);

export const defaultSwalStyle = `
  .swal2-html-container {
    padding: 24px 20px 0;
  }

  .swal2-container {
    padding: 0 24px;
  }

  .swal2-popup {
    max-width: 360px;
    border-radius: 12px;
    padding: 0;
  }

  .swal2-content {
    padding: 0;
  }

  .swal2-show {
    animation: none;
  }
`;

const defaultButtonStyle = `
  .action-button {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 42px;
    border-radius: 3px;

    > span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
`;

const Text = styled.div`
  text-align: center;
  letter-spacing: -0.3px;
  padding: 16px 0 10px;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
  white-space: pre-wrap;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 20px;
  padding-bottom: 20px;
  gap: 8px;
`;

interface Props {
  text?: string;
  contents?: ReactNode;
  swalStyle?: string;
  buttonStyle?: string;
  showLeftButton?: boolean;
  leftButtonText?: string;
  showRightButton?: boolean;
  rightButtonText?: string;
  onClickLeftButton?(): void;
  onClickRightButton?(): void;
  returnFocus?: boolean;
  allowOutsideClick?: boolean;
}

export const isShown = () => swal.isVisible();

export const closeConfirm = () => swal.close();

export const clickConfirm = () => swal.clickConfirm();

export default function Confirm({
  text = '',
  contents = null,
  swalStyle = defaultSwalStyle,
  buttonStyle = defaultButtonStyle,
  showLeftButton = true,
  leftButtonText = '',
  showRightButton = false,
  rightButtonText = '',
  onClickLeftButton = () => closeConfirm(),
  onClickRightButton = () => clickConfirm(),
  returnFocus = true,
  allowOutsideClick = true,
}: Props) {
  return swal.fire({
    html: (
      <>
        <style>
          {swalStyle}
          {buttonStyle}
        </style>
        {text && <Text>{text}</Text>}
        {contents}
        {(showLeftButton || showRightButton) && (
          <ButtonWrapper>
            {showLeftButton && (
              <Button className="action-button" text={leftButtonText} theme="tertiary" onClick={onClickLeftButton} />
            )}
            {showRightButton && (
              <Button className="action-button" text={rightButtonText} onClick={onClickRightButton} />
            )}
          </ButtonWrapper>
        )}
      </>
    ),
    showConfirmButton: false,
    returnFocus,
    allowOutsideClick,
  });
}
