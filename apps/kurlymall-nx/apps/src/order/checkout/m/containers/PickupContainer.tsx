import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Button from '../../../../shared/components/Button/Button';
import { Panel } from '../../../../shared/components/Panel';
import PickupTerms from '../../m/components/PickupTerms';
import PickupPlaceButton from '../components/PickupDetails/PickupPlaceButton';
import SelectedPickupPlace from '../components/PickupDetails/SelectedPickupPlace';

import COLOR from '../../../../shared/constant/colorset';

import { Divider } from '../../../../shared/components/Divider/Divider';
import useSelectedPickupContents from '../../shared/hooks/pickup/useSelectedPickupContents';
import usePickupHandler from '../../shared/hooks/pickup/usePickupHandler';

const Wrapper = styled.div`
  padding-top: 22px;
`;

const changeButton = css`
  position: absolute;
  right: 0;
  width: 53px;
  height: 37px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  background-color: ${COLOR.kurlyWhite};
  color: ${COLOR.kurlyGray800};
  line-height: 18px;

  span {
    font-weight: 500;
    font-size: 14px;
  }
`;

const ChangePickupPlaceButton = ({ onClick }: { onClick: () => void }) => {
  return <Button text="변경" theme="tertiary" css={changeButton} onClick={onClick} />;
};

export default function PickupContainer() {
  const { onClickSelectPickupButton } = usePickupHandler();
  const { selectedPickupPlace, selectedPickupContents } = useSelectedPickupContents();

  return (
    <div id="pickup-container">
      <Panel
        title="픽업매장 정보"
        headerContent={selectedPickupPlace && <ChangePickupPlaceButton onClick={onClickSelectPickupButton} />}
      >
        <Wrapper>
          {selectedPickupPlace ? (
            <SelectedPickupPlace contents={selectedPickupContents} />
          ) : (
            <PickupPlaceButton onClick={onClickSelectPickupButton} />
          )}
          <PickupTerms />
        </Wrapper>
      </Panel>
      <Divider />
    </div>
  );
}
