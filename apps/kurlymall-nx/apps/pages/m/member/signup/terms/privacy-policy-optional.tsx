import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import dynamic from 'next/dynamic';

import { AppState } from '../../../../../src/shared/store';
import { loadPrivacyPolicyOptionalHTML } from '../../../../../src/shared/reducers/terms';

const Terms = dynamic(() => import('../../../../../src/shared/components/layouts/Terms'), { ssr: false });

export default function PrivacyPolicyOptionalPage() {
  const dispatch = useDispatch();
  const { privacyPolicyOptionalHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadPrivacyPolicyOptionalHTML());
  }, [dispatch]);

  if (!privacyPolicyOptionalHTML) {
    return null;
  }

  return <Terms html={privacyPolicyOptionalHTML} />;
}
