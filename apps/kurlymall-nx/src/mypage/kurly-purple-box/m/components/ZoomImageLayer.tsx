import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import Close from '../../../../shared/icons/Close';

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${COLOR.kurlyBlack};
  z-index: 2000;
  overflow: hidden;
`;

const ZoomImage = styled.img`
  width: 100%;
`;

const CloseZoomLayerButton = styled.button`
  position: absolute;
  width: 44px;
  height: 44px;
  top: 3px;
  left: 6px;
`;

const CloseZoomLayerText = styled.p`
  font-size: 0;
  line-height: 0;
`;

interface Props {
  closeZoomLayer: () => void;
  zoomImage: string | undefined;
}
export default function ZoomImageLayer({ closeZoomLayer, zoomImage }: Props) {
  return (
    <Wrapper>
      <CloseZoomLayerButton type="button" onClick={closeZoomLayer}>
        <CloseZoomLayerText>줌인 이미지 닫기</CloseZoomLayerText>
        <Close width={20} height={20} strokeWidth={2} stroke={COLOR.kurlyWhite} fill={COLOR.kurlyWhite} />
      </CloseZoomLayerButton>
      <ZoomImage src={zoomImage} alt="Zoom Image" />
    </Wrapper>
  );
}
