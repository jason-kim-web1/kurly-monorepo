import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import { isEmpty } from 'lodash';

import COLOR from '../../../../shared/constant/colorset';
import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, MY_KURLY_STYLE } from '../../../../shared/constant';
import { ThumbnailImage } from '../../../../shared/interfaces/MyKurlyStyle';
import useImageUrl from '../../shared/hooks/useImageUrl';
import { ArrowRightDarkGray } from '../../../../shared/images';
import { amplitudeService } from '../../../../shared/amplitude';
import { SelectProfile } from '../../../../shared/amplitude/events/mykurly-style';

const Wrapper = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: 33px 1fr 15px;
  justify-items: center;
  align-items: center;
  border: 1px solid ${COLOR.kurlyGray200};
  border-radius: 6px;
  box-shadow: 0 2px 5px 0 rgb(0 0 0 / 3%);
  padding: 25px 15px;
  margin-top: 10px;
`;

const Img = styled.img`
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  width: 33px;
  height: 33px;
`;

const Title = styled.div<{ summary: string | null; hasProfile: boolean }>`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  width: 100%;
  text-align: left;
  font-weight: 600;
  font-size: 16px;
  padding: 0 15px;
  align-content: end;

  ${({ summary, hasProfile }) =>
    isEmpty(summary) &&
    hasProfile &&
    css`
      grid-row: 1 / 3;
    `}
`;

const Summary = styled.div<{ summary: string | null }>`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  text-align: left;
  font-size: 13px;
  line-height: 16px;
  padding: 4px 15px 0;
  color: ${({ summary }) => (summary ? COLOR.kurlyPurple : COLOR.kurlyGray600)};
`;

const Reward = styled.div``;

const Arrow = styled.div`
  grid-column: 3 / 3;
  grid-row: 1 / 3;
  display: block;
  right: 50px;
  width: 10px;
  height: 20px;
  background: url(${ArrowRightDarkGray}) no-repeat 47% 50% / 50px 50px;
`;

interface Props {
  profileId: string;
  displayNewIcon: boolean;
  name: string;
  hasProfile: boolean;
  summary: string | null;
  description: string;
  thumbnailImages: ThumbnailImage[];
}

export default function Profile({
  profileId,
  displayNewIcon,
  name,
  hasProfile,
  summary,
  description,
  thumbnailImages,
}: Props) {
  const dispatch = useDispatch();

  const onClickProfile = () => {
    amplitudeService.logEvent(new SelectProfile({ selectionType: 'my_kurly_style', profileType: profileId }));
    dispatch(redirectTo({ url: getPageUrl(MY_KURLY_STYLE.profile), query: { siteId: profileId } }));
  };

  const { imageUrl } = useImageUrl(thumbnailImages);

  return (
    <Wrapper onClick={onClickProfile}>
      <Img src={imageUrl()} alt="" />
      <Title summary={summary} hasProfile={hasProfile}>
        {name}
      </Title>
      <Summary summary={summary}>{hasProfile ? summary : description}</Summary>
      {displayNewIcon && <Reward>설정하고 +1,000원 적립 받기</Reward>}
      <Arrow />
    </Wrapper>
  );
}
