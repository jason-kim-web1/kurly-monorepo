import styled from '@emotion/styled';

import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { arrow20x20x333 } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

const More = styled.a`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 48px;
  margin-top: 24px;
  padding-top: 14px;
  border-radius: 3px;
  background-color: ${COLOR.mykurlyBg};
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.benefitGray};

  :after {
    content: '';
    width: 20px;
    height: 20px;
    background: url(${arrow20x20x333}) no-repeat 50% 50%;
  }
`;

interface Props {
  landingUrl: string;

  onSelectMore?(): void;
}

export default function SectionMore({ landingUrl, onSelectMore }: Props) {
  return (
    <MobileLink url={landingUrl} passHref>
      <More href={landingUrl} onClick={onSelectMore}>
        전체보기
      </More>
    </MobileLink>
  );
}
