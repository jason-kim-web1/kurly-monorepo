import { useDispatch } from 'react-redux';

import InquiryQnaNotice from './InquiryQnaNotice';

import { toggleExpanded } from '../../slice';

import { PersonalInquiryListItem } from '../../types';

interface Props {
  items: Array<PersonalInquiryListItem>;
}

export default function PersonalInquiryNotices({ items }: Props) {
  const dispatch = useDispatch();

  const onClickItem = (item: PersonalInquiryListItem) => () => {
    const targetId = `${item.type}-${item.id}`;
    dispatch(toggleExpanded(targetId));
  };

  return (
    <>
      {items.map((item) => (
        <InquiryQnaNotice
          key={`${item.type}-${item.id}`}
          title={item.title}
          contents={item.contents}
          date={item.date}
          expanded={item.expanded}
          onClickItem={onClickItem(item)}
        />
      ))}
    </>
  );
}
