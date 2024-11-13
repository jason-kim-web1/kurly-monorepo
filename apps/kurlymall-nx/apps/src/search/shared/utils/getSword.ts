import { isNull, isString } from 'lodash';

import { loadSessionStorage } from '../../../shared/services/session.storage.service';
import { checkBrowserEnvironment } from '../../../shared/utils/checkBrowserEnvironment';

const CAPTURED_RESULT_INDEX = 1;

export const getSword = () => {
  if (!checkBrowserEnvironment()) {
    return '';
  }

  const prevPath = loadSessionStorage('prevPath');
  if (!isString(prevPath)) {
    return '';
  }

  const swordRegex = new RegExp(/sword=([^&]*)/);
  const sword = prevPath.match(swordRegex);

  if (isNull(sword)) {
    return '';
  }

  return decodeURI(sword[CAPTURED_RESULT_INDEX]);
};
