import axios from 'axios';

import { UnknownError } from '../errors';

import { RESOURCE_URL } from '../configs/config';
import {
  SIGNUP_PERSONAL_INFO_AGREE,
  SIGNUP_PERSONAL_INFO_AGREE_NOT_REQUIRED,
  SIGNUP_TERMS_AGREE,
} from '../../member/signup/constants';

export const fetchPersonalInformationTermsHTML = async () => {
  const url = `${RESOURCE_URL}/json/terms/202107/gift.html`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

export const fetchPgTermsHTML = async () => {
  const url = `${RESOURCE_URL}/json/terms/202008/pg_v2.html`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

export const fetchKurlyTermsHTML = async () => {
  const url = `${RESOURCE_URL}/json/terms/202111/kurly.html?ver=4`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

export const fetchTermsOfUse = async () => {
  const url = SIGNUP_TERMS_AGREE.url;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

export const fetchPrivacyPolicy = async () => {
  const url = SIGNUP_PERSONAL_INFO_AGREE.url;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};

export const fetchPrivacyPolicyOptional = async () => {
  const url = SIGNUP_PERSONAL_INFO_AGREE_NOT_REQUIRED.url;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    throw new UnknownError(err as Error);
  }
};
