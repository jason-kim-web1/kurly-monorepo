import { memo, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Lottie from 'react-lottie-player';

import imageCompression from 'browser-image-compression';

import { css, SerializedStyles } from '@emotion/react';

import { IconCircularDimmedClose } from '../../../../../../../shared/images';

import * as animationData from '../../../../../../../shared/components/Loading/loadingLottie.json';

const Photo = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const optLottie = {
  loop: true,
  play: true,
  animationData,
};

const Loading = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.375rem;
  right: 0.375rem;
  width: 1.125rem;
  height: 1.125rem;
  background: url(${IconCircularDimmedClose}) no-repeat 0 0;
`;

const PhotoWrap = styled.div`
  overflow: hidden;
  display: flex;
  position: relative;
  border-radius: 6px;
  aspect-ratio: 1/1;
`;

const Uploading = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: solid 1px rgba(0, 0, 0, 0.03);
`;

const defaultPhotoStyle = css`
  height: 72px;
  width: 72px;
`;

const styles = {
  lottie: {
    width: '100%',
    height: '100%',
  },
};

interface UserPhotoProps {
  file?: File;
  url?: string;
  remove?: () => void;
  upload(photo: File): Promise<void>;
  photoStyle?: SerializedStyles;
}

function UserPhoto({ file, url, remove, upload, photoStyle = defaultPhotoStyle }: UserPhotoProps) {
  const [photoUrl, setPhotoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const compressUserPhoto = async (userPhoto: File, maxSizeMB = 1) => {
    setLoading(true);
    const compressed = await imageCompression(userPhoto, {
      maxSizeMB,
      maxWidthOrHeight: 1920,
    });
    setLoading(false);
    return compressed;
  };

  useEffect(() => {
    (async () => {
      if (file) {
        const compressed = await compressUserPhoto(file);
        const compressedPhotoUrl = URL.createObjectURL(compressed);
        setPhotoUrl(compressedPhotoUrl);
        setUploading(true);
        await upload(new File([compressed], file.name));
        setUploading(false);
      }
      if (url) {
        setPhotoUrl(url);
      }
    })();

    return () => {
      URL.revokeObjectURL(photoUrl);
      setPhotoUrl('');
    };
  }, []);

  return (
    <PhotoWrap css={photoStyle}>
      {loading && (
        <Loading>
          <Lottie {...optLottie} style={styles.lottie} />
        </Loading>
      )}
      {!loading && (
        <>
          <Photo src={photoUrl} alt="" />
          {uploading && (
            <Uploading>
              <Lottie {...optLottie} style={styles.lottie} />
            </Uploading>
          )}
          {!uploading && remove ? <DeleteButton type="button" onClick={remove} /> : null}
        </>
      )}
    </PhotoWrap>
  );
}

export default memo(UserPhoto);
