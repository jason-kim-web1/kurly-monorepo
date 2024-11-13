import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import dynamic from 'next/dynamic';

import { AppState } from '../../../../../src/shared/store';
import { loadPrivacyPolicyHTML } from '../../../../../src/shared/reducers/terms';

const Terms = dynamic(() => import('../../../../../src/shared/components/layouts/Terms'), { ssr: false });

export default function PrivacyPolicyPage() {
  const dispatch = useDispatch();
  const { privacyPolicyHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadPrivacyPolicyHTML());
  }, [dispatch]);

  if (!privacyPolicyHTML) {
    return null;
  }

  return <Terms html={privacyPolicyHTML} />;
}
