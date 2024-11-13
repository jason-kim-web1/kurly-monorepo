import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import useProductInquiryForm from '../../hooks/useProductInquiryForm';
import InquiryFormInputSubject from './InquiryFormInputSubject';
import COLOR from '../../../../../shared/constant/colorset';
import InquiryFormInputContent from './InquiryFormInputContent';
import InquiryFormSecretCheckbox from './InquiryFormSecretCheckbox';
import InquiryFormSubmitButton from './InquiryFormSubmitButton';
import InquiryFormNoticeModal from './InquiryFormNoticeModal';
import { useAppSelector } from '../../../../../shared/store';
import { isWebview } from '../../../../../../util/window/getDevice';
import appService from '../../../../../shared/services/app.service';
import { redirectTo } from '../../../../../shared/reducers/page';
import { getPageUrl, PRODUCT_PATH } from '../../../../../shared/constant';
import { setInquiryFormValues } from '../../../../detail/slice';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 15px;
  color: ${COLOR.kurlyGray800};
  font-weight: 500;
  line-height: 20px;
`;

interface Props {
  productNo: number;
  productName: string;
}

export default function ProductInquiryFormContainer({ productNo, productName }: Props) {
  const [openNoticeModal, setOpenNoticeModal] = useState(true);
  const { inquiry } = useAppSelector(({ productDetail }) => productDetail);
  const { subject, content, isSecret } = inquiry.form;
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (isWebview()) {
      appService.closeWebview({
        refresh: true,
      });
      return;
    }

    dispatch(redirectTo({ url: getPageUrl(PRODUCT_PATH.detail) + `/${productNo}` }));
  };

  const { values, handleChange, handleSubmit, errors } = useProductInquiryForm({
    productNo,
    onSubmit,
    initialValues: {
      subject: subject ?? '',
      content: content ?? '',
      isSecret: isSecret,
    },
  });

  useEffect(() => {
    dispatch(setInquiryFormValues(values));
  }, [dispatch, values]);

  return (
    <>
      <Container>
        <Title>{productName}</Title>
        <InquiryFormInputSubject value={values.subject} onChange={handleChange} />
        <InquiryFormInputContent value={values.content} onChange={handleChange} />
        <InquiryFormSecretCheckbox value={values.isSecret} onChange={handleChange} />
        <InquiryFormSubmitButton onSubmit={handleSubmit} errors={errors} />
      </Container>
      <InquiryFormNoticeModal open={openNoticeModal} onClose={() => setOpenNoticeModal(false)} />
    </>
  );
}
