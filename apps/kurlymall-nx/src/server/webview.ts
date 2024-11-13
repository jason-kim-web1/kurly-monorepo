import { head, chain, isEmpty } from 'lodash';
import { GetServerSidePropsContext } from 'next';

import { refreshToken } from '../../src/shared/api/token';
export interface WebviewServerSideProps {
  accessToken: string;
}

export interface WebviewServerSidePropsWithDeviceId extends WebviewServerSideProps {
  deviceId: string;
}

const deletePrefix = (prefix: string) => (target: string) => target.replace(prefix, '');
const deleteBearerPrefix = deletePrefix('Bearer ');
const getToken = (header?: string | string[]): string => {
  const DEFAULT = '';
  if (!header) {
    return DEFAULT;
  }
  if (header instanceof Array) {
    return deleteBearerPrefix(head(header) || DEFAULT);
  }
  return deleteBearerPrefix(header);
};

export const getWebViewInjectedAccessToken = (context: GetServerSidePropsContext) => {
  const { req } = context;
  const accessToken = chain(['authorization', 'authorizationtoken'])
    .map((key) => req.headers[key])
    .map((headerValue) => getToken(headerValue))
    .filter((a) => !isEmpty(a))
    .head()
    .value();
  return accessToken || '';
};

export const getWebViewInjectedDeviceId = (context: GetServerSidePropsContext) => {
  const userAgent = context.req?.headers['user-agent'];
  const regex = /DeviceID[/](\S+)/;

  try {
    const matchRegex = userAgent?.match(regex);
    const deviceId = matchRegex ? matchRegex[1].toString() : '';

    return deviceId;
  } catch (err) {
    return '';
  }
};

export function getWebviewServerSideProps() {
  return async (context: GetServerSidePropsContext): Promise<{ props: WebviewServerSideProps }> => {
    const accessToken = getWebViewInjectedAccessToken(context);

    return {
      props: {
        accessToken,
      },
    };
  };
}

export function getWebviewServerSidePropsWithRefreshToken() {
  return async (context: GetServerSidePropsContext): Promise<{ props: WebviewServerSidePropsWithDeviceId }> => {
    const accessToken = getWebViewInjectedAccessToken(context);
    const deviceId = getWebViewInjectedDeviceId(context);

    if (accessToken) {
      try {
        return {
          props: {
            accessToken: await refreshToken(accessToken),
            deviceId,
          },
        };
      } catch (err) {
        console.error(err);
      }
    }

    return {
      props: {
        accessToken,
        deviceId,
      },
    };
  };
}
