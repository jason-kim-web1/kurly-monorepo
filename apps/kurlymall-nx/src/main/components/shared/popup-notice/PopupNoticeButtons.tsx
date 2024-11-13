import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { MainPopupNoticeButton } from '../../../interfaces/PopupNotice.interface';

const Container = styled.div`
  display: flex;
  border-top: 1px solid ${COLOR.bgLightGray};
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  &:last-of-type {
    border-left: 1px solid ${COLOR.bgLightGray};
  }
`;

interface Props {
  buttons: MainPopupNoticeButton[];
  onClickClose(noShowHours: number): void;
  className?: string;
}

export default function PopupNoticeButtons({ buttons, onClickClose, className }: Props) {
  if (isEmpty(buttons)) {
    return null;
  }

  return (
    <Container className={className}>
      {buttons.map(({ label, noShowHours }) => (
        <Button key={label} type="button" onClick={() => onClickClose(noShowHours)}>
          {label}
        </Button>
      ))}
    </Container>
  );
}
