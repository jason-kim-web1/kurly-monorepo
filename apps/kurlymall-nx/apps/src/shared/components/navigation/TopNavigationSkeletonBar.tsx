import styled from '@emotion/styled';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

import { USER_MENU_PATH } from '../../constant';
import { MWMainSiteNavigation } from '../../../main/navigation';

const BarWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  & > a {
    width: 15%;
  }
`;

const SkeletonArray = MWMainSiteNavigation.MARKET.map((_, index) => index);

function TopNavigationSkeletonBar() {
  return (
    <BarWrapper>
      {SkeletonArray.map((index) => (
        <Link key={index} href={USER_MENU_PATH.home.uri}>
          <a href={USER_MENU_PATH.home.uri} className={index === 0 ? 'active' : ''}>
            <Skeleton />
          </a>
        </Link>
      ))}
    </BarWrapper>
  );
}

export default TopNavigationSkeletonBar;
