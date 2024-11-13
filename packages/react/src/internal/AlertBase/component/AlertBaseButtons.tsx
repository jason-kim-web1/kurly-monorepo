import { MouseEvent, useCallback, useMemo } from 'react';
import clsx from 'clsx';
import { AlertStyles } from '@thefarmersfront/kpds-css';
import { TextButton } from '@/components/TextButton';
import { Button } from '@/components/Button';
import { BUTTON_LAYOUT } from '@/internal/AlertBase/constants';
import { AlertBaseButtonProps, AlertBaseButtonWrapperProps } from '@/internal/AlertBase/interface';

const AlertBaseButtons = ({
  showConfirmButton = true,
  showCancelButton = false,
  confirmButtonTitle = '확인',
  cancelButtonTitle = '취소',
  confirmButtonProps,
  cancelButtonProps,
  onClickCancelButton,
  onClickConfirmButton,
  buttonLayout = BUTTON_LAYOUT.Horizontal,
}: AlertBaseButtonWrapperProps) => {
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
          onClickCancelButton={onClickCancelButton}
          buttonLayout={buttonLayout}
        />
      )}
      {showConfirmButton && (
        <ConfirmButton
          isGroupButton={isGroupButton}
          confirmButtonTitle={confirmButtonTitle}
          confirmButtonProps={confirmButtonProps}
          onClickConfirmButton={onClickConfirmButton}
          buttonLayout={buttonLayout}
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
}: Pick<
  AlertBaseButtonWrapperProps,
  'cancelButtonTitle' | 'onClickCancelButton' | 'cancelButtonProps' | 'buttonLayout'
> &
  AlertBaseButtonProps) => {
  const handleClickCancelButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClickCancelButton!();
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
}: Pick<
  AlertBaseButtonWrapperProps,
  'confirmButtonTitle' | 'onClickConfirmButton' | 'confirmButtonProps' | 'buttonLayout'
> &
  AlertBaseButtonProps) => {
  const handleClickConfirmButton = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onClickConfirmButton!();
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

export default AlertBaseButtons;
