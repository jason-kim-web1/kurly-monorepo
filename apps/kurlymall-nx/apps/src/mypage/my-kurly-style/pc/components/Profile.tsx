import { useCallback, useEffect } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { BackArrow } from '../../../../shared/images';

import ListLayout from '../../shared/components/ListLayout';
import StepLayout from '../../shared/components/StepLayout';
import { AppState } from '../../../../shared/store';
import { loadProfile } from '../../slice';
import useImageUrl from '../../shared/hooks/useImageUrl';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectProfile } from '../../../../shared/amplitude/events/mykurly-style';

const ProfileTitle = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 108px 1fr 85px;
  justify-items: center;
  align-items: center;
  border: 1px solid ${COLOR.kurlyGray200};
  padding: 30px 0;
  margin-top: 20px;
  box-shadow: 0 4px 10px 0 rgb(0 0 0 / 2%);

  & + button {
    margin-top: 20px;
  }
`;

const Img = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  width: 46px;
  height: 46px;
  margin: 0 26px 0 36px;
`;

const Title = styled.div<{ displayNewIcon: boolean; summary: string | null; hasProfile: boolean }>`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  width: 100%;
  text-align: left;
  position: relative;
  display: inline-block;
  margin-bottom: 5px;
  font-size: 20px;
  font-weight: 700;

  ${({ summary, hasProfile }) =>
    isEmpty(summary) &&
    hasProfile &&
    css`
      grid-row: 1 / 3;
      margin-bottom: 0;
    `}

  ${({ displayNewIcon }) =>
    displayNewIcon &&
    css`
      &::after {
        content: '새로 추가된 프로필 입니다.';
        position: absolute;
        top: 3px;
        right: -10px;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: ${COLOR.pointText};
        font-size: 0;
      }
    `};
`;

const Summary = styled.div<{ hasProfile: boolean }>`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  text-align: left;
  width: 100%;
  color: ${({ hasProfile }) => (hasProfile ? COLOR.kurlyPurple : COLOR.kurlyGray450)};
`;

const Arrow = styled.span<{ opened: boolean }>`
  grid-column: 3 / 3;
  grid-row: 1 / 3;
  display: block;
  right: 50px;
  width: 10px;
  height: 20px;
  background: url(${BackArrow}) no-repeat 47% 50% / 50px 50px;
  transform: ${({ opened }) => (opened ? 'rotate(90deg)' : 'rotate(-90deg)')};
  transition: all 0.2s ease;
`;

const Reward = styled.p`
  margin-right: 30px;
  font-weight: 700;
  color: ${COLOR.loversLavender};
`;

const ProfileDetail = styled.div<{ opened: boolean }>`
  background-color: ${COLOR.kurlyGray100};
  border: 1px solid ${COLOR.kurlyGray200};
  border-top-width: 0;
  border-bottom-width: 0;
  display: none;

  ${({ opened }) =>
    opened &&
    css`
      display: block;
    `};
`;

interface Props {
  profileId: string;
  opened: boolean;
  displayNewIcon: boolean;
  hasProfile: boolean;
  summary: string | null;
  toggleProfile: (id: string) => void;
}

export default function Profile({ profileId, opened, displayNewIcon, hasProfile, summary, toggleProfile }: Props) {
  const toggle = useCallback(() => {
    amplitudeService.logEvent(new SelectProfile({ selectionType: 'my_kurly_style', profileType: profileId }));
    toggleProfile(profileId);
  }, [toggleProfile, profileId]);

  const {
    profile: { name, thumbnailImages, description },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProfile(profileId));
  }, [dispatch, profileId]);

  const { imageUrl } = useImageUrl(thumbnailImages);

  return (
    <>
      <ProfileTitle onClick={toggle}>
        <Img src={imageUrl()} alt="" />
        <Title displayNewIcon={displayNewIcon} summary={summary} hasProfile={hasProfile}>
          {name}
        </Title>
        <Summary hasProfile={hasProfile}>{hasProfile ? summary : description}</Summary>
        {displayNewIcon && <Reward>설정하고 +1,000원 적립 받기</Reward>}
        <Arrow opened={opened} />
      </ProfileTitle>
      <ProfileDetail opened={opened}>
        {hasProfile ? <ListLayout profileId={profileId} /> : <StepLayout profileId={profileId} />}
      </ProfileDetail>
    </>
  );
}
