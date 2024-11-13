import { AuthState } from '../reducers/auth';
import { getCookie } from '../services';

import { SESSION_KEY } from '../configs/config';

export * from './phone-valiator';
export * from './text-formatter';

export const getPayload = <T>(action: { type: string; payload: T }) => action.payload;

export const sessionKeyExists = () => new RegExp(SESSION_KEY).test(getCookie());

export const isLoginedUser = ({ accessToken, isGuest }: AuthState) => sessionKeyExists() && !!accessToken && !isGuest;

export const isGuestUser = ({ accessToken, isGuest }: AuthState) => !!accessToken && isGuest;

export const hasAccessToken = ({ accessToken }: AuthState) => !!accessToken;
