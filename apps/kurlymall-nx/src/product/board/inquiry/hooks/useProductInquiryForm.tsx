import { useFormik } from 'formik';

import { useDispatch } from 'react-redux';

import * as Yup from 'yup';

import { postProductInquiryItem } from '../../../detail/slice';
import { notify } from '../../../../shared/reducers/page';
import Alert from '../../../../shared/components/Alert/Alert';

const validationSchema = Yup.object().shape({
  subject: Yup.string().required(),
  content: Yup.string().required(),
});

interface Props {
  productNo: number;
  onSubmit(): void;
  initialValues: {
    subject: string;
    content: string;
    isSecret: boolean;
  };
}

export default function useProductInquiryForm({ productNo, onSubmit, initialValues }: Props) {
  const dispatch = useDispatch();

  const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<{
    subject: string;
    content: string;
    isSecret: boolean;
  }>({
    initialValues: {
      subject: initialValues.subject,
      content: initialValues.content,
      isSecret: initialValues.isSecret,
    },
    initialErrors: { subject: 'empty', content: 'empty' },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async ({ subject, content, isSecret }) => {
      try {
        dispatch(
          postProductInquiryItem({
            productNo,
            subject,
            content,
            isSecret,
          }),
        );
        await Alert({ text: '문의가 정상적으로 등록되었습니다.' });
        onSubmit();
        resetForm();
      } catch (err) {
        dispatch(notify(err.message));
      }
    },
  });

  return { values, handleChange, handleSubmit, errors };
}
