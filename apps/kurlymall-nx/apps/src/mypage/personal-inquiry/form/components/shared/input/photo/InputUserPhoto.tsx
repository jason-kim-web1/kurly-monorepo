import styled from '@emotion/styled';

import { ReactNode, useEffect, useMemo, useState } from 'react';

import { SerializedStyles } from '@emotion/react';

import { head } from 'lodash';

import usePhotoPicker, { PhotoProps } from '../../../../../hook/usePhotoPicker';
import UserPhoto from './UserPhoto';
import Alert from '../../../../../../../shared/components/Alert/Alert';
import { deletePersonalInquiryAttachment, postPersonalInquiryAttachment } from '../../../../../../../shared/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 0;
`;

const PhotoContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const DEFAULT_MAX_NUMBER_OF_PHOTO_SELECT = 8;

interface Props {
  draftId: number;
  images?: PhotoProps[];
  photoContainerStyle: SerializedStyles;
  children?: ReactNode;
}

export default function InputUserPhoto({ draftId, images, photoContainerStyle, children }: Props) {
  const [uploadError, setUploadError] = useState(false);
  const allowedImageFileExpansions: string[] = ['jpg', 'jpeg', 'png', 'bmp'];

  const { PhotoPicker, photos, photoController } = usePhotoPicker({
    maxPhotoCount: DEFAULT_MAX_NUMBER_OF_PHOTO_SELECT,
    allowedImageFileExpansions,
  });

  useEffect(() => {
    if (images) {
      photoController.set(images);
    }
  }, []);

  useEffect(() => {
    if (uploadError) {
      Alert({ text: '파일 업로드에 실패하였습니다. \n 다시 시도 부탁드리겠습니다.' }).then(() => setUploadError(false));
    }
  }, [uploadError]);

  const removeUserPhoto = (photo: PhotoProps) => async () => {
    if (!photo.attachmentId) {
      return;
    }

    try {
      await deletePersonalInquiryAttachment(draftId, photo.attachmentId);
      photoController.remove(photo.id);
    } catch (err) {
      await Alert({ text: err.message });
    }
  };

  const uploadUserPhoto = (photo: PhotoProps) => async (userPhoto: File) => {
    try {
      const results = await postPersonalInquiryAttachment(draftId, userPhoto);

      const result = head(results);

      if (!result) {
        return;
      }

      photoController.modify(photo.id, {
        ...photo,
        attachmentId: result.id,
      });
    } catch (err) {
      // 여러개의 이미지를 동시에 업로드하는 경우 에러 토스트를 하나만 띄우기 위해서 하나의 상태로 메세지를 보여준다
      setUploadError(true);
      photoController.remove(photo.id);
    }
  };

  const userPhotos = useMemo(
    () =>
      photos.map((photo) => (
        <UserPhoto
          key={photo.id}
          file={photo.file}
          url={photo.url}
          remove={removeUserPhoto(photo)}
          upload={uploadUserPhoto(photo)}
        />
      )),
    [photos],
  );

  return (
    <Container>
      <PhotoContainer css={photoContainerStyle}>
        {userPhotos}
        {photos.length < DEFAULT_MAX_NUMBER_OF_PHOTO_SELECT && <PhotoPicker />}
      </PhotoContainer>
      {children}
    </Container>
  );
}
