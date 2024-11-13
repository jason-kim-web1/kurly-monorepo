import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useEffect, useState } from 'react';

import { Skeleton } from '@mui/material';

import { isPC } from '../../../../../util/window/getDevice';

import { ButtonTemplate } from '../types/buttonTemplate';
import { ThumbnailImage as ThumbnailImageType } from '../../../../shared/interfaces/MyKurlyStyle';
import useImageUrl from '../hooks/useImageUrl';
import encodeRemoteImage from '../../../../shared/utils/image/imageEncoder';

const Image = styled.img<{ templateType: ButtonTemplate }>(
  ({ templateType }) => css`
    width: 44px;
    height: 44px;
    margin-right: 15px;
    border-radius: 50%;

    ${isPC &&
    templateType === 'IMAGE_BUTTON' &&
    css`
      width: 80px;
      height: 80px;
      margin: 0 0 15px 0;
    `}
  `,
);

const SkeletonImage = styled.div<{ templateType: ButtonTemplate }>(
  ({ templateType }) => css`
    min-width: 44px;
    height: 44px;
    margin-right: 15px;

    ${isPC &&
    templateType === 'IMAGE_BUTTON' &&
    css`
      min-width: 80px;
      height: 80px;
      margin: 0 0 15px 0;
    `}

    > span {
      width: 100%;
      height: 100%;
      transform: none;
      border-radius: 50%;
    }
  `,
);

interface Props {
  templateType: ButtonTemplate;
  thumbnailImages: ThumbnailImageType[];
}

export default function ThumbnailImage({ templateType, thumbnailImages }: Props) {
  const { imageUrl } = useImageUrl(thumbnailImages);
  const [image, setImage] = useState('');

  useEffect(() => {
    const src = imageUrl();
    if (!src) {
      setImage('');
    } else {
      (async () => {
        const encode = await encodeRemoteImage(src);
        setImage(encode);
      })();
    }
  }, [imageUrl]);

  return (
    <>
      {thumbnailImages && image ? (
        <Image templateType={templateType} src={image} alt="" />
      ) : (
        <SkeletonImage templateType={templateType}>
          <Skeleton />
        </SkeletonImage>
      )}
    </>
  );
}
