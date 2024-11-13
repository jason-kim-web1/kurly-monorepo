import type { GetServerSideProps } from 'next';
import { eq, get } from 'lodash';

import { getSingleQueryValue } from '../../shared/utils/url';
import { KURLY_URL } from '../../shared/configs/config';

type SearchPageProps = {
  meta: {
    title: string;
    description: string;
    url: string;
  };
};

const getSiteName = (site: string) => {
  if (eq(site.toLowerCase(), 'beauty')) {
    return '뷰티';
  }
  return '마켓';
};

const getSearchServerSideProps: GetServerSideProps<SearchPageProps> = async (context) => {
  const { query } = context;
  const searchKeyword = getSingleQueryValue(get(query, 'sword'));
  const site = getSingleQueryValue(get(query, 'site'));
  const siteName = getSiteName(site);
  return {
    props: {
      meta: {
        title: searchKeyword ? `검색결과 > ${searchKeyword}` : '검색',
        description: searchKeyword
          ? `${siteName} 컬리에서 찾은 ${searchKeyword} 관련 상품입니다.`
          : '컬리 검색 기능으로 원하는 상품을 찾아보실 수 있습니다.',
        url: searchKeyword ? `${KURLY_URL}/search?sword=${encodeURIComponent(searchKeyword)}` : KURLY_URL,
      },
    },
  };
};

export { getSearchServerSideProps };
export type { SearchPageProps };
