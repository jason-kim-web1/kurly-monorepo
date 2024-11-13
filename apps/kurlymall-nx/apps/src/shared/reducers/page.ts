import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface RedirectionState {
  url: string | null;
  query?: Record<string, string | string[] | boolean | number | undefined | null>;
  isExternal?: boolean;
  replace?: boolean;
}

export interface PageState {
  title: string;
  message: string;
  styles?: any;
  goBack: boolean;
  goError: boolean;
  isUnauthenticated: boolean;
  documentId: string | undefined;
  scrollId: string | undefined;
  reloading: boolean;
  redirection?: RedirectionState;
  isLoading: boolean;
  redirectUrl: string;
  closeWebview: boolean;
  finishAndRefresh: boolean;
  confirmButtonText: string;
  // dismiss 시에도 액션을 진행 할 지에 대한 여부. (기본 true)
  dismissedRedirect: boolean;
}

export const initialState: PageState = {
  title: '',
  message: '',
  goBack: false,
  goError: false,
  isUnauthenticated: false,
  documentId: undefined,
  scrollId: undefined,
  reloading: false,
  isLoading: false,
  redirectUrl: '',
  closeWebview: false,
  finishAndRefresh: false,
  confirmButtonText: '확인',
  dismissedRedirect: true,
};

const { actions, reducer } = createSlice({
  name: 'page',
  initialState,
  reducers: {
    wrongApproach: (state, { payload: message }) => ({
      ...state,
      message,
      goBack: true,
    }),
    notify: (state, { payload: message }) => ({ ...state, message }),
    showAlert: (state, { payload: { title, message, styles } }) => ({
      ...state,
      title,
      message,
      styles,
    }),
    clear: () => ({ ...initialState }),
    redirectToLogin: (state, { payload }: PayloadAction<{ message?: string } | undefined>) => ({
      ...state,
      message: payload?.message || '로그인하셔야 본 서비스를 이용하실 수 있습니다.',
      isUnauthenticated: true,
    }),
    redirectToError: (state, { payload: message }) => ({
      ...state,
      message,
      goError: true,
    }),
    redirectTo: (state, { payload: redirection }: { payload: RedirectionState }) => ({
      ...state,
      redirection,
    }),
    notifyAndFocus: (state, { payload: { title, message, documentId, confirmButtonText } }) => ({
      ...state,
      title,
      message,
      documentId,
      confirmButtonText,
    }),
    notifyAndScroll: (state, { payload: { message, scrollId, confirmButtonText } }) => ({
      ...state,
      message,
      scrollId,
      confirmButtonText,
    }),
    notifyAndRedirectTo: (state, { payload: { message, redirectUrl, confirmButtonText, dismissedRedirect } }) => ({
      ...state,
      message,
      redirectUrl,
      confirmButtonText,
      dismissedRedirect,
    }),
    notifyAndCloseWebview: (state, { payload: message }) => ({
      ...state,
      message,
      closeWebview: true,
    }),
    notifyAndFinishRefreshWebview: (state, { payload: message }) => ({
      ...state,
      message,
      finishAndRefresh: true,
    }),
    reload: (state, { payload: message }) => ({
      ...state,
      message,
      reloading: true,
    }),
    showLoading: (state) => ({
      ...state,
      isLoading: true,
    }),
    hideLoading: (state) => ({
      ...state,
      isLoading: false,
    }),
  },
});

export const {
  wrongApproach,
  notify,
  showAlert,
  clear,
  redirectToLogin,
  redirectToError,
  redirectTo,
  notifyAndFocus,
  notifyAndScroll,
  notifyAndRedirectTo,
  notifyAndCloseWebview,
  notifyAndFinishRefreshWebview,
  reload,
  showLoading,
  hideLoading,
} = actions;

export default reducer;
