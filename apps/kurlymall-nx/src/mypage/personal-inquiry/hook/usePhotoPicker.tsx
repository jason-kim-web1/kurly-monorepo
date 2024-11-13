import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

import IconCamera from '../icons/IconCamera';
import Alert from '../../../shared/components/Alert/Alert';

export interface PhotoProps {
  id: string;
  attachmentId?: number;
  file?: File;
  url?: string;
}

const Label = styled.label``;

const InputFile = styled.input`
  display: none;
`;

const Button = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  border-radius: 6px;
`;

interface Props {
  maxPhotoCount: number;
  maxPhotoSizeMb?: number;
  allowedImageFileExpansions: string[];
}

const usePhotoPicker = ({ maxPhotoCount = 8, maxPhotoSizeMb = 30, allowedImageFileExpansions }: Props) => {
  const [photos, setPhotos] = useState<Array<PhotoProps>>([]);

  const photoController = useMemo(
    () => ({
      remove: (targetId: string) => {
        setPhotos((prev) => prev.filter((photo) => photo.id !== targetId));
      },
      modify: (targetId: string, updatedProps: PhotoProps) => {
        setPhotos((prev) => prev.map((photo) => (photo.id === targetId ? updatedProps : photo)));
      },
      add: (newPhotos: PhotoProps[]) => {
        const exceeded = newPhotos.length + photos.length > maxPhotoCount;
        if (!exceeded) {
          setPhotos((prev) => [...prev, ...newPhotos]);
        }
      },
      set: (initialPhotos: PhotoProps[]) => {
        setPhotos(initialPhotos);
      },
    }),
    [photos],
  );

  const validateInputFile = async (files: FileList) => {
    const selectedPhotos = Array.from(files).map((file) => ({
      id: `${file.lastModified}-${file.size}`,
      file,
    }));

    const isValidFileExpansion = selectedPhotos.every((photo) =>
      allowedImageFileExpansions.some((it) => photo.file.type.includes(it)),
    );

    if (!isValidFileExpansion) {
      throw Error(`확장자명(${allowedImageFileExpansions.join(', ')})을 확인해주세요.`);
    }

    const duplicated = selectedPhotos.some((photo) => photos.some((selected) => photo.id === selected.id));

    if (duplicated) {
      throw Error('이미 선택된 사진이 포함되어 있습니다.');
    }

    const sizeLimitExceeded = selectedPhotos.some((photo) => photo.file.size > maxPhotoSizeMb * 1024 * 1024);

    if (sizeLimitExceeded) {
      throw Error(`사진 용량 제한 (${maxPhotoSizeMb}MB 이하) 를 확인해주세요.`);
    }

    const newSelectedPhotoCount = photos.length + selectedPhotos.length;

    if (newSelectedPhotoCount > maxPhotoCount) {
      throw Error(`사진 첨부는 최대 ${maxPhotoCount}장까지만 가능합니다.`);
    }

    return selectedPhotos;
  };

  const handleChangeInputFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const { files } = e.target;

      if (!files) {
        return;
      }

      const selectedPhotos = await validateInputFile(files);

      setPhotos((prev) => [...prev, ...selectedPhotos]);
    } catch (err) {
      await Alert({ text: err.message });
      e.target.value = ''; // reset input file
    }
  };

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (!hiddenFileInput.current) {
      return;
    }
    hiddenFileInput.current.click();
  };

  const PhotoPicker = ({ photoPickerStyles }: { photoPickerStyles?: SerializedStyles }) => (
    <div css={photoPickerStyles}>
      <Label htmlFor="photo-picker">
        <Button type="button" onClick={handleClick}>
          <IconCamera />
        </Button>
        <InputFile
          multiple
          type="file"
          ref={hiddenFileInput}
          onChange={handleChangeInputFile}
          accept={allowedImageFileExpansions.map((expansion) => `image/${expansion}`).join(', ')}
        />
      </Label>
    </div>
  );

  return { PhotoPicker, photos, photoController };
};

export default usePhotoPicker;
