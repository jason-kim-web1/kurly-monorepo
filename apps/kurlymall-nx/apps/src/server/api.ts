import axios from 'axios';

import httpClient from '../shared/configs/internal-http-client';

import { fetchUserMetadata } from '../member/adult-verification/services/getUserMetadata';

import { API_URL, INTERNAL_API_URL } from '../shared/configs/config';

export const getUserMetaData = async (accessToken: string) => {
  return fetchUserMetadata(
    axios.create({
      baseURL: INTERNAL_API_URL,
      headers: { Authorization: `Bearer ${accessToken}` },
    }),
  );
};

export const getGuestToken = async (): Promise<string> => {
  const { data } = await httpClient.post('/v3/auth/guest');
  const accessToken = data.data.access_token;
  return accessToken;
};

export const getGuestTokenServerSide = async (): Promise<string> => {
  const { data } = await httpClient.post(`${API_URL}/v3/auth/guest`);
  const accessToken = data.data.access_token;
  return accessToken;
};
