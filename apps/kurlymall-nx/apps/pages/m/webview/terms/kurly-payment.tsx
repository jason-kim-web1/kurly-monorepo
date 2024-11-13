import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Terms from '../../../../src/shared/components/layouts/Terms';

import { loadKurlyTermsHTML } from '../../../../src/shared/reducers/terms';
import { AppState } from '../../../../src/shared/store';

export default function KurlyTermsPage() {
  const dispatch = useDispatch();
  const { kurlyTermsHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadKurlyTermsHTML());
  }, [dispatch]);

  if (!kurlyTermsHTML) {
    return null;
  }

  return <Terms html={kurlyTermsHTML} />;
}
