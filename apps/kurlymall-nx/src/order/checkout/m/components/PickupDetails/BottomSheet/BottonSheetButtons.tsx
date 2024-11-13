import { css } from '@emotion/react';

import { ButtonProps } from '../../../../../../shared/components/Button/Button';
import ButtonGroup from '../../../../../../shared/components/Button/ButtonGroup';
import { PickupPlace } from '../../../../shared/interfaces';

const buttonStyle = css`
  margin-top: 8px;
`;

interface Props {
  onClick: (value?: PickupPlace) => void;
  onClose: () => void;
  pickupPlace?: PickupPlace;
  isKeywordType: boolean;
}

export default function BottomSheetButtons({ onClick, onClose, isKeywordType, pickupPlace }: Props) {
  const cancelButtonProps: ButtonProps = {
    theme: 'tertiary',
    text: '취소',
    onClick: onClose,
  };

  const selectButtonProps: ButtonProps = {
    theme: 'primary',
    text: '매장 선택하기',
    onClick: () => onClick(pickupPlace),
  };

  return (
    <ButtonGroup
      css={buttonStyle}
      contents={isKeywordType ? [cancelButtonProps, selectButtonProps] : [selectButtonProps]}
    />
  );
}
