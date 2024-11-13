import { useState } from 'react';

import { isEmpty } from 'lodash';

import styled from '@emotion/styled';

import RequestForm from '../components/RequestForm';
import ResultForm from '../components/ResultForm';
import { usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';

const Wrapper = styled.div`
  ::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

interface Props {
  handleClosePersonalBoxForm: () => void;
}
export default function FormContainer({ handleClosePersonalBoxForm }: Props) {
  const { data: personalBox } = usePersonalBox('always');
  const [hasResult, setHasResult] = useState(!isEmpty(personalBox?.requestState));
  const handleChangeResultForm = (changeResultForm: boolean) => {
    setHasResult(changeResultForm);
  };
  return (
    <Wrapper data-testid="form-container">
      {hasResult ? (
        <ResultForm
          handleClosePersonalBoxForm={handleClosePersonalBoxForm}
          handleChangeResultForm={handleChangeResultForm}
        />
      ) : (
        <RequestForm
          handleClosePersonalBoxForm={handleClosePersonalBoxForm}
          handleChangeResultForm={handleChangeResultForm}
        />
      )}
    </Wrapper>
  );
}
