import { useContext } from 'react';

import { siteCategorySelectedCodeContext } from '../providers/SiteCategorySelectedCodeProvider';

export default function useSiteCategorySelectedCode() {
  const ctx = useContext(siteCategorySelectedCodeContext);

  if (ctx === undefined) {
    throw Error('useSiteCategorySelectedCodeProvider는 <SiteCategorySelectedCodeProvider />와 함께 쓰여야합니다.');
  }

  return ctx;
}
