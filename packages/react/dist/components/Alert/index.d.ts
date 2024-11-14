import { closeAlert, isShownAlert } from 'src/internal/AlertBaseLegacy';
import { AlertProps, AlertResponse } from '../../internal/AlertBaseLegacy/interface';
/**
 * @deprecated 해당 alert은 react dom 호환이 불가하여 제거될 예정 입니다. useAlert를 이용하여 사용 하여 주세요.
 */
export declare const Alert: (props: AlertProps) => Promise<AlertResponse>;
export { closeAlert, isShownAlert };
export type { AlertProps };
