import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import dynamic from 'next/dynamic';

import PopupNoticeListContainer from './PopupNoticeListContainer';
import MainSectionListContainer from '../../../containers/pc/MainSectionListContainer';
import ScrollEventTopButton from '../../../../shared/components/Scroll/ScrollEventTopButton';
import SnowEffect from '../../../../shared/components/Config/Effects/SnowEffect';
import { useAppSelector } from '../../../../shared/store';
import { initializeMainSection } from '../../../slice';

const FloatingNavigator = dynamic(() => import('../../../../navigator/components/FloatingNavigator'), { ssr: false });

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  position: relative;
`;

export default function MainContainer() {
  const hasSession = useAppSelector(({ auth }) => auth.hasSession);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hasSession) {
      return;
    }
    dispatch(initializeMainSection());
  }, [dispatch, hasSession]);

  return (
    <Container>
      <SnowEffect />
      <ScrollEventTopButton>
        <Content>
          <PopupNoticeListContainer />
          <MainSectionListContainer />
        </Content>
      </ScrollEventTopButton>
      <FloatingNavigator isFooter={false} />
    </Container>
  );
}
