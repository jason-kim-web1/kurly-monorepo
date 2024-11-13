import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

const Wrapper = styled.div`
  position: relative;
  min-height: 360px;
`;

const Contents = styled.div`
  overflow: hidden;
  position: relative;
  padding: 0 20px;
`;

const Detail = styled.div`
  font-size: 14px;
  line-height: 20px;
`;

const Subject = styled.h4`
  margin: 20px 0 10px;
  border-top: 1px solid #cea12f;
  border-bottom: 1px solid #cea12f;
  font-weight: 600;
  color: ${COLOR.kurlyPurple};
  line-height: 36px;
  text-align: center;
  white-space: nowrap;
`;

const List = styled.ul`
  li {
    display: flex;
    flex-direction: row;
    + li {
      padding-top: 5px;
    }
  }

  em {
    display: inline-block;
    flex-shrink: 0;
    align-items: center;
    width: 16px;
    height: 16px;
    margin: 2px 12px 0 0;
    border: 1px solid ${COLOR.kurlyPurple};
    border-radius: 3px;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: ${COLOR.kurlyPurple};
  }
`;

export default function Information({ message }: { message?: string }) {
  return (
    <Wrapper>
      <Contents>
        <Detail>
          <Subject>월 4,500 원으로 즐기는 무제한 무료배송</Subject>
          {message && <p>{message}</p>}
        </Detail>
        <Detail>
          <Subject>컬리패스, 이런 분들께 추천드립니다!</Subject>
          <List>
            {['한 번에 4만원 미만으로 주문하시는 분', '배송비(3천원)를 두 번이상 결제 해보신 분'].map((str, index) => (
              <li key={str}>
                <em>{index + 1}</em>
                <span>{str}</span>
              </li>
            ))}
          </List>
        </Detail>
      </Contents>
    </Wrapper>
  );
}
