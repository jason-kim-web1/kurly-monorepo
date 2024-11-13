import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import RawHTML from '../../../../shared/components/layouts/RawHTML';
import PopupNoticeButtons from '../../shared/popup-notice/PopupNoticeButtons';
import { MainPopupNoticeButton } from '../../../interfaces/PopupNotice.interface';
import { zIndex } from '../../../../shared/styles';
import { useDynamicViewportSize, VIEWPORT_HEIGHT_UNIT } from '../../../../shared/hooks/useDynamicViewportSize';

const BUTTON_AREA_HEIGHT = 56;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 20px;
  right: 20px;
  transform: translateY(-50%);
  overflow: hidden;
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  z-index: ${zIndex.mainPopupBanner};

  .lacms-popup-style-boundary {
    max-height: calc(calc(80 * var(${VIEWPORT_HEIGHT_UNIT}, 1vh)) - ${BUTTON_AREA_HEIGHT}px);

    @supports (max-height: 80dvh) {
      max-height: calc(80dvh - ${BUTTON_AREA_HEIGHT}px);
    }

    overflow-y: scroll;
  }
`;

const Buttons = styled(PopupNoticeButtons)`
  height: ${BUTTON_AREA_HEIGHT}px;
  button {
    background-color: ${COLOR.kurlyWhite};
    font-weight: 600;
    font-size: 16px;
    color: ${COLOR.kurlyGray800};
  }
`;

interface Props {
  htmlContent: string;
  buttons: MainPopupNoticeButton[];
  onClickButton(noShowHours: number): void;
}

export default function PopupNoticeItem({ htmlContent, onClickButton, buttons }: Props) {
  useDynamicViewportSize();

  return (
    <Container>
      <RawHTML html={htmlContent} />
      <Buttons buttons={buttons} onClickClose={onClickButton} />
    </Container>
  );
}
