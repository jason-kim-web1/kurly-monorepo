import styled from '@emotion/styled';

const Link = styled.a``;

const Img = styled.img`
  display: block;
  height: 36px;
  margin: 0 auto;
`;

/* TODO: 메인일때는 에니메이션 로고 대응이 필요함. */
export default function MainLogo() {
  return (
    <Link href="/">
      <Img src="https://res.kurly.com/images/marketkurly/logo/logo_type2_x2.png" alt="컬리 로고" />
    </Link>
  );
}
