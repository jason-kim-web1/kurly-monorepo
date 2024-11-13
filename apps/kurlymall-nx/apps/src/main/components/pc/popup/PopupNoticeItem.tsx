import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import RawHTML from '../../../../shared/components/layouts/RawHTML';
import { MainPopupNoticeButton } from '../../../interfaces/PopupNotice.interface';
import PopupNoticeButtons from '../../shared/popup-notice/PopupNoticeButtons';

const popupStyle = {
  width: 440,
  gap: 10,
};

const Container = styled.div<{ left: number }>`
  position: absolute;
  top: 40px;
  left: ${({ left }) => `${left}px`};
  width: ${popupStyle.width}px;
  overflow: hidden;
  border-radius: 6px;
  background-color: ${COLOR.bg};
  box-shadow: 0 1px 8px 0 rgb(0 0 0 / 0.2);
  transition: 0.5s;
`;

const Buttons = styled(PopupNoticeButtons)`
  height: 60px;
  button {
    color: ${COLOR.kurlyGray800};
    background-color: ${COLOR.kurlyWhite};
    line-height: 20px;
    font-weight: 400;
    font-size: 16px;
  }
`;

interface Props {
  index: number;
  content: string;
  buttons: MainPopupNoticeButton[];
  onClose(noShowHours: number): void;
}

export default function PopupNoticeItem({ index, content, buttons, onClose }: Props) {
  return (
    <Container left={index * (popupStyle.width + popupStyle.gap)}>
      <RawHTML html={content} />
      <Buttons buttons={buttons} onClickClose={onClose} />
    </Container>
  );
}
