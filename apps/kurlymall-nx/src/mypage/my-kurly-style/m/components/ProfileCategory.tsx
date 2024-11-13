import { useCallback, useMemo } from 'react';

import styled from '@emotion/styled';

import { useSelector } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import ProfileButton from '../../shared/components/ProfileButton';
import { AppState } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';
import { Segment } from '../../../../shared/interfaces/MyKurlyStyle';
import { Question21x21cccc } from '../../../../shared/images';
import Tooltip from '../../m/components/Tooltip';
import { MINIMUM_SELECTION } from '../../shared/constants/myKurlyStyleText';

const Wrapper = styled.div`
  padding: 0 20px;
`;

const InnerWrapper = styled.div`
  + div {
    margin-top: 40px;
  }
`;

const ListTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  margin: 25px 0 20px;
  color: ${COLOR.loversLavender};
`;

const Title = styled.div`
  margin-top: 25px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  white-space: pre;
`;

const Description = styled.div`
  font-weight: 400;
  line-height: 20px;
  color: ${COLOR.kurlyGray450};
  margin: 5px 0 25px;
`;

const Summary = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 20px;
`;

const SegmentName = styled.p`
  font-weight: 700;
  line-height: 20px;
`;

const MultipleSelectionText = styled.div`
  font-weight: 400;
  margin-left: 5px;
  color: ${COLOR.kurlyGray450};
`;

const TooltipButton = styled.button`
  width: 20px;
  height: 20px;
  background: url(${Question21x21cccc}) no-repeat center / 18px 18px;
`;

interface Props {
  listLayout: boolean;
  stepId?: string;
}

export default function MobileProfileCategory({ listLayout, stepId }: Props) {
  const isStepLayout = useCallback(
    (id: string) => {
      return listLayout || id === stepId;
    },
    [listLayout, stepId],
  );

  const {
    profile: { id: profileId, categories, hasProfile },
    myKurlyStyleInformation: { sites },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  const openTooltip = useCallback(async (name: string, segments: Segment[]) => {
    await Alert({
      confirmButtonText: '확인',
      contents: <Tooltip name={name} segments={segments} />,
    });
  }, []);

  const listTitle = useMemo(() => sites.find((site) => site.id === profileId)?.description, [profileId, sites]);

  return (
    <Wrapper>
      {listLayout && <ListTitle>{listTitle}</ListTitle>}
      {categories.map(
        ({ title, name, description, id, selectLayout, segments }) =>
          isStepLayout(id) && (
            <InnerWrapper key={id}>
              {listLayout ? (
                <Summary>
                  <SegmentName>{name}</SegmentName>
                  {selectLayout.max > MINIMUM_SELECTION && <MultipleSelectionText>중복선택가능</MultipleSelectionText>}
                  {segments[0].description && <TooltipButton onClick={() => openTooltip(name, segments)} />}
                </Summary>
              ) : (
                <>
                  <Title>{title}</Title>
                  <Description>{description}</Description>
                </>
              )}
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
    </Wrapper>
  );
}
