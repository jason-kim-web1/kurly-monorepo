import type { DirectSearchType, RecommendProduct } from '../types';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectSearch } from '../../../shared/amplitude/events';
import { SelectSearchSelectionTypeValue } from '../constants';

interface Props {
  searchKeyword: string;
  queryId: string;
  suggestion?: RecommendProduct;
  selectionType: SelectSearchSelectionTypeValue;
  directSearchType?: DirectSearchType;
  position?: number;
  autocompleteKeyword?: string;
}

const handleDirectSearchKeywordAmplitude = ({
  searchKeyword: keyword,
  queryId,
  selectionType,
  suggestion,
  autocompleteKeyword,
  directSearchType,
  position,
}: Props) => {
  amplitudeService.logEvent(
    new SelectSearch({
      selectionType,
      keyword,
      queryId,
      contentId: suggestion?.no,
      contentName: suggestion?.name,
      autocompleteKeyword,
      directSearchType,
      position,
    }),
  );
};

export { handleDirectSearchKeywordAmplitude };
