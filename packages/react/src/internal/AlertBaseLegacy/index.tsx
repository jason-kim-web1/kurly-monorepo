import { MouseEvent, PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import clsx from 'clsx';
import { AlertStyles, vars } from '@thefarmersfront/kpds-css';
import { Button } from '@/components/Button';
import { Typography } from '@/components/Typography';
import {
  AlertBaseProps,
  AlertButtonProps,
  AlertButtonWrapperProps,
  AlertContentsProps,
  AlertTitleProps,
  BUTTON_LAYOUT,
} from '@/internal/AlertBaseLegacy/interface';
import { TextButton } from '@/components/TextButton';

const ALERT_CONTAINER_ID = 'kpds-alert-container';

const DISMISS = {
  BACKDROP: 'backdrop',
  CANCEL: 'cancel',
} as const;

type Dismiss = (typeof DISMISS)[keyof typeof DISMISS];

/**
 * KPDS Alert이 화면에 노출중인지 확인
 */
const isShownAlert = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const alertContainer = document.getElementById(ALERT_CONTAINER_ID);

  return alertContainer !== null;
};

/**
 * KPDS Alert 닫기
 */
const closeAlert = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const alertContainer = document.getElementById(ALERT_CONTAINER_ID);

  if (alertContainer) {
    alertContainer.remove();
    // MEMO: React18에서는 unmountComponentAtNode가 deprecated 되고, root.unmount()로 변경 됩니다.
    ReactDOM.unmountComponentAtNode(alertContainer);
    document.body.style.overflow = 'auto';
  }
};

export const AlertBase = ({
  children,
  className,
  allowOutsideClick,
  onCloseReturnPromise,
}: PropsWithChildren<AlertBaseProps>) => {
  const handleEscapeKeyDown = (event: KeyboardEvent) => {
    const key = event.key || event.keyCode;

    if (key === 'Escape' || key === 27) {
      onCloseReturnPromise({ isConfirmed: false, isDismissed: true, dismiss: DISMISS.BACKDROP });
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKeyDown);
    return () => {
      window.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, []);

  const handleClickOutside = useCallback(() => {
    if (!allowOutsideClick) {
      return false;
    }
    onCloseReturnPromise({ isConfirmed: false, isDismissed: true, dismiss: DISMISS.BACKDROP });
  }, [allowOutsideClick]);

  const handleStopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={clsx(className, AlertStyles.wrapper)}
      style={{ fontFamily: vars.font.body }}
      onClick={handleClickOutside}
    >
      <div className={clsx(AlertStyles.innerWrapper)} onClick={handleStopPropagation}>
        {children}
      </div>
    </div>
  );
};

const Title = ({ title }: AlertTitleProps) => {
  if (!title) {
    return null;
  }

  return (
    <Typography variant={'$xxlargeSemibold'} className={clsx(AlertStyles.title)}>
      {title}
    </Typography>
  );
};

const Contents = ({ contents }: AlertContentsProps) => {
  const isTextContent = useMemo(() => typeof contents === 'string', [contents]);

  if (isTextContent) {
    return (
      <Typography variant={'$xlargeRegular'} className={clsx(AlertStyles.contentText)}>
        {contents}
      </Typography>
    );
  }

  return <div className={clsx(AlertStyles.contentComponent)}>{contents}</div>;
};

const Buttons = ({
  showConfirmButton = true,
  showCancelButton = false,
  confirmButtonTitle,
  cancelButtonTitle,
  confirmButtonProps,
  cancelButtonProps,
  buttonLayout = BUTTON_LAYOUT.Horizontal,
  onCloseReturnPromise,
}: AlertButtonWrapperProps) => {
  const isShowButtonWrapper = useMemo(
    () => showConfirmButton || showCancelButton,
    [showCancelButton, showConfirmButton],
  );
  const isGroupButton = useMemo(() => showConfirmButton && showCancelButton, [showCancelButton, showConfirmButton]);

  if (!isShowButtonWrapper) {
    return null;
  }

  return (
    <div className={clsx(AlertStyles.buttonWrapper({ buttonLayout }))}>
      {showCancelButton && (
        <CancelButton
          isGroupButton={isGroupButton}
          cancelButtonTitle={cancelButtonTitle}
          cancelButtonProps={cancelButtonProps}
          buttonLayout={buttonLayout}
          onCloseReturnPromise={onCloseReturnPromise}
        />
      )}
      {showConfirmButton && (
        <ConfirmButton
          isGroupButton={isGroupButton}
          confirmButtonTitle={confirmButtonTitle}
          confirmButtonProps={confirmButtonProps}
          buttonLayout={buttonLayout}
          onCloseReturnPromise={onCloseReturnPromise}
        />
      )}
    </div>
  );
};

const CancelButton = ({
  isGroupButton,
  cancelButtonTitle,
  cancelButtonProps = {
    _type: 'secondary',
    color: 'light',
    size: 'large',
  },
  buttonLayout,
  onClickCancelButton,
  onCloseReturnPromise,
}: Pick<AlertButtonWrapperProps, 'cancelButtonTitle' | 'onClickCancelButton' | 'cancelButtonProps' | 'buttonLayout'> &
  AlertButtonProps) => {
  const handleClickCancelButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (onClickCancelButton) {
        onClickCancelButton();
      }
      onCloseReturnPromise({ isConfirmed: false, isDismissed: true, dismiss: DISMISS.CANCEL });
    },
    [onClickCancelButton],
  );

  if (buttonLayout === BUTTON_LAYOUT.Vertical) {
    return (
      <TextButton
        _type={'secondary'}
        className={clsx(AlertStyles.alertButton({ isGroupButton, buttonLayout }))}
        aria-label="cancel-button"
        onClick={handleClickCancelButton}
      >
        {cancelButtonTitle}
      </TextButton>
    );
  }

  return (
    <Button
      className={clsx(AlertStyles.alertButton({ isGroupButton, buttonLayout }))}
      aria-label="cancel-button"
      onClick={handleClickCancelButton}
      {...cancelButtonProps}
    >
      {cancelButtonTitle}
    </Button>
  );
};

const ConfirmButton = ({
  isGroupButton,
  confirmButtonTitle,
  confirmButtonProps = {
    _type: 'secondary',
    size: 'large',
  },
  buttonLayout,
  onClickConfirmButton,
  onCloseReturnPromise,
}: Pick<
  AlertButtonWrapperProps,
  'confirmButtonTitle' | 'onClickConfirmButton' | 'confirmButtonProps' | 'buttonLayout'
> &
  AlertButtonProps) => {
  const handleClickConfirmButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (onClickConfirmButton) {
        onClickConfirmButton();
      }
      onCloseReturnPromise({ isConfirmed: true, isDismissed: false });
    },
    [onClickConfirmButton],
  );

  return (
    <Button
      className={clsx(AlertStyles.alertButton({ isGroupButton, buttonLayout }))}
      aria-label="confirm-button"
      onClick={handleClickConfirmButton}
      {...confirmButtonProps}
    >
      {confirmButtonTitle}
    </Button>
  );
};

AlertBase.Buttons = Buttons;
AlertBase.Title = Title;
AlertBase.Contents = Contents;

export type { Dismiss };
export { ALERT_CONTAINER_ID, isShownAlert, closeAlert };
