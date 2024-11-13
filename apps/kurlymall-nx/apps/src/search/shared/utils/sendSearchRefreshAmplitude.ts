import { amplitudeService } from '../../../shared/amplitude';
import { SearchRefresh } from '../../../shared/amplitude/events/SearchRefresh';

type RefreshType = 'user_refresh' | 'dev_refresh' | 'address_change';

export interface SearchRefreshParams {
  refreshType: RefreshType;
  queryId: string;
  keyword: string;
}

export const sendSearchRefreshAmplitude = ({ refreshType, queryId, keyword }: SearchRefreshParams) => {
  amplitudeService.logEvent(
    new SearchRefresh({
      refreshType,
      queryId,
      keyword,
    }),
  );
};
