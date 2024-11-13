import styled from '@emotion/styled';

import COLOR from '../../../../../../shared/constant/colorset';

const Container = styled.div`
  margin: 20px 20px 0;
  height: 48px;
  border-radius: 24px;
  background-color: #f2f1f5;
  text-align: center;
`;

const GuideText = styled.span`
  display: inline-block;
  padding: 17px 13px 0 0;
  font-size: 12px;
  color: ${COLOR.kurlyGray600};
  white-space: nowrap;
`;

const HandIcon = styled.span`
  display: inline-block;
  position: relative;
  width: 28px;
  height: 100%;
  vertical-align: top;

  .circle1 {
    position: absolute;
    left: 5px;
    top: 13px;
    width: 9px;
    height: 9px;
    border-radius: 9px;
    background-color: #ccc6dc;
    opacity: 0;
  }

  .circle2 {
    position: absolute;
    left: 0;
    top: 8px;
    width: 18px;
    height: 18px;
    border: 5px solid #ccc6dc;
    border-radius: 9px;
    background-color: #f2f1f5;
  }

  .hand {
    position: absolute;
    left: 5px;
    top: 16px;
    width: 24px;
    height: 26px;
    background: url(https://res.kurly.com/mobile/service/goodsview/1901/ico_hand.png) no-repeat 0 0;
    background-size: 24px 26px;
  }
`;

export default function ZoomImageGuide() {
  return (
    <Container>
      <GuideText>아래 이미지를 터치하면 확대해서 볼 수 있습니다.</GuideText>
      <HandIcon>
        <span className="circle1" />
        <span className="circle2" />
        <span className="hand" />
      </HandIcon>
    </Container>
  );
}
