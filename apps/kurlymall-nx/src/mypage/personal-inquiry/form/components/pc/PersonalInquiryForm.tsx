import styled from '@emotion/styled';
import { useSelector } from 'react-redux';

import { AppState } from '../../../../../shared/store';

import InputInquiryCategoryContainer from './input/InputInquiryCategoryContainer';
import InputOrderProduct from './input/InputOrderProduct';
import InputSubject from './input/InputSubject';
import InputTextArea from './input/InputTextArea';
import InputReceiveNotificationCheck from './input/InputReceiveNotificationCheck';
import RegisterFormBottom from './RegisterFormBottom';

import usePersonalInquiryFrom from '../../hooks/usePersonalInquiryFrom';
import InputUserImages from './input/InputUserImages';

const Container = styled.div`
  width: 820px;
  padding: 4px 20px;
  border-top: 2px solid #333333;
`;

export default function PersonalInquiryForm() {
  const formState = useSelector((state: AppState) => state.personalInquiryForm);

  const { mode, orderProductType, memberMobileMasked, draft, userImages, loading } = formState;

  const { handleChange, values, handleSubmit, onError, activeSubmitButton } = usePersonalInquiryFrom(formState);

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <InputInquiryCategoryContainer
          inquiryTypeCode={values.inquiryCategory}
          inquiryTypeSubCode={values.inquirySubCategory}
          onChange={handleChange}
          mode={mode}
        />
        {orderProductType !== 'NONE' && <InputOrderProduct orderProductType={orderProductType} />}
        <InputSubject subject={values.subject} onChange={handleChange} />
        <InputTextArea contents={values.contents} onChange={handleChange} />
        {!loading && <InputUserImages userImages={userImages} draftId={draft.id} />}
        <InputReceiveNotificationCheck
          memberMobileMasked={memberMobileMasked}
          checked={values.allowsNotification}
          handleChange={handleChange}
        />
        <RegisterFormBottom onError={onError} active={activeSubmitButton} />
      </form>
    </Container>
  );
}
