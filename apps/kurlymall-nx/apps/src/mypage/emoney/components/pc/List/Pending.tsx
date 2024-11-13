import { PER_PAGE_LIST_COUNT } from '../../../constants';

import ListItemPending from '../ListItem/Pending';
import Repeat from '../../../../../shared/components/Repeat';

const Pending = () => (
  <Repeat count={PER_PAGE_LIST_COUNT}>
    <ListItemPending />
  </Repeat>
);

export default Pending;
