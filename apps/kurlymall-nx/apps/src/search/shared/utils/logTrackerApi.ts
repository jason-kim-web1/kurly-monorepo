import axios from 'axios';
import { each } from 'lodash';

import { ignoreError } from '../../../shared/utils/general';

const logTrackerApi = (urlList: string[]) =>
  ignoreError(async () => {
    each(urlList, async (url) => {
      await axios.get(url);
    });
  });

export { logTrackerApi };
