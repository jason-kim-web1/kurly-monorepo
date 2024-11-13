import { ReactNode, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { initState, setError } from '../slice';

import usePersonalInquiryList from '../usePersonalInquiryList';

interface Props {
  children: ReactNode;
}

export default function PersonalInquiryListContainer({ children }: Props) {
  const dispatch = useDispatch();
  const { loadPersonalInquiryNoticeList } = usePersonalInquiryList();

  useEffect(() => {
    dispatch(initState());
    loadPersonalInquiryNoticeList().catch(() => {
      dispatch(setError(true));
    });
  }, [dispatch]);

  return <>{children}</>;
}
