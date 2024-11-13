import { ReactNode } from 'react';
import Swal from 'sweetalert2';

import withReactContent from 'sweetalert2-react-content';

import Button from '../Button/Button';

import SlideModalHeader from '../modal/SlideModalHeader';
import { ButtonFooterWrapper } from './style';

const swal = withReactContent(Swal);

const style = `
  .swal2-html-container {
    padding: 0;
  }

  .swal2-container {
    padding: 0;
  }

  .swal2-popup {
    border-radius: 0;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 0 12px;

    transform: translateY(100%);
  }

  .swal2-content {
    padding: 0;
    white-space: pre-line;
  }

  .swal2-show {
    animation: none;

    transform: translateY(0);
    transition: transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms;
  }

  @keyframes swal2-hide {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(100%);
      opacity: 0;
    }
  }

  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: constant(safe-area-inset-bottom);
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

interface Props {
  headerBar?: boolean;
  contents?: ReactNode;
  contentsStyle?: string;
  allowOutsideClick?: boolean;
  handleClickConfirmButton?(): void;
  cancelButtonText?: string;
  confirmButtonText?: string;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
  didOpen?: () => void;
  didClose?: () => void;
}

export default function BottomSheet({
  headerBar = true,
  contents = null,
  contentsStyle = undefined,
  allowOutsideClick = true,
  handleClickConfirmButton = () => {},
  cancelButtonText = '취소',
  confirmButtonText = '확인',
  showCancelButton = false,
  showConfirmButton = true,
  didOpen = undefined,
  didClose = undefined,
}: Props) {
  const handleClickCancel = () => {
    swal.clickCancel();
  };

  const handleClickConfirm = () => {
    handleClickConfirmButton();
    swal.clickConfirm();
  };

  return swal.fire({
    position: 'bottom',
    grow: 'row',
    html: (
      <>
        <style>
          {style}
          {contentsStyle}
        </style>
        {headerBar && <SlideModalHeader onClose={handleClickCancel} />}
        {contents}
        <ButtonFooterWrapper>
          {showCancelButton && (
            <Button text={cancelButtonText} theme="tertiary" onClick={handleClickCancel} radius={6} />
          )}
          {showConfirmButton && <Button text={confirmButtonText} onClick={handleClickConfirm} radius={6} />}
        </ButtonFooterWrapper>
      </>
    ),
    allowOutsideClick,
    showConfirmButton: false,
    showCloseButton: false,
    didOpen,
    didClose,
  });
}
