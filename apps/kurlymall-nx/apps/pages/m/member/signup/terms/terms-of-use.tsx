import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import dynamic from 'next/dynamic';

import { AppState } from '../../../../../src/shared/store';
import { loadTermsOfUseHTML } from '../../../../../src/shared/reducers/terms';

const Terms = dynamic(() => import('../../../../../src/shared/components/layouts/Terms'), { ssr: false });

export default function TermsOfUsePage() {
  const dispatch = useDispatch();
  const { termsOfUseHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadTermsOfUseHTML());
  }, [dispatch]);

  if (!termsOfUseHTML) {
    return null;
  }

  return <Terms html={termsOfUseHTML} />;
}
