import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import InquirySubmitButton from './input/InquirySubmitButton';
import { closeNoticeModal } from '../../slice';
import Loading from '../../../../../shared/components/Loading/Loading';
import InputInquiryCategoryContainer from './input/InputInquiryCategoryContainer';
import InputOrderProduct from './input/InputOrderProduct';
import InputInquiryContent from './input/InputInquiryContent';

import InputReceiveNotificationCheck from './input/InputReceiveNotificationCheck';
import PersonalInquiryAgreeTermsModal from './PersonalInquiryAgreeTermsModal';
import { AppState } from '../../../../../shared/store';
import usePersonalInquiryFrom from '../../hooks/usePersonalInquiryFrom';
import InputUserImages from './input/InputUserImages';

const FormInputContainer = styled.div`
  padding: 0 0.5rem;
`;

export default function PersonalInquiryForm() {
  const formState = useSelector((state: AppState) => state.personalInquiryForm);

  const { loading, draft, orderProductType, displayNotice, mode, userImages, memberMobileMasked } = formState;

  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, onError, activeSubmitButton } = usePersonalInquiryFrom(formState);

  return (
    <>
      {loading && <Loading />}
      <form onSubmit={handleSubmit}>
        <FormInputContainer>
          <InputInquiryCategoryContainer
            inquiryTypeCode={values.inquiryCategory}
            inquiryTypeSubCode={values.inquirySubCategory}
            handleChange={handleChange}
            mode={mode}
          />
          {orderProductType !== 'NONE' && <InputOrderProduct orderProductType={orderProductType} />}
          <InputInquiryContent subject={values.subject} contents={values.contents} handleChange={handleChange} />
          {!loading && <InputUserImages userImages={userImages} draftId={draft.id} />}
          <InputReceiveNotificationCheck
            memberMobileMasked={memberMobileMasked}
            checked={values.allowsNotification}
            handleChange={handleChange}
          />
        </FormInputContainer>
        <InquirySubmitButton onError={onError} active={activeSubmitButton} />
      </form>
      <PersonalInquiryAgreeTermsModal open={displayNotice} onClose={() => dispatch(closeNoticeModal())} />
    </>
  );
}
