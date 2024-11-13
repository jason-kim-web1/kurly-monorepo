import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { zIndex } from '../../../../shared/styles';

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${COLOR.kurlyGray450};
`;

const Content = styled.div`
  position: fixed;
  z-index: ${zIndex.productMaximum};
  top: 10%;
  width: 100%;
  font-size: 20px;
  color: #fff;
  text-align: center;
  white-space: pre-line;
  line-height: 130%;
`;

const LoadingImg = styled.div`
  height: 60px;
  background: url(https://res.kurly.com/pc/img/1909/img_loading_128x128.gif) no-repeat 50% 50%;
  background-size: 30px 30px;
`;

export default function InProgress() {
  return (
    <Wrapper>
      <Content>
        {'결제 진행 중입니다.\n결제가 완료될 때까지 잠시만 기다려 주세요.'}
        <LoadingImg />
      </Content>
    </Wrapper>
  );
}
