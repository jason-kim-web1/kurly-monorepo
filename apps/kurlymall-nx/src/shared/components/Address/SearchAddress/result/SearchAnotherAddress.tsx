import styled from '@emotion/styled';

import Button from '../../../Button/Button';

const Wrapper = styled.div`
  text-align: center;
  > button {
    margin: 22px auto 0;
    span {
      font-weight: normal;
    }
  }
`;

const Title = styled.strong`
  display: block;
  padding-bottom: 10px;
  font-size: 24px;
  line-height: 30px;
  font-weight: 600;
  color: #333;
  em {
    font-style: normal;
    color: #f03f40;
  }
`;

const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  color: #999;
`;

export default function SearchAnotherAddress({ handleSearchAddress }: { handleSearchAddress(): void }) {
  return (
    <Wrapper>
      <Title>
        <em>배송불가</em> 지역입니다.
      </Title>
      <Text>
        더 많은 곳에 배송될 수 있게 최선을 다하겠습니다.
        <br />
        선물 수령이 가능한 다른 주소를 한번 더 검색해보세요.
      </Text>
      <Button text="주소 검색" width={146} height={44} radius={44} onClick={handleSearchAddress} />
    </Wrapper>
  );
}
