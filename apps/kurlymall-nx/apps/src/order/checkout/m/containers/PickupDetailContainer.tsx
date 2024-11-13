import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { isEqual } from 'lodash';

import PickupPlaceSearchForm from '../../shared/components/PickupDetails/PickupPlaceSearchForm';
import SelectPickupBottomSheet from '../components/PickupDetails/BottomSheet/SelectPickupBottomSheet';
import MapviewContents from '../../shared/components/PickupDetails/MapviewContents/MapviewContents';
import useCheckoutOrderer from '../../shared/hooks/useCheckoutOrderer';
import ListviewContents from '../components/PickupDetails/ListviewContents/ListviewContents';
import { usePickupDetail } from '../../shared/context/PickupDetailContext';
import { placeSearchType } from '../../shared/interfaces';

const ViewContentsWrapper = styled.div<{ isActive: boolean }>`
  padding-top: 64px;
  ${({ isActive }) =>
    !isActive &&
    css`
      display: none;
    `};
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
    content: <MapviewContents />,
  },
];

export default function PickupDetailContainer() {
  useCheckoutOrderer();
  const { searchType } = usePickupDetail();

  return (
    <>
      <PickupPlaceSearchForm />
      {VIEW_LIST.map(({ id, type, content }) => (
        <ViewContentsWrapper key={id} isActive={isEqual(searchType, type)}>
          {content}
        </ViewContentsWrapper>
      ))}
      <SelectPickupBottomSheet />
    </>
  );
}
