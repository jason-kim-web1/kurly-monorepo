import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { memo, useEffect } from 'react';

import { useInView } from 'react-intersection-observer';

import { useDispatch } from 'react-redux';

import EmptyInquiries from './EmptyInquiries';
import { PersonalInquiryListItem } from '../../types';
import { loadPersonalInquiryNextPage, PersonalInquiryListPaginationState } from '../../slice';
import MobileFooter from '../../../../../shared/components/layouts/MobileFooter';
import PersonalInquiryListBottom from './PersonalInquiryListBottom';
import InquiryQna from '../shared/InquiryQna';

const USER_INQUIRY_PAGE_SIZE = 20;

const Container = styled.div`
  height: 100%;
`;

const Ul = styled.ul({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
});

const Li = styled.li({
  padding: '0',
  backgroundColor: 'white',
});

interface Props {
  items: Array<PersonalInquiryListItem>;
  pagination: PersonalInquiryListPaginationState;
  loading: boolean;
}

function PersonalInquiries({ items, pagination, loading }: Props) {
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!inView || pagination.isFullyLoaded) {
      return;
    }

    dispatch(loadPersonalInquiryNextPage(USER_INQUIRY_PAGE_SIZE));
  }, [dispatch, inView, pagination.isFullyLoaded]);

  return (
    <Container>
      <Ul>
        {items.map((item) => (
          <Li key={`${item.type}-${item.id}`}>
            <InquiryQna item={item} isPC={false} />
          </Li>
        ))}
        {!loading && isEmpty(items) && <EmptyInquiries />}
        <div ref={ref} />
      </Ul>
      <MobileFooter transparent>
        <PersonalInquiryListBottom />
      </MobileFooter>
    </Container>
  );
}

export default memo(PersonalInquiries);
