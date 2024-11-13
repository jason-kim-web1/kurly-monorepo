/* eslint-disable react/no-unused-prop-types */
import styled from '@emotion/styled';

import BrowserIcon from '../shared/components/icons/browserIcon';
import KurlyIcon from '../shared/components/icons/kurlyIcon';

import COLOR from '../shared/constant/colorset';

type BrowserType = 'chrome' | 'edge' | 'firefox' | 'opera';

interface BrowserInfo {
  browser: BrowserType;
  url: string;
}

const BROWSER_INFO: BrowserInfo[] = [
  {
    browser: 'edge',
    url: 'https://www.microsoft.com/ko-kr/edge',
  },
  {
    browser: 'chrome',
    url: 'https://www.google.com/chrome/',
  },
  {
    browser: 'firefox',
    url: 'https://www.mozilla.org/ko/firefox/new/',
  },
  {
    browser: 'opera',
    url: 'https://www.opera.com/ko',
  },
];

const KURLY_SITE = 'https://www.kurly.com';

const Wrapper = styled.div`
  width: 1050px;
  margin: 0 auto;
  color: ${COLOR.kurlyGray800};
  text-align: center;
`;

const Logo = styled.h1`
  width: 156px;
  height: 120px;
  margin: 60px auto 40px;
  a {
    display: block;
  }
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 36px;
  font-weight: bold;
`;

const Description = styled.p`
  margin-bottom: 80px;
  font-size: 20px;
  line-height: 30px;
`;

const BrowserWrap = styled.div`
  white-space: nowrap;
  > div {
    display: inline-block;
  }
  > div + div {
    margin-left: 20px;
  }
`;

export default function BrowserUpdate() {
  const handleSite = (url: string) => {
    window.location.assign(url);
  };

  return (
    <Wrapper>
      <Logo>
        <a href={KURLY_SITE} target="_blank" rel="noreferrer">
          <KurlyIcon />
        </a>
      </Logo>
      <Title>브라우저를 업데이트 해주세요.</Title>
      <Description>
        고객님의 브라우저에서는 일부 기능이 정상 동작하지 않을 수 있습니다.
        <br />
        최신 버전의 브라우저로 업데이트 해주세요.
      </Description>
      <BrowserWrap>
        {BROWSER_INFO.map(({ browser, url }: BrowserInfo) => (
          <BrowserIcon key={browser + url} browser={browser} onClick={() => handleSite(url)} />
        ))}
      </BrowserWrap>
    </Wrapper>
  );
}
