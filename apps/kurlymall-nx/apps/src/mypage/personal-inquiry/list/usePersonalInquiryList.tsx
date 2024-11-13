import { useDispatch } from 'react-redux';

import { PersonalInquiryListNoticeItem } from './types';
import { addItems, setLoading } from './slice';
import { fetchPersonalInquiryNotices } from '../../../shared/api';

export default function usePersonalInquiryList() {
  const dispatch = useDispatch();

  const loadPersonalInquiryNoticeList = async () => {
    dispatch(setLoading(true));

    try {
      const data = await fetchPersonalInquiryNotices();
      const inquiryNotices: PersonalInquiryListNoticeItem[] = data.map((it) => ({
        id: it.id,
        type: 'NOTICE',
        date: it.createdDateTime,
        title: it.subject,
        contents: it.contents,
      }));

      dispatch(addItems(inquiryNotices));
    } catch (err) {
      throw Error(err);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { loadPersonalInquiryNoticeList };
}
