import { get } from 'lodash';

import type { ProductContent } from '../types';

const getContentItem = (contentList: ProductContent) => {
  return get(contentList, 'content', []);
};

export { getContentItem };
