import styled from '@emotion/styled';

import Link from 'next/link';

import { listAll, listAllPressed } from '../../../../shared/images';
import COLOR from '../../../../shared/constant/colorset';

const ShowAll = styled.a`
  display: block;
  border: 1px solid transparent;
  padding-top: 4px;
  background: transparent;
  outline: 0;
  user-select: none;
  span {
    display: block;
    font-size: 16px;
    color: ${COLOR.kurlyGray800};
    font-weight: normal;
    text-align: center;
  }

  .icon {
    display: block;
    margin-bottom: 18px;
    width: 64px;
    height: 64px;
    background: url(${listAll}) 50% / contain no-repeat;
    &:hover {
      background-image: url(${listAllPressed});
    }
  }
`;

const Container = styled.div`
  display: flex;
  height: 320px;
  justify-content: center;
  align-items: center;
`;

interface Props {
  landingUrl?: string;
  className?: string;
  onSelectMore(): void;
}

export default function ShowMoreSlideItem({ landingUrl, className, onSelectMore }: Props) {
  if (!landingUrl) {
    return null;
  }

  return (
    <Container className={className}>
      <Link href={landingUrl} passHref>
        <ShowAll onClick={() => onSelectMore()}>
          <span className="icon" />
          <span>전체보기</span>
        </ShowAll>
      </Link>
    </Container>
  );
}
