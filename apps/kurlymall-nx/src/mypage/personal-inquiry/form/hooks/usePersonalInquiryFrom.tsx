import { FormikErrors, FormikValues, useFormik } from 'formik';

import { useDispatch } from 'react-redux';

import Alert from '../../../../shared/components/Alert/Alert';
import { PersonalInquiryFormState } from '../slice';
import { PersonalInquiryFormProps, validatePersonalInquiryForm } from '../shared/PersonalInquiryInputValidation';
import { removePersonalInquirySessionData } from '../../service/PersonalInquiryDataStorage';
import { postPersonalInquiryItem, updatePersonalInquiryItem } from '../../../../shared/api';
import { redirectTo } from '../../../../shared/reducers/page';
import { INQUIRY_PATH, getPageUrl } from '../../../../shared/constant';

export default function usePersonalInquiryFrom(formState: PersonalInquiryFormState) {
  const { draft, mode, inquiryTypeCode, inquiryTypeSubCode, allowsNotification } = formState;

  const dispatch = useDispatch();

  const handleSubmitPersonalInquiryForm = async (values: FormikValues) => {
    const { selectedOrderProducts } = formState.orderProductPicker;

    const orderProductRequiredType = formState.orderProductType === 'ALL' || formState.orderProductType === 'EACH';

    if (orderProductRequiredType && selectedOrderProducts.length === 0) {
      await Alert({ text: '문의하실 상품을 선택해주세요.' });
      return;
    }

    const params = {
      id: draft.id,
      oneToOneInquiryNo: draft.id,
      subject: values.subject,
      contents: values.contents,
      inquiryTypeCode: values.inquiryCategory,
      inquiryTypeSubCode: values.inquirySubCategory,
      allowsNotification: values.allowsNotification,
      orderNo: selectedOrderProducts[0]?.orderNo ?? 0,
      orderProducts: selectedOrderProducts.map((product) => ({
        contentsProductNo: product.contentsProductNo,
        contentsProductName: product.contentsProductName,
        dealProductNo: product.dealProductNo,
        dealProductName: product.dealProductName,
        quantity: product.quantity,
        productPrice: product.paymentAmount,
        imageUrl: product.imageUrl,
        orderedAt: product.orderedDatetime,
      })),
    };

    try {
      if (mode === 'NEW') {
        await postPersonalInquiryItem(params);
      } else {
        await updatePersonalInquiryItem(draft.id, params);
        removePersonalInquirySessionData();
      }

      const successMessage = mode === 'NEW' ? '1:1 문의가 정상적으로 접수되었습니다.' : '정상적으로 수정되었습니다';

      await Alert({ text: successMessage });

      dispatch(
        redirectTo({
          url: getPageUrl(INQUIRY_PATH.inquiry),
          replace: true,
        }),
      );
    } catch (err) {
      const errorMessage =
        mode === 'NEW'
          ? '1:1문의 등록에 실패하였습니다. \n 다시 시도 부탁 드리겠습니다.'
          : '1:1문의 수정에 실패하였습니다. \n 다시 시도 부탁 드리겠습니다.';

      await Alert({ text: errorMessage });
    }
  };

  const initialValues = {
    inquiryCategory: inquiryTypeCode,
    inquirySubCategory: inquiryTypeSubCode,
    allowsNotification,
    subject: draft.subject,
    contents: draft.contents,
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validate: validatePersonalInquiryForm,
    onSubmit: handleSubmitPersonalInquiryForm,
  });

  const { handleSubmit, handleChange, values, isSubmitting, errors } = formik;
  const errorKeys = Object.keys(errors) as (keyof FormikErrors<PersonalInquiryFormProps>)[];

  const onError = async () => {
    const hasError = errorKeys.length > 0;
    if (hasError) {
      const errorMessages = errorKeys.map((key) => errors[key]).filter((message) => message);

      if (errorMessages.length > 0) {
        await Alert({ text: errorMessages[0] });
      }
    }
  };

  const activeSubmitButton = !!(values.inquiryCategory && values.inquirySubCategory) && !isSubmitting;

  return {
    handleSubmit,
    handleChange,
    values,
    onError,
    activeSubmitButton,
  };
}
