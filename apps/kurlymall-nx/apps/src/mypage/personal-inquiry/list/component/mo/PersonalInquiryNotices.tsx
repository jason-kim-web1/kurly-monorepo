import styled from '@emotion/styled';

import { useState } from 'react';

import { PersonalInquiryListItem } from '../../types';
import InquiryQnaNotice from './InquiryQnaNotice';
import PersonalInquiryNoticeModal from './PersonalInquiryNoticeModal';

const Container = styled.div`
  position: sticky;
  top: 44px;
  z-index: 10;
`;

const Ul = styled.ul({
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  top: 0,
});

const Li = styled.li({
  padding: '0',
  backgroundColor: 'white',
});

interface Props {
  items: Array<PersonalInquiryListItem>;
}

export default function PersonalInquiryNotices({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedNoticeItem, setSelectedNoticeItem] = useState<PersonalInquiryListItem>();

  const handleCloseModal = () => {
    setOpen((prev) => !prev);
  };

  const onClickItem = (item: PersonalInquiryListItem) => () => {
    setSelectedNoticeItem(item);
    setOpen(true);
  };

  return (
    <Container>
      <Ul>
        {items.map((item) => (
          <Li key={`${item.type}-${item.id}`}>
            <InquiryQnaNotice
              title={item.title}
              contents={item.contents}
              expanded={item.expanded}
              onClickItem={onClickItem(item)}
            />
          </Li>
        ))}
      </Ul>
      <PersonalInquiryNoticeModal open={open} onClose={handleCloseModal} item={selectedNoticeItem} />
    </Container>
  );
}
