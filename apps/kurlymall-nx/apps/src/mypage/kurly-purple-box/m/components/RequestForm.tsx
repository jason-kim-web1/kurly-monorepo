import styled from '@emotion/styled';

import { useCallback } from 'react';

import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import Checkbox from '../../../../shared/components/Input/Checkbox';
import Alert from '../../../../shared/components/Alert/Alert';
import { ERROR_MESSAGE, MAXIMUN_IMAGE_FILE_SIZE, TERMS_OF_REQUEST } from '../../shared/constants/requestConstant';
import { KURLY_PURPLE_BOX_PATH, getPageUrl } from '../../../../shared/constant';
import COLOR from '../../../../shared/constant/colorset';
import Button from '../../../../shared/components/Button/Button';
import GuidelineDetail from './GuidelineDetail';
import MobileFooter from '../../../../shared/components/layouts/MobileFooter';
import { ArrowRight } from '../../../../shared/images';
import usePersonalBoxAlertText from '../../shared/hooks/usePersonalBoxAlertText';
import { useWebview } from '../../../../shared/hooks';
import ZoomImageLayer from './ZoomImageLayer';
import { PERSONAL_BOX_NOTICE } from '../../shared/constants/userGuideText';
import { ICON_CAMERA, ICON_CAMERA_SMALL } from '../../shared/constants/imageUrl';
import { usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import { PERSONAL_BOX, PERSONAL_BOX_COMPLETE_REQUEST } from '../../shared/utils/kurlyPurpleBoxQueryKey';
import usePersonalBoxRequest from '../../shared/hooks/usePersonalBoxRequest';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import { updatePersonalBox } from '../../../../shared/services/kurlyPurpleBox.service';
import { isWebview } from '../../../../../util/window/getDevice';
import appService from '../../../../shared/services/app.service';
import useImageFileUploader from '../../../../shared/hooks/useImageFileUploader';
import { redirectTo } from '../../../../shared/reducers/page';

const Wrapper = styled.div`
  padding: 20px;
`;

const UploadWrapper = styled.div`
  position: relative;
  margin-bottom: 18px;
  overflow: hidden;
  height: 222px;
`;

const UploadImage = styled.div<{ imageSrc: string }>`
  height: 100%;
  border-radius: 6px;
  ${({ imageSrc }) =>
    imageSrc &&
    css`
      background: url(${imageSrc}) no-repeat 50% 50% / cover;
    `}
`;

const UploadLabel = styled.label<{ hasFile: boolean }>`
  display: block;
  border: 1px dashed ${COLOR.kurlyGray400};
  border-radius: 6px;
  text-align: center;
  white-space: pre;
  line-height: 23px;
  font-size: 17px;
  height: 222px;
  padding-top: 130px;
  background: url(${ICON_CAMERA}) no-repeat 50% 40% / 60px auto;

  ${({ hasFile }) =>
    hasFile &&
    css`
      position: absolute;
      bottom: 12px;
      right: 12px;
      padding: 0 0 0 20px;
      border-radius: 16px;
      background: rgba(0, 0, 0, 0.4) url(${ICON_CAMERA_SMALL}) no-repeat 10px 50% / 16px auto;
      color: ${COLOR.kurlyWhite};
      width: 67px;
      line-height: 30px;
      border: 0;
      height: auto;
      font-size: 14px;
    `}
`;

const UploadButton = styled.input`
  position: absolute;
  z-index: -1;
  width: 0;
  height: 0;
  overflow: hidden;
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

const GuidelineDetailButton = styled.button`
  padding: 12px 0 20px 12px;
  color: ${COLOR.kurlyPurple};
  font-weight: 600;
`;

const ArrowIcon = styled.span`
  width: 6px;
  height: 10px;
  display: inline-block;
  margin-left: 3px;
  background: url(${ArrowRight}) no-repeat 0 0 / 100% auto;
`;

const Terms = styled.p`
  line-height: 20px;
  color: ${COLOR.kurlyGray600};
`;

const styles = css`
  border-top: 1px solid ${COLOR.bg};
`;

export default function RequestForm() {
  const webview = useWebview();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { isOpen, toggle } = useToggle();
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
          queryClient.setQueryData(PERSONAL_BOX_COMPLETE_REQUEST, true);
          await queryClient.invalidateQueries(PERSONAL_BOX);
          const redirectUrl = isWebview()
            ? getPageUrl(KURLY_PURPLE_BOX_PATH.webviewPersonalBoxResult)
            : getPageUrl(KURLY_PURPLE_BOX_PATH.personalBoxResult);

          dispatch(
            redirectTo({
              url: redirectUrl,
            }),
          );
        })
        .catch(async () => {
          await Alert({
            text: ERROR_MESSAGE,
          });
          clearImages();
        });
    }
    return;
  }, [clearImages, message, dispatch, queryClient, uploadImageFile]);

  const handleClickGuideline = useCallback(async () => {
    if (isWebview()) {
      appService.openWebview({
        url: `${window.location.origin}${KURLY_PURPLE_BOX_PATH.webviewGuideline.uri}`,
        is_modal: true,
      });
      return;
    }
    toggle();
  }, [toggle]);
  return (
    <Wrapper>
      {isOpenZoomImageLayer && <ZoomImageLayer closeZoomLayer={toggleZoomImageLayer} zoomImage={imageSrc} />}
      <UploadWrapper>
        {!isEmpty(imageSrc) && <UploadImage imageSrc={imageSrc} onClick={toggleZoomImageLayer} />}
        <UploadLabel htmlFor="uploadImage" hasFile={hasImage}>
          {hasImage ? '편집' : '보냉 기능이 있는 박스\n사진을 등록해주세요.'}
        </UploadLabel>
        <UploadButton type="file" id="uploadImage" onChange={uploadImage} accept="image/*" />
      </UploadWrapper>
      <ul>
        {PERSONAL_BOX_NOTICE.map((description, index) => (
          <Notice key={`Notice-description-${index}`}>{description}</Notice>
        ))}
      </ul>
      <GuidelineDetailButton type="button" onClick={handleClickGuideline}>
        개인 보냉 박스 이용 안내 <ArrowIcon />
      </GuidelineDetailButton>
      {!isWebview() && <GuidelineDetail isOpen={isOpen} handleClickClose={toggle} />}
      <Checkbox label="개인 책임 안내 동의" checked={isChecked} onChange={handleChangeTermState} css={styles} />
      <Terms>{TERMS_OF_REQUEST}</Terms>
      <MobileFooter transparent={true} hasUserMenu={!webview}>
        <Button theme="primary" text="신청하기" disabled={!isChecked || !hasImage} onClick={handleRequestPersonalBox} />
      </MobileFooter>
    </Wrapper>
  );
}
