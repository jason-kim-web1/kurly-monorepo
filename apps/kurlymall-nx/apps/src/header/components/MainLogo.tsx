import styled from '@emotion/styled';

import Link from 'next/link';

import { kurlyMainLogo } from '../../shared/images';

const Img = styled.img`
  flex: 0 0 82px;
`;

/* TODO: 메인일때는 에니메이션 로고 대응이 필요함. */
export default function MainLogo() {
  const currentSitePath = ''; // TODO 사이트 상태별 경로 지정

  return (
    <Link href={`/main/${currentSitePath}`}>
      <Img src={kurlyMainLogo} alt="마켓컬리 로고" />
    </Link>
  );
}
