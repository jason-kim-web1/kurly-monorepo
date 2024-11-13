import { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';

import Checkbox from '../../../../shared/components/Input/Checkbox';
import { AppState } from '../../../../shared/store';
import { updateHasToddler } from '../../slice';

const Wrapper = styled.div`
  ${isPC &&
  css`
    display: flex;
    align-items: center;
    height: 48px;
    margin-top: 20px;
  `};
`;

const Title = styled.div`
  flex-shrink: 0;
  width: 205px;
  font-weight: 500;
`;

const Contents = styled.div`
  ${isPC
    ? css`
        position: relative;
        width: 402px;
      `
    : css`
        label {
          font-size: 14px;
        }
      `};
`;

export default function Toddler() {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState(false);

  const {
    myKurlyStyleInformation: { hasToddler },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const onChange = useCallback(() => {
    const selectState = !selected;
    setSelected(selectState);
    dispatch(updateHasToddler(selectState));
  }, [dispatch, selected]);

  useEffect(() => {
    if (hasToddler) {
      setSelected(hasToddler);
    }
  }, [hasToddler]);

  return (
    <Wrapper>
      {isPC && <Title>자녀</Title>}
      <Contents>
        <Checkbox id="toddler" label="만 5세 이하의 영유아 자녀가 있어요." checked={selected} onChange={onChange} />
      </Contents>
    </Wrapper>
  );
}
