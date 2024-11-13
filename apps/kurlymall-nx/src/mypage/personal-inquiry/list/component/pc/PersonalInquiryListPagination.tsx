import { isEmpty } from 'lodash';

import { PersonalInquiryListState } from '../../slice';
import Pagination from '../../../../../shared/components/Pagination/Pagination';

interface Props {
  listState: PersonalInquiryListState;
  pageSize: number;
  onClickPrevious(): void;
  onClickNext(): void;
}

export default function PersonalInquiryListPagination({ listState, pageSize, onClickPrevious, onClickNext }: Props) {
  const { items, error, pagination, loading } = listState;
  const { pageNo } = pagination;

  if (isEmpty(items) || error) {
    return null;
  }

  const canGoPrev = listState.pagination.pageNo > 1;

  const canGoNext =
    !listState.pagination.isFullyLoaded || items.filter((it) => it.type === 'NORMAL').length > pageNo * pageSize;

  return (
    <Pagination
      previousEnable={!loading && canGoPrev}
      nextEnable={!loading && canGoNext}
      onClickPrevious={onClickPrevious}
      onClickNext={onClickNext}
    />
  );
}
