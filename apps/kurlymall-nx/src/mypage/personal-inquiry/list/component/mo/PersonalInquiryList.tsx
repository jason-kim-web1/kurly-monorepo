import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import PersonalInquiryListLoading from './PersonalInquiryListLoading';
import PersonalInquiryNotices from './PersonalInquiryNotices';
import PersonalInquiries from './PersonalInquiries';
import { PersonalInquiryListState } from '../../slice';
import { AppState } from '../../../../../shared/store';

const Container = styled.div`
  position: relative;
`;

export default function PersonalInquiryList() {
  const listState: PersonalInquiryListState = useSelector(({ personalInquiryList }: AppState) => personalInquiryList);

  return (
    <>
      <PersonalInquiryListLoading loading={listState.loading} />
      <Container>
        <PersonalInquiryNotices items={listState.items.filter((it) => it.type === 'NOTICE')} />
        <PersonalInquiries
          items={listState.items.filter((it) => it.type === 'NORMAL')}
          pagination={listState.pagination}
          loading={listState.loading}
        />
      </Container>
    </>
  );
}
