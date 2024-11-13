import { ALERT_CONTAINER_ID, AlertBase, closeAlert, isShownAlert } from 'src/internal/AlertBaseLegacy';
import ReactDOM from 'react-dom';
import { AlertProps, AlertResponse } from '@/internal/AlertBaseLegacy/interface';
import { KPDS_PORTAL_ELEMENT_ID } from '@/components/ThemeProvider';

const AlertComponent = ({
  title,
  contents,
  confirmButtonTitle = '확인',
  cancelButtonTitle = '취소',
  showConfirmButton = true,
  showCancelButton = false,
  allowOutsideClick = true,
  confirmButtonProps,
  cancelButtonProps,
  buttonLayout,
  onClickConfirmButton,
  onClickCancelButton,
  promiseResolve,
}: AlertProps & { promiseResolve: (value: AlertResponse | PromiseLike<AlertResponse>) => void }) => {
  const onCloseReturnPromise = (resolveObject: AlertResponse) => {
    closeAlert();
    promiseResolve(resolveObject);
  };

  return (
    <AlertBase allowOutsideClick={allowOutsideClick} onCloseReturnPromise={onCloseReturnPromise}>
      <AlertBase.Title title={title} />
      <AlertBase.Contents contents={contents} />
      <AlertBase.Buttons
        buttonLayout={buttonLayout}
        onClickCancelButton={onClickCancelButton}
        onClickConfirmButton={onClickConfirmButton}
        showConfirmButton={showConfirmButton}
        showCancelButton={showCancelButton}
        confirmButtonTitle={confirmButtonTitle}
        cancelButtonTitle={cancelButtonTitle}
        confirmButtonProps={confirmButtonProps}
        cancelButtonProps={cancelButtonProps}
        onCloseReturnPromise={onCloseReturnPromise}
      />
    </AlertBase>
  );
};

/**
 * @deprecated 해당 alert은 react dom 호환이 불가하여 제거될 예정 입니다. useAlert를 이용하여 사용 하여 주세요.
 */
export const Alert = (props: AlertProps): Promise<AlertResponse> => {
  if (typeof window === 'undefined') {
    return new Promise((_, reject) => reject('window 객체가 존재하지 않습니다.'));
  }

  // Alert은 중첩 될 수 없으므로 떠있는 alert를 닫고 시작합니다.
  if (isShownAlert()) {
    closeAlert();
  }

  return new Promise((resolve) => {
    const container = document.createElement('div');
    const portal = document.getElementById(KPDS_PORTAL_ELEMENT_ID);

    container.id = ALERT_CONTAINER_ID;
    portal?.appendChild(container);
    document.body.style.overflow = 'hidden';
    // MEMO: react18 에서는 createRoot로 변경 되어야 합니다.
    ReactDOM.render(<AlertComponent promiseResolve={resolve} {...props} />, container);
  });
};

export { closeAlert, isShownAlert };
export type { AlertProps };
