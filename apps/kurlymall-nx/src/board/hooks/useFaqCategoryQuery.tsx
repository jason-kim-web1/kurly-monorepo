import { useQuery } from '@tanstack/react-query';

import { FAQ_TYPE, FAQ_ADD_CATEGORY, FaqListInterface, fetchFaqCategory } from '../../shared/api/board/faq';

const STALE_TIME = 1000 * 60 * 60;

const getData = (data?: FaqListInterface[]): FaqListInterface[] => {
  if (!data) {
    return [];
  }
  return data;
};

// 결합된 배열의 인덱스 값을 다시 체크한다.
const getFaqCategory = (data: FaqListInterface[]) => {
  return data.map((faq, index) => ({
    ...faq,
    id: index,
  }));
};

export default function useFaqCategoryQuery() {
  const queryKey = ['board', 'faq-category'];
  const queryResult = useQuery(queryKey, fetchFaqCategory, {
    staleTime: STALE_TIME,
  });
  const { data } = queryResult;
  const faqCategory = getData(data);
  const faqPCCategory = getFaqCategory([...FAQ_ADD_CATEGORY, ...faqCategory]);
  const faqMobileCategory = getFaqCategory(faqPCCategory.filter((faq) => faq.value !== FAQ_TYPE.all));

  return { ...queryResult, queryKey, faqPCCategory, faqMobileCategory };
}
