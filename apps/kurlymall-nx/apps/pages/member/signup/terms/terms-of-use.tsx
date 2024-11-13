import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import dynamic from 'next/dynamic';

import styled from '@emotion/styled';

import { AppState } from '../../../../src/shared/store';
import { loadTermsOfUseHTML } from '../../../../src/shared/reducers/terms';

const Terms = dynamic(() => import('../../../../src/shared/components/layouts/Terms'), { ssr: false });

const Container = styled.div`
  max-width: 1050px;
  padding: 20px;
  margin: auto;
`;

export default function TermsOfUsePage() {
  const dispatch = useDispatch();
  const { termsOfUseHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    dispatch(loadTermsOfUseHTML());
  }, [dispatch]);

  if (!termsOfUseHTML) {
    return null;
  }

  return (
    <Container>
      <Terms html={termsOfUseHTML} />
    </Container>
  );
}
