import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const AticleWhyKurly = styled.div`
  padding: 0px 26px;
  margin-top: 80px;
  padding-bottom: 20px;
`;

const Title = styled.div`
  position: relative;
  text-align: left;
  &:before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 16px;
    height: 1px;
    background: ${COLOR.lightGray};
  }
`;

const TitleText = styled.span`
  position: relative;
  z-index: 1;
  padding-right: 15px;
  background-color: ${COLOR.kurlyWhite};
  font-weight: 600;
  font-size: 22px;
  color: ${COLOR.kurlyGray600};
  line-height: 33px;
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  padding-top: 22px;
  &:first-of-type {
    padding-top: 32px;
  }
`;

const Img = styled.img`
  width: 40px;
`;

const List = styled.dl`
  flex: 1;
`;

const ListTitle = styled.dt`
  display: block;
  padding: 2px 0 0 18px;
  font-weight: 600;
  font-size: 14px;
  color: ${COLOR.kurlyPurple};
`;

const ListDescription = styled.dd`
  padding: 10px 10px 0 18px;
  font-size: 13px;
  color: ${COLOR.kurlyGray800};
  line-height: 1.54;
  text-align: justify;
`;

const Emph = styled.span`
  display: block;
  padding-top: 7px;
  font-size: 11px;
  color: ${COLOR.kurlyGray600};
`;

export default function WhyKurly() {
  return (
    <AticleWhyKurly>
      <Title>
        <TitleText>WHY KURLY</TitleText>
      </Title>
      <Item>
        <Img src="https://res.kurly.com/pc/ico/1910/01_check.svg" alt="아이콘" />
        <List>
          <ListTitle>깐깐한 상품위원회</ListTitle>
          <ListDescription>
            나와 내 가족이 먹고 쓸 상품을 고르는 마음으로
            <br />
            매주 상품을 직접 먹어보고, 경험해보고
            <br />
            성분, 맛, 안정성 등 다각도의 기준을 통과한
            <br />
            상품만을 판매합니다.
            <Emph>(온라인 기준 / 자사몰, 직구 제외)</Emph>
          </ListDescription>
        </List>
      </Item>
      <Item>
        <Img src="https://res.kurly.com/pc/ico/1910/02_only.svg" alt="아이콘" />
        <List>
          <ListTitle>차별화된 Kurly Only 상품</ListTitle>
          <ListDescription>
            전국 각지와 해외의 훌륭한 생산자가 믿고
            <br />
            선택하는 파트너, 컬리. 3천여 개가 넘는
            <br />
            컬리 단독 브랜드, 스펙의 Kurly Only 상품을
            <br />
            믿고 만나보세요.
            <Emph>(온라인 기준 / 자사몰, 직구 제외)</Emph>
          </ListDescription>
        </List>
      </Item>
      <Item>
        <Img src="https://res.kurly.com/pc/ico/1910/03_cold.svg" alt="아이콘" />
        <List>
          <ListTitle>신선한 풀콜드체인 배송</ListTitle>
          <ListDescription>
            온라인 업계 최초로 산지에서 문 앞까지 상온,
            <br />
            냉장, 냉동 상품을 분리 포장 후 최적의 온도를
            <br />
            유지하는 냉장 배송 시스템, 풀콜드체인으로
            <br />
            상품을 신선하게 전해드립니다.
            <Emph>(샛별배송에 한함)</Emph>
          </ListDescription>
        </List>
      </Item>
      <Item>
        <Img src="https://res.kurly.com/pc/ico/1910/04_price.svg" alt="아이콘" />
        <List>
          <ListTitle>고객, 생산자를 위한 최선의 가격</ListTitle>
          <ListDescription>
            매주 대형 마트와 주요 온라인 마트의 가격 변동
            <br />
            상황을 확인해 신선식품은 품질을 타협하지 않는
            <br />
            선에서 최선의 가격으로, 가공식품은 언제나
            <br />
            합리적인 가격으로 정기 조정합니다.
          </ListDescription>
        </List>
      </Item>
      <Item>
        <Img src="https://res.kurly.com/pc/ico/1910/05_eco.svg" alt="아이콘" />
        <List>
          <ListTitle>환경을 생각하는 지속 가능한 유통</ListTitle>
          <ListDescription>
            친환경 포장재부터 생산자가 상품에만 집중할 수
            <br />
            있는 직매입 유통구조까지, 지속 가능한 유통을
            <br />
            고민하며 컬리를 있게 하는 모든 환경(생산자,
            <br />
            커뮤니티, 직원)이 더 나아질 수 있도록 노력합니다.
          </ListDescription>
        </List>
      </Item>
    </AticleWhyKurly>
  );
}
