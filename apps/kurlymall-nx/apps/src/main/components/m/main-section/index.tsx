import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { eq } from 'lodash';
import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import MainSectionList from '../MainSectionList';
import { loadMainSection } from '../../../slice';

const Wrapper = styled.div<{ position: number }>`
  overflow: hidden;
  margin-bottom: ${(props) => (props.position < 2 ? 12 : 32)}px;
`;

interface Props {
  sectionKey: string;
  sectionPosition: number;
  hasSectionsStatus: boolean /* full to refresh 를 위해 사용됨 */;
  measure(): void;
}

export const MainSection = ({ sectionKey, sectionPosition, measure }: Props) => {
  const dispatch = useDispatch();
  const sectionData = useAppSelector(({ main }) => main.sectionDictionary[sectionKey]);
  const isMdChoiceSection = eq(sectionData.type, 'MD_CHOICES');

  useEffect(() => {
    if (!sectionData?.hasLoaded) {
      dispatch(loadMainSection(sectionKey));
    }
  }, [dispatch, sectionData?.hasLoaded, sectionKey]);

  useEffect(() => {
    if (isMdChoiceSection && sectionData?.isLoading) {
      measure();
      return;
    }

    if (!isMdChoiceSection) {
      measure();
      return;
    }
  }, [isMdChoiceSection, measure, sectionData]);

  if (!sectionData || sectionData?.isError) {
    return null;
  }

  return (
    <Wrapper position={sectionPosition}>
      <MainSectionList section={sectionData} measure={measure} />
    </Wrapper>
  );
};
