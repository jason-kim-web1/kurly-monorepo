import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';
import COLOR from '../../../../shared/constant/colorset';

import ToggleButton from '../../shared/components/ToggleButton';
import { AppState } from '../../../../shared/store';
import { updateOpenProfile } from '../../slice';

const Wrapper = styled.div`
  ${isPC
    ? css`
        display: flex;
        align-items: baseline;
        height: 48px;
        margin-top: 30px;
      `
    : css`
        margin: 24px 0 22px;
      `};
`;

const Title = styled.div`
  ${isPC
    ? css`
        flex-shrink: 0;
        width: 205px;
        font-weight: 500;
      `
    : css`
        margin-bottom: 5px;
        font-weight: 600;
      `};
`;

const Contents = styled.div`
  ${!isPC &&
  css`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  `}
`;

const Description = styled.p`
  ${isPC
    ? css`
        margin-top: 10px;
        color: ${COLOR.kurlyGray600};
      `
    : css`
        font-size: 12px;
        line-height: 18px;
        color: ${COLOR.kurlyGray450};
      `};
`;

export default function SetProfile() {
  const dispatch = useDispatch();

  const {
    myKurlyStyleInformation: { openProfile },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const toggleState = (state: boolean) => {
    dispatch(updateOpenProfile(!state));
  };

  return (
    <Wrapper>
      <Title>{isPC ? '프로필 설정' : '프로필 비공개로 설정'}</Title>
      <Contents>
        <ToggleButton text={isPC ? '비공개로 설정' : ''} active={!openProfile} onToggle={toggleState} />
        <Description>비공개로 설정할 경우, 고객님의 프로필 정보가 공개되지 않습니다.</Description>
      </Contents>
    </Wrapper>
  );
}
