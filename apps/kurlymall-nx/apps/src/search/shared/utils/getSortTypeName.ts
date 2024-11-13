import { chain, eq, isEmpty } from 'lodash';

import type { ProductAvailableSort } from '../types';

const getSortTypeName = (sortTypeList?: ProductAvailableSort[], sortType?: string): string => {
  const DEFAULT = '';
  if (!sortTypeList || isEmpty(sortTypeList) || !sortType) {
    return DEFAULT;
  }
  return (
    chain(sortTypeList)
      .filter(({ type }) => eq(type, sortType))
      .map(({ name }) => name)
      .head()
      .value() || ''
  );
};

export { getSortTypeName };
