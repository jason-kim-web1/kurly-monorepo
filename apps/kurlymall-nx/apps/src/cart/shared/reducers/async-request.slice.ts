import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';

import { AppThunk } from '../../../shared/store';

/**
 * 비동기 요청의 식별자
 */
export const asyncRequests = [
  'loadShippingAreaPolicy',
  'updateCurrentAddress',
  'loadBaseAddressNotification',
  'loadAddressList',
  'loadAddress',
  'updateAddress',
  'deleteAddress',
  'loadMemberInfo',
  'loadMemberPointBenefit',
  'loadMemberBenefits',
  'loadMemberGradeInfo',
  'loadMemberSubscriptionInfo',
  'loadMemberMetadata',
] as const;

export enum AsyncStatus {
  INIT = 'INIT',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export type AsyncRequest = typeof asyncRequests[number];

export type AsyncRequestState = Record<AsyncRequest, { status: AsyncStatus; message: string | undefined }>;

export const initializeAsyncStatus = (request: Array<AsyncRequest>) =>
  _.fromPairs(request.map((value) => [value, { status: 'INIT', message: undefined }])) as AsyncRequestState;

export const initialState: AsyncRequestState = initializeAsyncStatus([...asyncRequests]);

const { actions, reducer } = createSlice({
  name: 'async-request',
  initialState,
  reducers: {
    startRequest: (state, { payload: request }: PayloadAction<AsyncRequest>) => ({
      ...state,
      [request]: {
        ...state[request],
        status: 'PENDING',
      },
    }),
    finishRequest: (state, { payload: request }: PayloadAction<AsyncRequest>) => ({
      ...state,
      [request]: {
        status: 'INIT',
        message: undefined,
      },
    }),
    success: (
      state,
      { payload: { request, message } }: PayloadAction<{ request: AsyncRequest; message?: string }>,
    ) => ({
      ...state,
      [request]: {
        status: 'SUCCESS',
        message,
      },
    }),
    fail: (state, { payload: { request, message } }: PayloadAction<{ request: AsyncRequest; message?: string }>) => ({
      ...state,
      [request]: {
        status: 'FAIL',
        message,
      },
    }),
  },
});

export const { startRequest, finishRequest, success, fail } = actions;

/**
 * 비동기 요청을 실행하고 요청의 상태를 저장합니다.
 * @param param.request 비동기 요청의 식별자
 * @param param.action 비동기 요청
 * @param param.onError 비동기 요청이 실패한 경우 실행하는 콜백함수
 * @return 비동기요청의 결과 (Thunk 함수의 Return Value)
 */
export const requestHelper =
  <ActionReturnValue, ErrorReturnValue>({
    request,
    action,
    onError,
  }: {
    request: AsyncRequest;
    action: AppThunk<Promise<ActionReturnValue>>;
    onError?: (error: Error, ...thunkParams: Parameters<AppThunk>) => ErrorReturnValue;
  }): AppThunk<Promise<ActionReturnValue | ErrorReturnValue | undefined>> =>
  async (dispatch, getState, extraArgument) => {
    let result: ActionReturnValue | ErrorReturnValue | undefined;

    dispatch(startRequest(request));

    try {
      result = await action(dispatch, getState, extraArgument);
      dispatch(success({ request }));
    } catch (e) {
      result = onError?.(e as Error, dispatch, getState, extraArgument);
      dispatch(fail({ request, message: (e as Error).message }));
    }

    dispatch(finishRequest(request));

    return result;
  };

export { reducer as asyncRequestReducer };
