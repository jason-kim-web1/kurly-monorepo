import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../shared/store';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';
import MainSectionList from '../MainSectionList';
import { loadMainSection } from '../../../slice';

const SkeletonWrapper = styled.div`
  padding: 40px 0;
  margin: 0 auto;
`;

interface Props {
  sectionKey: string;
  hasSectionsStatus: boolean;
}

export const MainSection = ({ sectionKey, hasSectionsStatus }: Props) => {
  const dispatch = useDispatch();
  const sectionData = useAppSelector(({ main }) => main.sectionDictionary[sectionKey]);

  useEffect(() => {
    dispatch(loadMainSection(sectionKey));
  }, [dispatch, sectionKey, hasSectionsStatus]);

  if (!sectionData) {
    return null;
  }

  const { isError, isLoading } = sectionData;

  if (isError) {
    return null;
  }

  if (isLoading) {
    return <SkeletonWrapper>{createMainSkeletonPC(sectionData?.type)}</SkeletonWrapper>;
  }

  return <MainSectionList section={sectionData} />;
};
