import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';

import { clearError, setCategory } from '../slice';
import SelectWithModal from '../../../shared/components/Input/SelectWithModal';
import Alert from '../../../shared/components/Alert/Alert';
import { AppState } from '../../../shared/store';
import useFaqCategoryQuery from '../../../board/hooks/useFaqCategoryQuery';
import { FAQ_ADD_CATEGORY } from '../../../shared/api/board/faq';
import useScrollTopFocus from '../../../shared/hooks/useScrollTopFocus';

export default function FaqCategoryContainer() {
  const dispatch = useDispatch();

  const { category, error } = useSelector(({ faq }: AppState) => faq);

  const { faqMobileCategory } = useFaqCategoryQuery();

  useScrollTopFocus();

  useEffect(() => {
    dispatch(setCategory(FAQ_ADD_CATEGORY[1]));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      Alert({ text: error }).catch();
      dispatch(clearError());
    }
  }, [dispatch, error]);

  const handleSelect = (inquiryCategory: { name: string; value: string }) => {
    dispatch(setCategory(inquiryCategory));
    window.scrollTo(0, 0);
  };

  return (
    <SelectWithModal title="문의 유형 선택" value={category} onSelect={handleSelect} options={faqMobileCategory} />
  );
}
