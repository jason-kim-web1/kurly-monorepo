import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import dynamic from 'next/dynamic';

import styled from '@emotion/styled';

import { AppState } from '../../../../src/shared/store';
import { loadPrivacyPolicyOptionalHTML } from '../../../../src/shared/reducers/terms';

const Terms = dynamic(() => import('../../../../src/shared/components/layouts/Terms'), { ssr: false });

const Container = styled.div`
  max-width: 1050px;
  padding: 20px;
  margin: auto;
`;

export default function PrivacyPolicyOptionalPage() {
  const dispatch = useDispatch();
  const { privacyPolicyOptionalHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadPrivacyPolicyOptionalHTML());
  }, [dispatch]);

  if (!privacyPolicyOptionalHTML) {
    return null;
  }

  return (
    <Container>
      <Terms html={privacyPolicyOptionalHTML} />
    </Container>
  );
}
