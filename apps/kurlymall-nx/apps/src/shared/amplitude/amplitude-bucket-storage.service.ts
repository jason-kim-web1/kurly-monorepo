import { getCookieOnce, sentryCaptureError } from '../services';

import AmplitudeBucket from './AmplitudeBucket';
import { COOKIE_DOMAIN } from '../configs/config';

const BUCKET_KEY = 'amplitudeBucket';

export const saveAmplitudeBucket = (bucket: AmplitudeBucket) => {
  try {
    // TODO sessionStorage 내용 제거
    window.sessionStorage.setItem(BUCKET_KEY, JSON.stringify(bucket.getRawData()));
    document.cookie = `${BUCKET_KEY}=${encodeURIComponent(
      JSON.stringify(bucket.getRawData()),
    )}; path=/; session=true; domain=${COOKIE_DOMAIN};`;
  } catch (err) {
    sentryCaptureError(err as Error);
  }
};

export const loadAmplitudeBucket = () => {
  try {
    // TODO sessionStorage 내용 제거
    const data = decodeURIComponent(getCookieOnce(BUCKET_KEY) || '') || window.sessionStorage.getItem(BUCKET_KEY);
    if (!data) {
      return undefined;
    }

    return JSON.parse(data);
  } catch {
    // Do nothing
    return undefined;
  }
};
