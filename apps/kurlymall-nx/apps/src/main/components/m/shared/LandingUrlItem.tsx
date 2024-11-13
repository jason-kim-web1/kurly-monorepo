import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import ShowAll from '../../../../shared/icons/ShowAll';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30.74vw;
  height: 52vw;
  flex-shrink: 0;
  padding-left: 8px;
  scroll-snap-align: start;

  &:active {
    .icon {
      background: ${COLOR.kurlyGray200};
    }
  }

  .icon {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  img {
    margin-bottom: 8px;
    width: 45px;
    height: 45px;
  }

  .text {
    display: block;
    font-size: 14px;
    color: ${COLOR.benefitGray};
    font-weight: normal;
    text-align: center;
    margin-top: 8px;
  }
`;

interface Props {
  landingUrl: string;
  className?: string;

  handleSelectMore(): void;
}

export default function LandingUrlItem({ landingUrl, className, handleSelectMore }: Props) {
  return (
    <MobileLink url={landingUrl} passHref>
      <a href={landingUrl} onClick={() => handleSelectMore()}>
        <Container className={className}>
          <span className="icon">
            <ShowAll />
          </span>
          <span className="text">전체보기</span>
        </Container>
      </a>
    </MobileLink>
  );
}
