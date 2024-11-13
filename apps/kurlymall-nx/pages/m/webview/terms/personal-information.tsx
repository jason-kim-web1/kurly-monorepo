import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Terms from '../../../../src/shared/components/layouts/Terms';

import { loadPersonalInformationTerms } from '../../../../src/shared/reducers/terms';
import { AppState } from '../../../../src/shared/store';

export default function PersonalinformationTermsPage() {
  const dispatch = useDispatch();
  const { personalInformationTermsHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadPersonalInformationTerms());
  }, [dispatch]);

  if (!personalInformationTermsHTML) {
    return null;
  }

  return <Terms html={personalInformationTermsHTML} />;
}
