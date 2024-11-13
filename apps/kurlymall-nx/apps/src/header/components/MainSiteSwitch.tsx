import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import MainLogo from './MainLogo';
import COLOR from '../../shared/constant/colorset';
import { MainSite } from '../../main/interfaces/MainSection.interface';
import AmplitudeSiteSwitchEvent from '../../shared/amplitude/component/AmplitudeSiteSwitchEvent';
import { redirectTo } from '../../shared/reducers/page';
import { USER_MENU_PATH, getPageUrl } from '../../shared/constant';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 63px;
`;

const Button = styled.button`
  flex-shrink: 0;
  margin-left: 20px;
  font-size: 18px;
  font-weight: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: ${COLOR.kurlyGray400};
  cursor: pointer;
  &.active,
  :hover {
    font-weight: 500;
    color: ${COLOR.kurlyPurple};
  }
  &:last-of-type {
    margin-left: 22px;
  }
  &:not(:last-of-type):after {
    content: '';
    position: absolute;
    width: 1px;
    height: 14px;
    margin-top: 5px;
    margin-left: 11px;
    background-color: ${COLOR.kurlyGray250};
  }
`;

interface Props {
  activeSite: MainSite;
}

export default function MainSiteSwitch({ activeSite }: Props) {
  const dispatch = useDispatch();

  const moveSite = async (site: MainSite) => {
    if (site === 'BEAUTY') {
      dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.beautyHome), isExternal: true }));
      return;
    }
    dispatch(redirectTo({ url: getPageUrl(USER_MENU_PATH.home), isExternal: true }));
  };

  return (
    <Container>
      <MainLogo />
      <AmplitudeSiteSwitchEvent site="MARKET">
        <Button className={activeSite === 'MARKET' ? 'active' : ''} onClick={() => moveSite('MARKET')}>
          마켓컬리
        </Button>
      </AmplitudeSiteSwitchEvent>
      <AmplitudeSiteSwitchEvent site="BEAUTY">
        <Button className={activeSite === 'BEAUTY' ? 'active' : ''} onClick={() => moveSite('BEAUTY')}>
          뷰티컬리
        </Button>
      </AmplitudeSiteSwitchEvent>
    </Container>
  );
}
