import { isEmpty } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import { ModalProps } from '@mui/material/Modal';

import { InquiryProductItem } from '../../../services';
import COLOR from '../../../../../../shared/constant/colorset';
import { UpdateMutateParams } from '../../../hooks/useInquiryProductUpdateMutation';

import Close32x32 from '../../../../../../shared/components/icons/svg/Close32x32';
import Button from '../../../../../../shared/components/Button/Button';
import InputBox from '../../../../../../shared/components/Input/InputBox';
import MessageArea from '../../../../../../shared/components/Message/MessageTextArea';
import Checkbox from '../../../../../../shared/components/Input/Checkbox';
import Loading from './Loading';
import TextAreaPlaceHolder from './TextAreaPlaceHolder';
import NextImage from '../../../../../../shared/components/NextImage';

const Container = styled(Dialog)(() => ({
  '& .MuiDialog-paper': {
    padding: '30px',
    minWidth: '800px',
    minHeight: '690px',
    borderRadius: '12px',
  },
}));

const EditorContentWrap = styled.div`
  > .title-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 22px;
    border-bottom: 1px solid ${COLOR.bg};

    > .title-text {
      font-size: 24px;
      font-weight: 700;
      line-height: 30px;
      color: ${COLOR.kurlyGray800};
    }
  }

  > .image-row {
    padding: 20px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    border-bottom: 1px solid ${COLOR.bg};

    > .content-image-wrap {
      border-radius: 4px;
      overflow: hidden;
    }

    > .content-product-name-text {
      padding-left: 20px;
      display: -webkit-box;
      overflow: hidden;
      max-height: 44px;
      font-size: 16px;
      line-height: 22px;
      color: ${COLOR.kurlyGray800};
      margin-bottom: 4px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      letter-spacing: normal;
      word-break: keep-all;
      overflow-wrap: break-word;
    }
  }

  > .form-wrap {
    padding: 15px 0 15px 10px;
    > .form-row {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      margin-bottom: 16px;

      > .label {
        flex-basis: 100px;
        padding-left: 10px;
        font-size: 14px;
        line-height: 44px;
        font-weight: 700;
        color: ${COLOR.kurlyGray800};
      }

      > .field {
        flex: 1;
        > .text-area {
          .placeholder {
            overflow-y: auto;
            height: 226px;
            padding-bottom: 0;
            z-index: 1;
          }
        }
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  > .actions-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    border-top: 1px solid ${COLOR.bg};

    > button {
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;

interface Props {
  open: boolean;
  inquiryProductItem: InquiryProductItem | null;
  isLoading: boolean;
  onClose(): void;
  onSave(params: UpdateMutateParams): void;
}

const EditDialog = (props: Props) => {
  const { open, onClose, onSave, isLoading, inquiryProductItem } = props;
  const [formData, setFormData] = useState({
    contents: '',
    subject: '',
    isSecret: false,
  });
  const isFormValid = useMemo(() => {
    if (!formData) {
      return false;
    }
    const { subject, contents } = formData;
    return !(isEmpty(subject) || isEmpty(contents));
  }, [formData]);

  const handleClose: ModalProps['onClose'] = useCallback(
    (event, reason) => {
      if (reason === 'backdropClick') {
        return;
      }
      return onClose();
    },
    [onClose],
  );

  const handleClickClose = useCallback(() => onClose(), [onClose]);

  const handleChangeSubject = useCallback(
    ({ value }: { value: string }) =>
      setFormData(() => ({
        ...formData,
        subject: value,
      })),
    [formData],
  );

  const handleChangeContents = useCallback(
    (value: string) =>
      setFormData(() => ({
        ...formData,
        contents: value,
      })),
    [formData],
  );

  const handleToggleIsSecret = useCallback(
    () =>
      setFormData(() => ({
        ...formData,
        isSecret: !formData.isSecret,
      })),
    [formData],
  );

  const handleClickSave = useCallback(() => {
    if (!inquiryProductItem) {
      return;
    }
    const { id, contentProductNo } = inquiryProductItem;
    onSave({
      productNo: contentProductNo,
      contentId: id,
      formData,
    });
  }, [formData, inquiryProductItem, onSave]);

  const renderFormContent = () => {
    if (!inquiryProductItem) {
      return <Loading />;
    }
    const { contentProductName, listImageUrl } = inquiryProductItem;
    return (
      <>
        <div className="image-row">
          <div className="content-image-wrap">
            <NextImage width={72} height={72} src={listImageUrl} objectFit="cover" alt={contentProductName} />
          </div>
          <p className="content-product-name-text">{contentProductName}</p>
        </div>
        <form className="form-wrap">
          <div className="form-row">
            <span className="label">제목</span>
            <div className="field">
              <InputBox
                css={css`
                  padding: 0;
                `}
                value={formData.subject}
                onChange={handleChangeSubject}
                placeholder="제목을 입력해주세요."
              />
            </div>
          </div>
          <div className="form-row">
            <span className="label">내용</span>
            <div className="field">
              <MessageArea
                className="text-area"
                value={formData.contents}
                maxLength={5000}
                showCountText
                onChange={handleChangeContents}
                theme={{
                  height: 260,
                  textColor: COLOR.kurlyGray800,
                  placeholderColor: COLOR.placeholder,
                  backgroundColor: COLOR.kurlyWhite,
                  border: `solid 1px ${COLOR.lightGray}`,
                  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
                }}
              >
                <TextAreaPlaceHolder />
              </MessageArea>
              <Checkbox
                label="비밀글로 문의하기"
                name="checkboxIsSecret"
                id="checkbox-is-secret"
                onChange={handleToggleIsSecret}
                checked={formData.isSecret}
              />
            </div>
          </div>
        </form>
      </>
    );
  };

  useEffect(() => {
    if (!inquiryProductItem) {
      return;
    }
    const { subject, contents, isSecret } = inquiryProductItem;
    setFormData(() => ({
      subject,
      contents,
      isSecret,
    }));
  }, [inquiryProductItem]);

  return (
    <Container open={open} onClose={handleClose} disableEscapeKeyDown>
      <EditorContentWrap>
        <div className="title-row">
          <h4 className="title-text">상품 문의하기</h4>
          <button type="button" onClick={handleClickClose}>
            <Close32x32 />
          </button>
        </div>
        {renderFormContent()}
        <div className="actions-row">
          <Button
            type="button"
            text="취소"
            width={160}
            height={56}
            radius={4}
            theme="secondary"
            onClick={handleClickClose}
          />
          <Button
            type="button"
            disabled={!isFormValid || isLoading}
            text="등록"
            width={160}
            height={56}
            radius={4}
            theme="primary"
            onClick={handleClickSave}
          />
        </div>
      </EditorContentWrap>
    </Container>
  );
};

export default EditDialog;
