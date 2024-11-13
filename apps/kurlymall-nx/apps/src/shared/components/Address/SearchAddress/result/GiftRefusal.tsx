import styled from '@emotion/styled';

import Button from '../../../Button/Button';

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px;
  text-align: center;
`;

const Text = styled.p`
  padding: 0 8px 16px;
  font-size: 14px;
  line-height: 20px;
  color: #999;
`;

interface Props {
  handleRefusal(): void;
}

export default function GiftRefusal({ handleRefusal }: Props) {
  return (
    <Wrapper>
      <Text>
        다른 주소로 수령이 어려운 경우
        <br />
        <strong> &lsquo;선물 거절&rsquo;</strong>을 선택해주세요.
      </Text>
      <Button text="선물 거절" theme="tertiary" height={52} onClick={handleRefusal} />
    </Wrapper>
  );
}
