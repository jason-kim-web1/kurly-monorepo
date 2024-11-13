import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import OpenCustomsSiteButton from './OpenCustomsSiteButton';
import PersonalCustomsCodeDescription from './PersonalCustomsCodeDescription';
import PersonalCustomsCodeTerms from './PersonalCustomsCodeTerms';
import PersonalCustomsCodeAgreeCheckbox from './PersonalCustomsCodeAgreeCheckbox';
import BottomButtons from './BottomButtons';
import PersonalCustomsCodeInput from './PersonalCustomsCodeInput';
import usePersonalCustomsCodeForm from '../../../shared/hooks/usePersonalCustomsCodeForm';
import Loading from '../../../../../shared/components/Loading/Loading';

const Wrapper = styled.div`
  padding: 30px;
  input {
    font-size: 14px;
    ::placeholder {
      color: ${COLOR.kurlyGray350};
    }
  }
`;

const Title = styled.h2`
  font-size: 24px;
  color: ${COLOR.kurlyGray800};
  font-weight: 500;
  margin-bottom: 30px;
`;

const PersonalCustomsCodeForm = () => {
  const {
    isLoading,
    isAgreed,
    showAgreeCheckbox,
    disabledSaveButton,
    editingPersonalCustomsCode,
    handleClickCheckbox,
    handleChange,
    handleSubmit,
  } = usePersonalCustomsCodeForm();

  if (isLoading) {
    return <Loading testId="loading" />;
  }

  return (
    <Wrapper>
      <Title>개인통관고유부호</Title>
      <PersonalCustomsCodeInput value={editingPersonalCustomsCode} onChange={handleChange} />
      <OpenCustomsSiteButton />
      <PersonalCustomsCodeDescription />
      <PersonalCustomsCodeTerms />
      {showAgreeCheckbox && <PersonalCustomsCodeAgreeCheckbox isAgreed={isAgreed} onClick={handleClickCheckbox} />}
      <BottomButtons disabledSaveButton={disabledSaveButton} onSubmit={handleSubmit} />
    </Wrapper>
  );
};

export default PersonalCustomsCodeForm;
