import { useState } from 'react';

import styled from '@emotion/styled';

import ZoomImageDialog from '../../../../product/detail/m/components/detail-information/zoom-image/ZoomImageDialog';
import { ZOOM_ICON_URL } from '../../constants';
import NextImage from '../../../../shared/components/NextImage';

const ZoomImage = styled.button`
  display: block;
  position: relative;
`;

const ZoomIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10vw;
  height: 10vw;
`;

interface Props {
  id: string;
  imageUrl: string;
}

export default function CertifyZoomImage({ id, imageUrl }: Props) {
  const [open, setOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState('');

  const handleClickZoomOpen = () => {
    setOpen(true);
  };

  const handleClickZoomClose = () => {
    setOpen(false);
  };

  const onClickTouchableImage = (zoomImages: string) => {
    setDialogImage(zoomImages);
    handleClickZoomOpen();
  };

  return (
    <>
      <ZoomImage onClick={() => onClickTouchableImage(imageUrl)}>
        <img key={imageUrl} data-src={imageUrl} className="swiper-lazy" alt={`${id} 결과서`} />
        <ZoomIcon>
          <NextImage src={ZOOM_ICON_URL} layout="fill" objectFit="cover" alt="시험성적서 이미지 확대보기" />
        </ZoomIcon>
      </ZoomImage>
      <ZoomImageDialog open={open} onHandleClose={handleClickZoomClose} dialogImage={dialogImage} />
    </>
  );
}
