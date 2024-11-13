import { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { eq, get, head, isEmpty, isString, isUndefined, startsWith, chain, trim } from 'lodash';

import type { ParsedUrlQuery } from 'querystring';
import { amplitudeService } from '../../src/shared/amplitude';
import { ignoreError } from '../../src/shared/utils/general';
import { OpenKurlyAlliance } from '../../src/shared/amplitude/events/app/OpenKurlyAlliance';
import { CPS_CODE_SITE_MAP } from '../../src/shared/constant/naver-cps';
import { checkBrowserEnvironment } from '../../src/shared/utils/checkBrowserEnvironment';
import { branchService } from '../../src/shared/branch';

type PathCheckFn = (path: string) => boolean;

interface LogEventItem {
  pred: PathCheckFn;
  Event: typeof OpenKurlyAlliance;
  type: string;
}

const DEFAULT_REDIRECT_PATH = '/main';

const getRedirectPath = (query: ParsedUrlQuery): string => {
  if (isUndefined(query) || isEmpty(query)) {
    return DEFAULT_REDIRECT_PATH;
  }
  const redirectTo = get(query, 'to');
  if (isUndefined(redirectTo)) {
    return DEFAULT_REDIRECT_PATH;
  }
  if (isString(redirectTo)) {
    return redirectTo;
  }
  const firstRedirectTo = head(redirectTo) || DEFAULT_REDIRECT_PATH;
  return firstRedirectTo;
};

const isMainPage: PathCheckFn = (path) => eq(path, '/main');
const isProductDetail: PathCheckFn = (path) => startsWith(path, '/goods/');

const LOG_EVENT_MAP: LogEventItem[] = [
  { pred: isMainPage, Event: OpenKurlyAlliance, type: '메인' },
  { pred: isProductDetail, Event: OpenKurlyAlliance, type: '상품 상세' },
];

const getLogData = (path: string, data: LogEventItem): [boolean, typeof OpenKurlyAlliance, string] => {
  const { pred, Event, type } = data;
  const result = pred(path);
  return [result, Event, type];
};

const logCPSEntry = (path: string, allianceCode: string, allianceSite: string) =>
  ignoreError(() => {
    chain(LOG_EVENT_MAP)
      .map((item) => getLogData(path, item))
      .filter(([result]) => eq(result, true))
      .each(([, event, type]) =>
        amplitudeService.logEvent(
          new event({
            allianceCode,
            allianceSite,
            allianceType: type,
          }),
        ),
      )
      .value();
  });

const RedirectPage = ({ allianceCode, allianceSite }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { query, isReady, replace } = useRouter();
  const [branchSDKLoaded, setBranchSDKLoaded] = useState(false);
  const redirectPath = getRedirectPath(query);

  const setupBranchSdkSync = async () => {
    await ignoreError(async () => {
      await branchService.getInstance();
    });
    setBranchSDKLoaded(true);
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    setupBranchSdkSync();
  }, []);

  useEffect(() => {
    if (!isReady || !branchSDKLoaded) {
      return;
    }
    logCPSEntry(redirectPath, allianceCode, allianceSite);
    replace(redirectPath);
  }, [isReady, redirectPath, allianceCode, allianceSite, replace, branchSDKLoaded]);

  return null;
};

export default RedirectPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    req: {
      headers: { cookie },
    },
  } = ctx;

  const cpsProviderId = chain(cookie)
    .split(';')
    .map((item) => trim(item).split('='))
    .filter(([key]) => eq(key, 'ch_kfpartnerID'))
    .map(([, value]) => value)
    .head()
    .value();

  return {
    props: {
      allianceCode: cpsProviderId || '',
      allianceSite: CPS_CODE_SITE_MAP.get(cpsProviderId) || '',
    },
  };
};
