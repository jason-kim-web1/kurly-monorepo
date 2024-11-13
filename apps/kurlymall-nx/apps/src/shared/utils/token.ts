import jwtDecode from 'jwt-decode';

import { isAfter } from 'date-fns';

import { Token } from '../api/auth/token';

const isExpired = (time: number) => isAfter(new Date(), new Date(time));

interface Payload {
  uuid: string;
  is_guest: boolean;
  cart_id?: string;
  exp?: number;
  m_id?: string;
  m_no?: string;
}

export interface DecodedToken extends Token {
  isExpired: boolean;
  memberId?: string;
  memberNo?: string;
}

export const extractAuthentication = (jwt: string): DecodedToken => {
  const {
    uuid,
    is_guest: isGuest,
    exp: expiredTime,
    cart_id: cartId,
    m_id: memberId,
    m_no: memberNo,
  } = jwtDecode<Payload>(jwt);

  return {
    accessToken: jwt,
    uid: uuid,
    isGuest,
    cartId,
    memberId,
    memberNo,
    isExpired: expiredTime ? isExpired(expiredTime * 1000) : false,
  };
};
