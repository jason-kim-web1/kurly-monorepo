import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Terms from '../../../../src/shared/components/layouts/Terms';

import { loadPgTermsHTML } from '../../../../src/shared/reducers/terms';
import { AppState } from '../../../../src/shared/store';

export default function PaymentTermsPage() {
  const dispatch = useDispatch();
  const { pgTermsHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadPgTermsHTML());
  }, [dispatch]);

  if (!pgTermsHTML) {
    return null;
  }

  return <Terms html={pgTermsHTML} />;
}
