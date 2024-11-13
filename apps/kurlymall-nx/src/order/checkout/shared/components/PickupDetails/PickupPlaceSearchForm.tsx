import styled from '@emotion/styled';

import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { useState } from 'react';

import PickupPlaceInputBox from './PickupPlaceInputBox';
import ViewToggleButton from '../../../m/components/PickupDetails/ViewToggleButton';
import COLOR from '../../../../../shared/constant/colorset';
import { isPC } from '../../../../../../util/window/getDevice';
import { usePickupDetail } from '../../context/PickupDetailContext';

const HeaderWrapper = styled.div`
  display: flex;

  ${isPC
    ? css`
        margin: 0 30px 12px;
        width: 380px;
      `
    : css`
        padding: 8px 16px 12px 16px;
        position: fixed;
        width: 100%;
        background-color: ${COLOR.kurlyWhite};
      `}
`;

export default function PickupPlaceSearchForm() {
  const [keyword, setKeyword] = useState('');
  const { keyword: debouncedKeyword, actions } = usePickupDetail();

  const handleChange = (value: string) => {
    setKeyword(value);
    actions.searchPickupPlace(value);
  };

  return (
    <HeaderWrapper>
      <PickupPlaceInputBox place={keyword} searchPickupPlace={handleChange} onFocus={actions.closeAndReset} />
      {isEmpty(debouncedKeyword) && <ViewToggleButton />}
    </HeaderWrapper>
  );
}
