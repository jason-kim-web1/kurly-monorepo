import { useRouter } from 'next/router';

import { parseQueryString } from '../../shared/utils/parseQueryString';
import { getSanitizedMainSite, getSanitizedValue } from '../../shared/utils/getSanitizedValues';
import type { MainSite } from '../../main/interfaces/MainSection.interface';
import { MAIN_SITE } from '../../main/constants';

export default function useGetInitialSite() {
  const router = useRouter();
  const { query } = router;
  const { site } = parseQueryString(query);

  return getSanitizedValue<MainSite>({
    value: site,
    defaultValue: MAIN_SITE.MARKET,
    fn: getSanitizedMainSite,
  });
}
