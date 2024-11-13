import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { head } from 'lodash';

import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { isAosByUA, isWebviewByUA } from '../../util/window/getDevice';

import { MainSite } from '../../src/main/interfaces/MainSection.interface';

const SearchRedirectPage = ({ redirectPath }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { isReady, replace } = useRouter();

  useEffect(() => {
    if (!isReady) {
      return;
    }
    replace(redirectPath);
  }, [isReady, replace]);

  return null;
};

export default SearchRedirectPage;
const mainSites: MainSite[] = ['BEAUTY', 'MARKET'];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const userAgent = ctx.req.headers['user-agent'] ?? '';
  const isAos = isAosByUA(userAgent);
  const isApp = isWebviewByUA(userAgent);
  const params: string[] = [];
  const keywords = ctx.query.keyword ?? '';
  const keyword = encodeURIComponent((keywords instanceof Array ? head(keywords) : keywords) as string);
  params.push(`?${isApp ? `keyword` : `sword`}=${keyword}`);

  const sites = ctx.query.site ?? '';
  const site = encodeURIComponent((sites instanceof Array ? head(sites) : sites) as string);
  if (mainSites.includes(site.toUpperCase() as 'MARKET' | 'BEAUTY')) {
    params.push(`&site=${site}`);
  }

  if (isAos) {
    return {
      props: {
        redirectPath: `kurly://search${params.join('')}`,
      },
    };
  }
  return {
    redirect: {
      destination: `${isApp ? 'kurly://search' : '/search'}${params.join('')}`,
      permanent: false,
    },
  };
};
