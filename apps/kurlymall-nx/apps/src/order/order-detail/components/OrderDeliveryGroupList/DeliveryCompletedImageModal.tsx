import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Dialog } from '@material-ui/core';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

import DialogPC from '../../../shared/shared/components/Dialog';
import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';
import NextImage from '../../../../shared/components/NextImage';
import { Close } from '../../../../shared/icons';

interface Props {
  isOpen: boolean;
  deliveryCompletedImageUrl: string;
  close: () => void;
}

const ContentWrapper = styled.div`
  position: relative;
  width: calc(100vw - 110px);
  height: 632px;
  max-width: 740px;
  max-height: 632px;
  margin: 40px 0 30px;
`;

const ButtonWrapper = styled.div`
  cursor: pointer;

  ${isPC
    ? css`
        position: absolute;
        padding: 30px 30px 0 0;
        top: 0;
        right: 0;
      `
    : css`
        position: absolute;
        width: 100%;
        height: 44px;
        background-color: ${COLOR.kurlyBlack};
        opacity: 0.6;
        z-index: 1;
        padding: 13px;
      `};
`;

const ZommableImage = ({ deliveryCompletedImageUrl }: { deliveryCompletedImageUrl: string }) => {
  return (
    <TransformWrapper panning={{ disabled: true }} doubleClick={{ disabled: true }}>
      <TransformComponent
        wrapperStyle={{ width: '100%', height: 'inherit', justifyContent: 'center' }}
        contentStyle={{ width: '100%', height: 'inherit' }}
      >
        <NextImage
          src={deliveryCompletedImageUrl}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
          style={{ backgroundColor: isPC ? COLOR.kurlyWhite : COLOR.kurlyBlack }}
        />
      </TransformComponent>
    </TransformWrapper>
  );
};

const DeliveryCompletedImageModal = ({ isOpen, deliveryCompletedImageUrl, close }: Props) => {
  return (
    <>
      {isPC ? (
        <DialogPC
          maxWidth="800px"
          isOpen={isOpen}
          contents={
            <ContentWrapper>
              <ZommableImage deliveryCompletedImageUrl={deliveryCompletedImageUrl} />
            </ContentWrapper>
          }
          actions={
            <ButtonWrapper>
              <Close
                onClick={close}
                width={30}
                height={30}
                strokeWidth={1}
                stroke={COLOR.kurlyGray450}
                fill={COLOR.kurlyGray450}
              />
            </ButtonWrapper>
          }
          handleDimmedClick={close}
        />
      ) : (
        <Dialog open={isOpen} fullScreen>
          <ButtonWrapper>
            <Close
              onClick={close}
              width={18}
              height={18}
              strokeWidth={2}
              stroke={COLOR.kurlyWhite}
              fill={COLOR.kurlyWhite}
            />
          </ButtonWrapper>
          <ZommableImage deliveryCompletedImageUrl={deliveryCompletedImageUrl} />
        </Dialog>
      )}
    </>
  );
};

export default DeliveryCompletedImageModal;
