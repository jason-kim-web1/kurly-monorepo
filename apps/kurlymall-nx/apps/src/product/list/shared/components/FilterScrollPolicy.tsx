import { PropsWithChildren, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { isEmpty, isEqualWith } from 'lodash';

import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';

interface Props {
  offsetGetter: () => number;
}

type QueryFilter = string | string[] | undefined;

const FilterScrollPolicy = ({ children, offsetGetter }: PropsWithChildren<Props>) => {
  const previousQueryFilter = useRef<QueryFilter>();
  const { query } = useRouter();

  useEffect(() => {
    if (!checkBrowserEnvironment()) return;

    const filters = query.filters;
    const hasFilterChanged = !isEqualWith(filters, previousQueryFilter.current, (value, other) => {
      if (isEmpty(value) && isEmpty(other)) return true;
    });

    if (hasFilterChanged) {
      window.scroll({
        top: offsetGetter(),
      });
    }

    previousQueryFilter.current = filters;
  }, [offsetGetter, query]);

  return <>{children}</>;
};

export { FilterScrollPolicy };
