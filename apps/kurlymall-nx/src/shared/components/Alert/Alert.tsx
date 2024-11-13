import { CSSProperties, ReactNode } from 'react';
import { eq } from 'lodash';
import Swal from 'sweetalert2';
import type { SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { PopupButton, PopupContent, Popupfooter, PopupHeader } from './style';

const swal = withReactContent(Swal);

const style = `
  .swal2-html-container {
    padding: 0;
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
`;

interface Props {
  title?: string;
  text?: string;
  contents?: ReactNode;
  styles?: CSSProperties;
  contentsStyle?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  handleClickCancelButton?(): void;
  handleClickConfirmButton?(): void;
  returnFocus?: boolean;
  allowOutsideClick?: boolean;
  didOpen?: () => void;
  didClose?: () => void;
}

export default function Alert({
  title = '',
  text = '',
  styles = {},
  contentsStyle = '',
  contents = null,
  cancelButtonText = '취소',
  confirmButtonText = '확인',
  showConfirmButton = true,
  showCancelButton = false,
  handleClickCancelButton = () => {},
  handleClickConfirmButton = () => {},
  returnFocus = false,
  allowOutsideClick = true,
  didOpen = undefined,
  didClose = undefined,
}: Props) {
  const handleClickCancel = () => {
    handleClickCancelButton();
    swal.clickCancel();
  };

  const handleClickConfirm = () => {
    handleClickConfirmButton();
    swal.clickConfirm();
  };

  return swal.fire({
    html: (
      <>
        <style>
          {style}
          {contentsStyle}
        </style>
        {title && <PopupHeader className="popup-title">{title}</PopupHeader>}
        <PopupContent className="popup-content" css={styles.content} withoutTitle={!title}>
          {text}
          {contents}
        </PopupContent>
        {(showCancelButton || showConfirmButton) && (
          <Popupfooter className="popup-footer">
            {showCancelButton && (
              <PopupButton aria-label="cancel-button" onClick={handleClickCancel}>
                {cancelButtonText}
              </PopupButton>
            )}
            {showConfirmButton && (
              <PopupButton aria-label="confirm-button" weight={600} onClick={handleClickConfirm}>
                {confirmButtonText}
              </PopupButton>
            )}
          </Popupfooter>
        )}
      </>
    ),
    showClass: {
      popup: '',
    },
    showConfirmButton: false,
    returnFocus,
    allowOutsideClick,
    didOpen,
    didClose,
  });
}

export const isShown = () => swal.isVisible();

export const closeAlert = () => swal.close();

// NOTE: [확인, 취소] 가 아닌 '아무것도 선택하지 않은' 상태를 처리하기 위함
export const checkClosedByBackDrop = (reason: SweetAlertResult['dismiss']) => eq(reason, Swal.DismissReason.backdrop);
