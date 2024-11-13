import { isUndefined } from 'lodash';

import { ne } from '../../../../shared/utils/lodash-extends';

interface Params {
  key?: string;
  status: string;
}

export const checkEnabled = ({ key, status }: Params) => {
  if (isUndefined(key) || ne(status, 'success')) {
    return false;
  }
  return true;
};
