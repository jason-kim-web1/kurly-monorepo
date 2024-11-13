import { useReducer, createContext, ReactNode, Dispatch, useContext } from 'react';
import { eq } from 'lodash';

export const DIALOG_TYPES = {
  INSTRUCTION: 'INSTRUCTION',
  REGISTRATION_FORM: 'REGISTRATION_FORM',
  MODIFICATION_FORM: 'MODIFICATION_FORM',
  BENEFIT_GUIDE: 'BENEFIT_GUIDE',
} as const;

type DialogType = keyof typeof DIALOG_TYPES;

export type RegistrationFormDialogData = {
  contentsProductNo: number;
  dealProductNo: number;
  orderNo: number;
};

interface State {
  open: boolean;
  dialogType: DialogType | null;
  dialogData: RegistrationFormDialogData | null;
}

const initialState: State = {
  open: false,
  dialogType: null,
  dialogData: null,
};

const ACTION_TYPES = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
} as const;

type ActionType = keyof typeof ACTION_TYPES;

type Action = {
  type: ActionType;
  payload?: any;
};

const ReviewDialogContext = createContext<State>(initialState);
const ReviewDialogDispatchContext = createContext<Dispatch<Action>>(() => {});

const reviewDialogReducer = (state: State, action: Action) => {
  const { type, payload } = action;
  if (eq(type, ACTION_TYPES.CLOSE)) {
    return initialState;
  }
  if (eq(type, ACTION_TYPES.OPEN)) {
    const { dialogType, dialogData } = payload;
    return {
      open: true,
      dialogType,
      dialogData,
    };
  }
  return state;
};

export const ReviewDialogProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reviewDialogReducer, initialState);
  return (
    <ReviewDialogContext.Provider value={state}>
      <ReviewDialogDispatchContext.Provider value={dispatch}>{children}</ReviewDialogDispatchContext.Provider>
    </ReviewDialogContext.Provider>
  );
};

export const useReviewDialogState = () => {
  const state = useContext(ReviewDialogContext);
  return state;
};

export const useReviewDialogDispatch = () => {
  const dispatch = useContext(ReviewDialogDispatchContext);
  return dispatch;
};

export const useReviewDialogActions = () => {
  const dispatch = useContext(ReviewDialogDispatchContext);
  const openDialog = (payload?: any) =>
    dispatch({
      type: ACTION_TYPES.OPEN,
      payload,
    });
  const openInstructionDialog = () =>
    openDialog({
      dialogType: DIALOG_TYPES.INSTRUCTION,
      dialogData: null,
    });
  const openBenefitGuideDialog = () =>
    openDialog({
      dialogType: DIALOG_TYPES.BENEFIT_GUIDE,
      dialogData: null,
    });
  const openRegistrationFormDialog = (data: RegistrationFormDialogData) =>
    openDialog({
      dialogType: DIALOG_TYPES.REGISTRATION_FORM,
      dialogData: data,
    });
  return {
    openInstructionDialog,
    openBenefitGuideDialog,
    openRegistrationFormDialog,
    closeDialog: () => dispatch({ type: ACTION_TYPES.CLOSE }),
  } as const;
};
