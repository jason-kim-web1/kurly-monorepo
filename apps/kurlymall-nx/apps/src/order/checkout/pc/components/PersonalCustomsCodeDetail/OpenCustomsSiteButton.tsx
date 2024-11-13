import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

import { ArrowRight } from '../../../../../shared/icons';

const Anchor = styled.a`
  display: inline-flex;
  color: ${COLOR.validBlue};
  align-items: center;
  font-size: 13px;
`;

const OpenCustomsSiteButton = () => {
  return (
    <Anchor href="https://unipass.customs.go.kr/csp/persIndex.do" rel="noopener noreferrer" target="_blank">
      관세청 사이트에서 조회/발급하기 <ArrowRight width={18} height={18} stroke={COLOR.validBlue} />
    </Anchor>
  );
};

export default OpenCustomsSiteButton;
