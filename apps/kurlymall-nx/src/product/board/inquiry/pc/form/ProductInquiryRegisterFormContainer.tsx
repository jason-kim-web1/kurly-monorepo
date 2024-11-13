import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Dialog, DialogContent } from '@material-ui/core';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { redirectToLogin } from '../../../../../shared/reducers/page';
import RegisterFormHeader from './RegisterFormHeader';
import RegisterFormProductInfo from './RegisterFormProductInfo';
import RegisterFormInputSubject from './RegisterFormInputSubject';
import RegisterFormInputContent from './RegisterFormInputContent';
import RegisterFormBottom from './RegisterFormBottom';
import RegisterFormSecretInquiryCheck from './RegisterFormSecretInquiryCheck';
import COLOR from '../../../../../shared/constant/colorset';
import useProductInquiryForm from '../../hooks/useProductInquiryForm';
import { useAppSelector } from '../../../../../shared/store';
import { reloadProductInquiryBoard, setInquiryFormValues } from '../../../../detail/slice';
import { amplitudeService } from '../../../../../shared/amplitude';
import { SelectBackButton } from '../../../../../shared/amplitude/events/product/SelectBackButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 690px;
  padding: 30px;
  background: ${COLOR.kurlyWhite};
`;

const dialog = css`
  .MuiPaper-root {
    max-width: fit-content;
    border-radius: 12px;
  }
  .MuiPaper-elevation24 {
    box-shadow: none;
  }
`;

const contentStyle = css`
  &.MuiDialogContent-root {
    padding: 0;
    &:first-of-type {
      padding: 0;
    }
  }
`;

interface Props {
  productNo: number;
  productName: string;
  productImageUrl: string;
  open: boolean;
  isGuest: boolean;
  onClose(): void;
}

export default function ProductInquiryRegisterFormContainer({
  productNo,
  productName,
  productImageUrl,
  open,
  isGuest,
  onClose,
}: Props) {
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);
  const {
    inquiry: { form },
  } = productDetailState;
  const { subject, content, isSecret } = form;

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(reloadProductInquiryBoard());
    onClose();
  };

  const onClickClose = (cancelType: string) => {
    amplitudeService.logEvent(new SelectBackButton({ productDetailState, cancelType }));
    onClose();
  };

  const { values, handleChange, handleSubmit, errors } = useProductInquiryForm({
    productNo,
    onSubmit,
    initialValues: { subject, content, isSecret },
  });

  useEffect(() => {
    if (open && isGuest) {
      dispatch(redirectToLogin());
    }
  }, [open, isGuest, dispatch]);

  useEffect(() => {
    dispatch(setInquiryFormValues(values));
  }, [dispatch, values]);

  if (isGuest) {
    return null;
  }

  return (
    <Dialog css={dialog} open={open} fullWidth>
      <DialogContent css={contentStyle}>
        <Container>
          <RegisterFormHeader onClose={() => onClickClose('X')} />
          <RegisterFormProductInfo imageUrl={productImageUrl} productName={productName} />
          <RegisterFormInputSubject value={values.subject} onChange={handleChange} />
          <RegisterFormInputContent value={values.content} onChange={handleChange} />
          <RegisterFormSecretInquiryCheck onChange={handleChange} checked={values.isSecret} />
          <RegisterFormBottom
            onClickSubmit={handleSubmit}
            onClickCancel={() => onClickClose('cancel')}
            errors={errors}
          />
        </Container>
      </DialogContent>
    </Dialog>
  );
}
