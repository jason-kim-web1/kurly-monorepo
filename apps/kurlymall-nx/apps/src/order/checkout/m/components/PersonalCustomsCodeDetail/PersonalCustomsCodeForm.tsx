import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import OpenCustomsSiteButton from './OpenCustomsSiteButton';
import PersonalCustomsCodeDescription from './PersonalCustomsCodeDescription';
import PersonalCustomsCodeTerms from './PersonalCustomsCodeTerms';
import PersonalCustomsCodeAgreeCheckbox from './PersonalCustomsCodeAgreeCheckbox';
import SaveButton from './SaveButton';
import PersonalCustomsCodeInput from './PersonalCustomsCodeInput';
import usePersonalCustomsCodeForm from '../../../shared/hooks/usePersonalCustomsCodeForm';
import Loading from '../../../../../shared/components/Loading/Loading';

const Wrapper = styled.div`
  padding: 24px 20px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
`;

const Emphasis = styled.span`
  color: ${COLOR.loversPurple};
`;

const PersonalCustomsCodeForm = () => {
  const {
    isLoading,
    isAgreed,
    showAgreeCheckbox,
    disabledSaveButton,
    editingPersonalCustomsCode,
    handleChange,
    handleClickCheckbox,
    handleSubmit,
  } = usePersonalCustomsCodeForm();

  if (isLoading) {
    return <Loading testId="loading" />;
  }

  return (
    <>
      <Wrapper>
        <Title>
          <Emphasis>받는 분</Emphasis>의 개인통관고유부호를
          <br />
          입력해 주세요.
        </Title>
        <PersonalCustomsCodeInput value={editingPersonalCustomsCode} onChange={handleChange} />
        <OpenCustomsSiteButton />
        <PersonalCustomsCodeDescription />
        <PersonalCustomsCodeTerms />
        {showAgreeCheckbox && <PersonalCustomsCodeAgreeCheckbox isAgreed={isAgreed} onClick={handleClickCheckbox} />}
        <SaveButton disabled={disabledSaveButton} onSubmit={handleSubmit} />
      </Wrapper>
    </>
  );
};

export default PersonalCustomsCodeForm;
