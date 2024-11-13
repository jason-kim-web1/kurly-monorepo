import { useCallback } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useSelector } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import ProfileButton from '../../shared/components/ProfileButton';
import { AppState } from '../../../../shared/store';

const InnerWrapper = styled.div<{ listLayout: boolean }>`
  ${({ listLayout }) =>
    listLayout &&
    css`
      & + div {
        margin-top: 50px;
      }
    `}
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const Description = styled.div`
  margin: 10px 0 30px;
  color: ${COLOR.kurlyGray450};
`;

interface Props {
  listLayout: boolean;
  stepId?: string;
}

export default function PcProfileCategory({ listLayout, stepId }: Props) {
  const isStepLayout = useCallback(
    (id: string) => {
      return listLayout || id === stepId;
    },
    [listLayout, stepId],
  );

  const {
    profile: { id: profileId, categories, hasProfile },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  return (
    <>
      {categories.map(
        ({ title, description, id, selectLayout, segments }) =>
          isStepLayout(id) && (
            <InnerWrapper key={id} listLayout={listLayout}>
              <Title>{title}</Title>
              <Description>{description}</Description>
              <ProfileButton
                profileId={profileId}
                segments={segments}
                categoryId={id}
                hasProfile={hasProfile}
                templateTypes={selectLayout.templateTypes}
                max={selectLayout.max}
              />
            </InnerWrapper>
          ),
      )}
    </>
  );
}
