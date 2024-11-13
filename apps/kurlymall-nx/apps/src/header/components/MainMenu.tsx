import { memo, useCallback } from 'react';

import styled from '@emotion/styled';
import { css } from '@emotion/react';

import TriangleArrowIcon from '../../shared/components/icons/TriangleArrowIcon';
import SubMenu from './SubMenu';

import COLOR from '../../shared/constant/colorset';
import { zIndex } from '../../shared/styles';

import { CUSTOMER_MENU } from '../constants';
import { Menu, UserNotification } from '../interfaces';
import { useLink } from '../../shared/hooks/useLink';
import { BOARD_PATH, COMMON_PATH, MYPAGE_PATH } from '../../shared/constant';
import { amplitudeService } from '../../shared/amplitude';
import { SelectMyKurlyOrderHistory, SelectMyKurlyServiceCenter } from '../../shared/amplitude/events/mypage';
import { SelectJoinButton } from '../../shared/amplitude/events/signup/SelectJoinButton';
import { useAppSelector } from '../../shared/store';
import SkeletonLoading from '../../shared/components/Loading/SkeletonLoading';
import NewBadge from '../../shared/icons/NewBadge';
import GradeBadge from '../../mypage/info-section/components/GradeBadge';

const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: ${zIndex.headerMenu};
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const Wrapper = styled.div`
  line-height: 35px;
  position: relative;

  .menu {
    display: none;
  }

  :hover {
    .menu {
      display: block;
    }
  }
`;

const MenuLink = styled.a<{ highlight?: boolean; isLast?: boolean }>`
  display: block;
  color: ${({ highlight }) => highlight && COLOR.kurlyPurple};
  cursor: pointer;
`;

const UserName = styled.span`
  svg {
    margin: -2px 0 0 2px;
    vertical-align: middle;
  }
  .vip-badge,
  .membership-badge {
    margin: -2px 6px 0 0;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 13px;
  margin: 0 12px;
  background-color: ${COLOR.kurlyGray300};
`;

const arrow = css`
  display: inline-block;
  margin-left: 5px;
  margin-bottom: 1px;
`;

interface Props {
  userMenus: Menu[];
  userNotification: UserNotification;
}

/**
 * TODO: return url 부분 확인 필요 로그인이후 해당 페이지로 return 해야함
 */
function MainMenu({ userMenus, userNotification }: Props) {
  const { hasSession, isGuest } = useAppSelector(({ auth }) => auth);
  const { userName, userGradeName, isSubscribed, vipInfo } = useAppSelector(({ member }) => ({
    userName: member.info?.name,
    userGradeName: member.info?.gradeName,
    vipInfo: member.info?.vipInfo,
    isSubscribed: member.subscription.isSubscribed,
  }));

  const redirect = useLink();

  const handleLink = useCallback(
    (url: string) => {
      if (url === BOARD_PATH.notice.uri) {
        void amplitudeService.logEvent(new SelectMyKurlyServiceCenter());
      }

      if (url === COMMON_PATH.signup.uri) {
        void amplitudeService.logEvent(
          new SelectJoinButton({
            joinPath: 'kurly',
          }),
        );
      }

      redirect(url);
    },
    [redirect],
  );

  const clickUserName = useCallback(() => {
    amplitudeService.logEvent(new SelectMyKurlyOrderHistory());

    handleLink(MYPAGE_PATH.orderList.uri);
  }, [handleLink]);

  return (
    <Container>
      {hasSession ? (
        isGuest ? (
          <>
            <MenuLink onClick={() => handleLink(COMMON_PATH.signup.uri)} highlight>
              회원가입
            </MenuLink>

            <Divider />

            <MenuLink onClick={() => handleLink(COMMON_PATH.login.uri)}>로그인</MenuLink>
          </>
        ) : (
          <Wrapper>
            <MenuLink onClick={clickUserName}>
              {userGradeName && userName && (
                <UserName>
                  <GradeBadge
                    userGradeName={userGradeName ?? ''}
                    isSubscribed={isSubscribed}
                    vipName={vipInfo?.name ?? ''}
                    membersIconWidth={38}
                    iconHeight={16}
                    fontSize={10}
                  />
                  {userName} 님{userNotification.hasNew && <NewBadge width={12} height={12} />}
                </UserName>
              )}
              <TriangleArrowIcon css={arrow} />
            </MenuLink>
            <SubMenu className="menu" menus={userMenus} />
          </Wrapper>
        )
      ) : (
        <SkeletonLoading width={150} />
      )}

      <Divider />

      <Wrapper>
        <MenuLink onClick={() => handleLink(BOARD_PATH.notice.uri)}>
          고객센터
          <TriangleArrowIcon css={arrow} />
        </MenuLink>

        <SubMenu className="menu" menus={CUSTOMER_MENU} />
      </Wrapper>
    </Container>
  );
}

export default memo(MainMenu);
