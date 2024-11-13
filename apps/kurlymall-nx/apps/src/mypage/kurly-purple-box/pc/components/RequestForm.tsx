import styled from '@emotion/styled';

import { useCallback } from 'react';

import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { useQueryClient } from '@tanstack/react-query';

import Checkbox from '../../../../shared/components/Input/Checkbox';
import Alert from '../../../../shared/components/Alert/Alert';
import { ERROR_MESSAGE, MAXIMUN_IMAGE_FILE_SIZE, TERMS_OF_REQUEST } from '../../shared/constants/requestConstant';

import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';
import usePersonalBoxAlertText from '../../shared/hooks/usePersonalBoxAlertText';
import ZoomImageLayer from './ZoomImageLayer';
import { PERSONAL_BOX_NOTICE } from '../../shared/constants/userGuideText';

import { Close } from '../../../../shared/icons';
import { usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import { PERSONAL_BOX, PERSONAL_BOX_COMPLETE_REQUEST } from '../../shared/utils/kurlyPurpleBoxQueryKey';
import usePersonalBoxRequest from '../../shared/hooks/usePersonalBoxRequest';
import { updatePersonalBox } from '../../../../shared/services/kurlyPurpleBox.service';
import useImageFileUploader from '../../../../shared/hooks/useImageFileUploader';
import { ICON_CAMERA_PC } from '../../shared/constants/imageUrl';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 440px;
  padding: 30px;
  margin: 0 auto;
  background: ${COLOR.kurlyWhite};
  border-radius: 12px;
  z-index: 10;
  box-sizing: border-box;
  text-align: left;
`;

const Title = styled.p`
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 32px;
`;

const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 32px;
`;

const UploadImage = styled.div<{ imageSrc: string }>`
  width: 150px;
  height: 150px;
  background: ${COLOR.kurlyGray100} url(${ICON_CAMERA_PC}) no-repeat 50% 50%;
  ${({ imageSrc }) =>
    !isEmpty(imageSrc) &&
    css`
      cursor: zoom-in;
      background-image: url(${imageSrc});
    `}
`;

const UploadTitle = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 17px;
`;

const UploadLabel = styled.label<{ hasFile: boolean }>`
  width: 100px;
  height: 36px;
  line-height: 34px;
  display: block;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  ${({ hasFile }) =>
    !hasFile &&
    css`
      color: ${COLOR.kurlyPurple};
    `};
  border: 1px solid ${({ hasFile }) => (hasFile ? COLOR.lightGray : COLOR.kurlyPurple)};
  border-radius: 3px;
`;

const UploadButton = styled.input`
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const NoticeWrapper = styled.ul`
  padding: 20px 0;
  border-bottom: 1px solid ${COLOR.bg};
`;

const Notice = styled.li`
  position: relative;
  line-height: 20px;
  color: ${COLOR.kurlyGray500};
  padding-left: 12px;
  ::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 0;
    width: 3px;
    height: 3px;
    background: ${COLOR.kurlyGray350};
  }
`;

const Terms = styled.p`
  margin-bottom: 20px;
  line-height: 20px;
  color: ${COLOR.kurlyGray600};
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 55px;
  height: 55px;
`;

const CloseButtonText = styled.p`
  font-size: 0;
  line-height: 0;
`;

interface Props {
  handleClosePersonalBoxForm: () => void;
  handleChangeResultForm: (changeResultForm: boolean) => void;
}

export default function RequestForm({ handleClosePersonalBoxForm, handleChangeResultForm }: Props) {
  const queryClient = useQueryClient();

  const { data: personalBox } = usePersonalBox();
  const { message } = usePersonalBoxAlertText(personalBox?.imageUrl);
  const { images, uploadImage, clearImages } = useImageFileUploader({
    maxFileSize: MAXIMUN_IMAGE_FILE_SIZE,
    allowFileDuplication: false,
    onUploadError: ({ type }) =>
      Alert({
        text:
          type === 'MAX_FILE_SIZE' ? '15MB 미만 용량의 이미지만 등록 가능합니다.' : '이미지를 업로드 할 수 없습니다.',
      }).then(() => {}),
  });
  const {
    hasImage,
    isOpen: isOpenZoomImageLayer,
    toggle: toggleZoomImageLayer,
    isChecked,
    handleChangeTermState,
    imageSrc,
    uploadImageFile,
    handleOpenZoomImageLayer,
  } = usePersonalBoxRequest(images);

  const handleRequestPersonalBox = useCallback(async () => {
    const response = await Alert({
      text: message,
      showCancelButton: true,
      allowOutsideClick: false,
    });
    if (response.isConfirmed) {
      await updatePersonalBox(uploadImageFile)
        .then(async () => {
          await queryClient.invalidateQueries(PERSONAL_BOX);
          queryClient.setQueryData(PERSONAL_BOX_COMPLETE_REQUEST, true);
          handleChangeResultForm(true);
        })
        .catch(async () => {
          await Alert({
            text: ERROR_MESSAGE,
          });
          clearImages();
        });
    }
    return;
  }, [handleChangeResultForm, clearImages, message, queryClient, uploadImageFile]);

  return (
    <Wrapper>
      <Title>개인 보냉 박스</Title>
      <CloseButton onClick={handleClosePersonalBoxForm} type="button">
        <CloseButtonText>개인 보냉박스 신청 닫기</CloseButtonText>
        <Close />
      </CloseButton>
      {isOpenZoomImageLayer && <ZoomImageLayer closeZoomLayer={toggleZoomImageLayer} zoomImage={imageSrc} />}
      <UploadWrapper>
        <UploadImage imageSrc={imageSrc} onClick={handleOpenZoomImageLayer} data-testid="upload-image" />
        <div>
          <UploadTitle>
            보냉기능이 있는
            <br />
            박스 사진을 등록해주세요.
          </UploadTitle>
          <UploadLabel htmlFor="uploadImage" hasFile={hasImage}>
            {hasImage ? '사진 편집' : '사진 등록'}
          </UploadLabel>
          <UploadButton type="file" id="uploadImage" onChange={uploadImage} accept="image/*" />
        </div>
      </UploadWrapper>
      <NoticeWrapper>
        {PERSONAL_BOX_NOTICE.map((description, index) => (
          <Notice key={`Notice-description-${index}`}>{description}</Notice>
        ))}
      </NoticeWrapper>
      <Checkbox label="개인 책임 안내 동의" checked={isChecked} onChange={handleChangeTermState} />
      <Terms>{TERMS_OF_REQUEST}</Terms>
      <Button theme="primary" text="신청하기" disabled={!isChecked || !hasImage} onClick={handleRequestPersonalBox} />
    </Wrapper>
  );
}
