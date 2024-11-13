import axios from 'axios';

import { isPC } from '../../../../util/window/getDevice';

export default async function getVerificationUrl(accessToken: string) {
  const requestUrl = '/nx/api/identity-verification';
  const { data } = await axios.get(requestUrl, { headers: { Authorization: `Bearer ${accessToken}` } });
  const { online_url: onlineUrl, mobile_url: mobileUrl } = data;
  return isPC ? onlineUrl : mobileUrl;
}
