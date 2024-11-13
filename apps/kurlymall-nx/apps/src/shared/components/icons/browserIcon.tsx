import styled from '@emotion/styled';

import { Chrome, Edge, Firefox, Opera } from '../../images';

type BrowserType = 'chrome' | 'edge' | 'firefox' | 'opera';

interface Props {
  browser?: BrowserType;
  onClick(): void;
}

const Wrapper = styled.div`
  display: inline-block;
  width: 200px;
  height: 200px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  text-align: center;
  background-color: #f7f7f7;
`;

const Icon = styled.span<{ type: string }>`
  display: inline-block;
  width: 90px;
  height: 90px;
  margin: 30px 0 23px;
  ${({ type }) =>
    type &&
    `
    background: url(${type}) 0 0 no-repeat;
    background-size: cover;
  `}
`;

const BROWSER_TYPE = {
  chrome: {
    image: Chrome,
    text: 'Google Chrome',
  },
  edge: {
    image: Edge,
    text: 'Microsoft Edge',
  },
  firefox: {
    image: Firefox,
    text: 'Mozilla Firefox',
  },
  opera: {
    image: Opera,
    text: 'Opera',
  },
};

export default function BrowserIcon({ browser = 'chrome', onClick }: Props) {
  return (
    <Wrapper onClick={onClick}>
      <Icon type={BROWSER_TYPE[browser].image} />
      {BROWSER_TYPE[browser].text}
    </Wrapper>
  );
}
