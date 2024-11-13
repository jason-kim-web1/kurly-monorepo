import { useRouter } from 'next/router';

import { getRefererInfoFromQueryParams } from '../utils';

const useProductReferer = () => {
  const { query } = useRouter();
  const { no, name } = getRefererInfoFromQueryParams(query);
  return {
    refererProductNo: no,
    refererProductName: name,
  };
};

export { useProductReferer };
