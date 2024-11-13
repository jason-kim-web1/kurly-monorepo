import styled from '@emotion/styled';

import Button from '../../../../../shared/components/Button/Button';
import COLOR from '../../../../../shared/constant/colorset';
import { PlaceSearchType, placeSearchType } from '../../../shared/interfaces';
import MapIcon from '../../../../../shared/icons/MapIcon';
import ListIcon from '../../../../../shared/icons/ListIcon';
import { useNaverMapContext } from '../../../../../shared/context/NaverMapContext/NaverMapContext';
import { usePickupDetail } from '../../../shared/context/PickupDetailContext';

const ToggleButton = styled(Button)`
  flex-shrink: 0;
  margin-left: 10px;
  width: 70px;
  background-color: ${COLOR.kurlyWhite};
  border: 1px solid #dfe4eb;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #222;
    line-height: 19px;
    white-space: nowrap;
    svg {
      margin-right: 4px;
      min-width: 20px;
    }
  }
`;

const defaultButtonProps = {
  height: 44,
  fontSize: 14,
  radius: 6,
};

export default function ViewToggleButton() {
  const { map } = useNaverMapContext();
  const { isKeywordType, actions } = usePickupDetail();

  const handleClick = (type: PlaceSearchType) => {
    actions.toggleType(type);
    if (type === placeSearchType.MAP) {
      setTimeout(() => {
        map?.autoResize();
      }, 0);
    }
  };

  if (isKeywordType) {
    return (
      <ToggleButton
        text="지도"
        icon={<MapIcon />}
        onClick={() => handleClick(placeSearchType.MAP)}
        {...defaultButtonProps}
      />
    );
  }

  return (
    <ToggleButton
      text="목록"
      icon={<ListIcon />}
      onClick={() => handleClick(placeSearchType.KEYWORD)}
      {...defaultButtonProps}
    />
  );
}
