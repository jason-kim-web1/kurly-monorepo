import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const SectionWrapper = styled.div``;

const SectionHappyCenter = styled.div`
  padding: 60px 5px 0;
  border-top: 1px solid ${COLOR.lightGray};
`;

const Happy = styled.div``;

const Title = styled.h5`
  font-weight: 500;
  font-size: 28px;
  color: ${COLOR.kurlyGray600};
`;

const Sub = styled.p`
  padding-top: 31px;
  font-weight: 500;
  font-size: 18px;
  color: ${COLOR.kurlyGray600};
  line-height: 23px;
`;

const SubEmph = styled.span`
  display: block;
  padding-top: 6px;
  font-weight: 300;
  font-size: 16px;
`;

const List = styled.ul`
  display: flex;
  padding: 59px 0 71px;
`;

const Item = styled.li`
  flex-shrink: 0;
  width: 340px;
`;

const ItemTitle = styled.strong`
  display: block;
  font-weight: 500;
  font-size: 18px;
  color: ${COLOR.kurlyPurple};
  line-height: 27px;

  &:before {
    content: '';
    display: inline-block;
    width: 3px;
    height: 20px;
    margin: 5px 10px 0 0;
    background-color: ${COLOR.kurlyPurple};
    vertical-align: top;
  }
`;

const ItemSub = styled.span`
  display: block;
  padding-top: 9px;
  font-weight: 300;
  font-size: 17px;
  line-height: 25px;
`;

const ItemNotice = styled.strong`
  display: block;
  padding-top: 13px;
  font-weight: 300;
  font-size: 15px;
  color: ${COLOR.kurlyGray600};
  line-height: 22px;
`;

export default function HappyCenter() {
  return (
    <SectionWrapper>
      <SectionHappyCenter>
        <Happy>
          <Title>고객행복센터</Title>
          <Sub>
            궁금하신 점이나 서비스 이용에 불편한 점이 있으신가요?
            <SubEmph>
              문제가 되는 부분을 사진으로 찍어 아래 중 편하신 방법으로 접수해 주시면 빠르게 도와드리겠습니다.
            </SubEmph>
          </Sub>
        </Happy>
        <List>
          <Item>
            <ItemTitle>전화 문의 1644-1107</ItemTitle>
            <ItemSub>월~토요일 오전 7시 - 오후 6시</ItemSub>
          </Item>
          <Item>
            <ItemTitle>카카오톡 문의</ItemTitle>
            <ItemSub>월~토요일 오전 7시 - 오후 6시</ItemSub>
            <ItemSub>일/공휴일 오전 7시 - 오후 1시</ItemSub>
            <ItemNotice>
              카카오톡에서
              {" '"}
              컬리
              {"' "}
              를 검색 후
              <br />
              대화창에 문의 및 불편사항을
              <br />
              남겨주세요.
            </ItemNotice>
          </Item>
          <Item>
            <ItemTitle>홈페이지 문의</ItemTitle>
            <ItemSub>365일</ItemSub>
            <ItemSub>
              로그인
              {' > '}
              마이컬리
              {' > '}
              1:1 문의
            </ItemSub>
            <ItemNotice>
              고객센터 운영 시간에 순차적으로
              <br />
              답변해드리겠습니다.
            </ItemNotice>
          </Item>
        </List>
      </SectionHappyCenter>
    </SectionWrapper>
  );
}
