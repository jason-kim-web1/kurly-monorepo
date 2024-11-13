import styled from '@emotion/styled';

import { isUndefined } from 'lodash';

import { isPC } from '../../../../../util/window/getDevice';

import { KurlyMembersBanner } from './KurlyMembersBanner';
import useKurlyMembersBanner from '../hooks/useKurlyMembersBanner';

const BannerWrapper = styled.div`
  margin: ${isPC ? `20px 0` : `20px 0 10px`};
  min-height: 114px;
  flex-shrink: 0;
  border-radius: 6px;
`;

export function KurlyMembersKurlyPayBanner() {
  const { bannerUrl, goToMembership, membersBanner } = useKurlyMembersBanner();

  if (isUndefined(bannerUrl)) {
    return null;
  }

  return (
    <BannerWrapper>
      <KurlyMembersBanner membersBanner={membersBanner} handleClick={goToMembership} />
    </BannerWrapper>
  );
}
