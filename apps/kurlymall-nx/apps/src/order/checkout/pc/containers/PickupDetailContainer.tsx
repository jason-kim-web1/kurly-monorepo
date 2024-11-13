import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isEqual } from 'lodash';

import { useDispatch } from 'react-redux';

import { placeSearchType } from '../../shared/interfaces';
import useCheckoutOrderer from '../../shared/hooks/useCheckoutOrderer';
import PickupPlaceSearchForm from '../../shared/components/PickupDetails/PickupPlaceSearchForm';
import MapviewContents from '../../shared/components/PickupDetails/MapviewContents/MapviewContents';
import Button from '../../../../shared/components/Button/Button';
import SelectedPickupPlacePopup from '../components/PickupDetails/SelectedPickupPlacePopup';
import useScrollFixedLock from '../../../../shared/hooks/useScrollFixedLock';
import { usePickupDetail } from '../../shared/context/PickupDetailContext';
import { setValue } from '../../shared/reducers/checkout.slice';
import ListviewContents from '../components/PickupDetails/ListviewContents/ListviewContents';

const ViewContentsWrapper = styled.div<{ isActive: boolean }>`
  position: relative;
  ${({ isActive }) =>
    !isActive &&
    css`
      display: none;
    `};
`;

const Content = styled.div``;

const ButtonWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;

  display: flex;
  width: 100%;
  padding: 20px 30px 30px;

  > button {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const VIEW_LIST = [
  {
    id: 'list-view',
    type: placeSearchType.KEYWORD,
    content: <ListviewContents />,
  },
  {
    id: 'map-view',
    type: placeSearchType.MAP,
    content: (
      <>
        <MapviewContents />
        <SelectedPickupPlacePopup />
      </>
    ),
  },
];

export default function PickupDetailContainer({ close }: { close: () => void }) {
  useCheckoutOrderer();
  useScrollFixedLock();

  const dispatch = useDispatch();
  const { searchType, selected } = usePickupDetail();

  const handleClickSelectPlace = () => {
    dispatch(setValue({ selectedPickupPlace: selected }));
    close();
  };

  return (
    <>
      <PickupPlaceSearchForm />
      <Content>
        {VIEW_LIST.map(({ id, type, content }) => (
          <ViewContentsWrapper key={id} isActive={isEqual(searchType, type)}>
            {content}
          </ViewContentsWrapper>
        ))}
      </Content>
      <ButtonWrapper>
        <Button text={'취소'} theme="tertiary" onClick={close} />
        <Button text={'매장 선택하기'} disabled={!selected} onClick={handleClickSelectPlace} />
      </ButtonWrapper>
    </>
  );
}
