import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

const Title = styled.h3`
  padding-top: 18px;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
`;

const Phone = styled.a`
  display: inline-block;
  padding: 2px 0 7px;
  font-weight: 300;
  font-size: 20px;
  color: ${COLOR.kurlyPurple};
  line-height: 24px;
  vertical-align: top;
`;

const Line = styled.span`
  display: inline-block;
  width: 1px;
  height: 10px;
  margin: 0 4px 0 4px;
  background-color: ${COLOR.kurlyGray450};
  vertical-align: -1px;
`;

const Desc = styled.div();

const Link = styled.a`
  color: ${COLOR.kurlyPurple};
`;

interface Props {
  onClickAddChanner(): void;
}

export default function CustomerMenu({ onClickAddChanner }: Props) {
  return (
    <>
      <Title>고객행복센터</Title>
      <Phone href="tel:16441107">1644-1107</Phone>
      <Desc>
        월~토요일
        <Line />
        오전 7시 - 오후 6시
      </Desc>
      <Desc>
        카카오톡 <Link onClick={onClickAddChanner}>@컬리</Link> 친구 추가하고 소식과 혜택을 받아보세요.
      </Desc>
    </>
  );
}
