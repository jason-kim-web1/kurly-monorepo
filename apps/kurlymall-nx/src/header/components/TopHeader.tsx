import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useDispatch } from 'react-redux';

import MainMenu from './MainMenu';

import { useAppSelector } from '../../shared/store';
import SearchFormContainer from '../containers/SearchFormContainer';
import DeliveryLocationContainer from '../containers/pc/DeliveryLocationContainer';
import LikeIconbutton from '../../shared/components/Button/LikeIconButton';
import { amplitudeService } from '../../shared/amplitude';
import { SelectMyKurlyPickList } from '../../shared/amplitude/events';
import MainSiteSwitch from './MainSiteSwitch';
import CartButtonContainer from '../../shared/containers/pc/CartButtonContainer';
import { zIndex, mq } from '../../shared/styles';
import { redirectTo } from '../../shared/reducers/page';
import { getPageUrl, MYPAGE_PATH } from '../../shared/constant';

const Header = styled.div`
  height: 100px;
  padding-top: 36px;
`;

const Container = styled.div`
  position: relative;
  width: 1050px;
  height: 100px;
  margin: 0 auto;
  letter-spacing: -0.3px;
`;

const ActionsWrapper = styled.div`
  position: relative;
  width: 1050px;
  margin: 0 auto;
`;

const InnerActionsWrapper = styled.div<{ isSticky: boolean }>`
  display: flex;
  align-items: center;
  position: absolute;
  right: -6px;
  top: -49px;
  & > button {
    :not(:first-of-type) {
      margin-left: 20px;
    }
  }
  ${({ isSticky }) =>
    isSticky &&
    css`
      position: fixed;
      z-index: ${zIndex.globalNavigationBarItem};
      right: auto;
      top: 10px;
      ${mq({
        left: ['1050px', '50%'],
        marginLeft: ['-142px', '383px'],
      })}
    `};
`;

interface Props {
  sticky: boolean;
  sword?: string;
}

export default function TopHeader({ sticky, sword }: Props) {
  const dispatch = useDispatch();

  const { site, userMenus, userNotification } = useAppSelector(({ main, header }) => ({
    site: main.site,
    userMenus: header.userMenus,
    userNotification: header.userNotification,
  }));

  const handleClickLike = () => {
    void amplitudeService.logEvent(new SelectMyKurlyPickList({ selectionType: 'header' }));
    dispatch(redirectTo({ url: getPageUrl(MYPAGE_PATH.pick) }));
  };

  return (
    <Container>
      <MainMenu userMenus={userMenus} userNotification={userNotification} />
      <Header>
        <MainSiteSwitch activeSite={site} />
        <SearchFormContainer sticky={sticky} sword={sword} />
        <ActionsWrapper>
          <InnerActionsWrapper isSticky={sticky}>
            <DeliveryLocationContainer sticky={sticky} />
            <LikeIconbutton onClick={handleClickLike} />
            <CartButtonContainer sticky={sticky} />
          </InnerActionsWrapper>
        </ActionsWrapper>
      </Header>
    </Container>
  );
}
