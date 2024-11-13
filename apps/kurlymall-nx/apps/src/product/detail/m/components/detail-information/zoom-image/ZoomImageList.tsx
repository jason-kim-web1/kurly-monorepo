import { useState } from 'react';

import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import ZoomImageGuide from './ZoomImageGuide';
import TouchableImage from './TouchableImage';
import ZoomImageDialog from './ZoomImageDialog';
import { isWebview } from '../../../../../../../util/window/getDevice';
import appService from '../../../../../../shared/services/app.service';

const Container = styled.div`
  width: 100%;
`;

interface Props {
  detailImages: string[];
}

export default function ZoomImageList({ detailImages }: Props) {
  const [open, setOpen] = useState(false);
  const [dialogImage, setDialogImage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const onClickTouchableImage = (itemIndex: number) => {
    if (isWebview()) {
      appService.openImages(detailImages, itemIndex);
      return;
    }
    setDialogImage(detailImages[itemIndex]);
    handleClickOpen();
  };

  if (isEmpty(detailImages)) {
    return null;
  }

  return (
    <Container>
      <ZoomImageGuide />
      {detailImages.map((imageUrl, i) => (
        <TouchableImage key={imageUrl} imageUrl={imageUrl} onClickTouchableImage={() => onClickTouchableImage(i)} />
      ))}
      <ZoomImageDialog open={open} onHandleClose={handleClickClose} dialogImage={dialogImage} />
    </Container>
  );
}
