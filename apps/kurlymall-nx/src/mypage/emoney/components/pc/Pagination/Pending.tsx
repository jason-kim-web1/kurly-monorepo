import { PER_PAGE_LIST_COUNT } from '../../../constants';

import PaginationPendingItem from '../PaginationItem/Pending';
import Repeat from '../../../../../shared/components/Repeat';

const PaginationPending = () => (
  <Repeat count={PER_PAGE_LIST_COUNT}>
    <PaginationPendingItem />
  </Repeat>
);

export default PaginationPending;
