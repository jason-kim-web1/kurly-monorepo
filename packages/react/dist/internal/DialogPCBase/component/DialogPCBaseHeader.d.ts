import { DialogPCBaseHeaderInterface, DialogPCBaseWrapperProps } from '../interface';
declare const DialogPCBaseHeader: ({ title, description, onClickConfirmButton, }: DialogPCBaseHeaderInterface & Pick<DialogPCBaseWrapperProps, "onClickConfirmButton">) => JSX.Element;
export default DialogPCBaseHeader;
