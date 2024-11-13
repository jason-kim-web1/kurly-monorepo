import { memo } from 'react';

import { isEmpty } from 'lodash';

import Empty from './inquiry/Empty';

import { PersonalInquiryListItem } from '../../types';
import InquiryQna from '../shared/InquiryQna';

interface Props {
  items: Array<PersonalInquiryListItem>;
  loading: boolean;
}

function PersonalInquiries({ items, loading }: Props) {
  return (
    <>
      {!loading && isEmpty(items) && <Empty />}
      {items.map((item) => (
        <InquiryQna key={`${item.type}-${item.id}`} item={item} isPC />
      ))}
    </>
  );
}

export default memo(PersonalInquiries);
