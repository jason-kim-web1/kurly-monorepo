import { useCallback, useState } from 'react';

export enum TermsMap {
  User = 'user-terms',
  KurlyMembers = 'kurly-members-terms',
}

export const termsArray = [
  { title: '컬리 이용약관', id: TermsMap.User },
  { title: '컬리멤버스 서비스 이용약관', id: TermsMap.KurlyMembers },
];

export const useScrollTerms = ({ headerHeight }: { headerHeight: number }) => {
  const [activeTerms, setActiveTerms] = useState<TermsMap>(TermsMap.User);

  const scrollToTerms = useCallback(
    (id: TermsMap) => () => {
      setActiveTerms(id);

      const selectedTerm = document.getElementById(id);
      if (selectedTerm) {
        scrollTo({ top: selectedTerm.offsetTop - headerHeight, behavior: 'smooth' });
      }
    },
    [headerHeight],
  );

  return { activeTerms, scrollToTerms };
};
