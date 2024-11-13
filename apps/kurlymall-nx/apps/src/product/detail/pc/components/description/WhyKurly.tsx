import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const AticleWhyKurly = styled.div`
  padding: 100px 0 88px;
  border-top: 1px solid ${COLOR.kurlyGray200};
`;

const Title = styled.div`
  text-align: center;
`;

const TitleText = styled.span`
  font-weight: 400;
  font-size: 33px;
  color: ${COLOR.kurlyGray600};
`;

const Item = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 21px;
`;

const List = styled.dl`
  width: 315px;
  padding-top: 59px;
`;

const ListTitle = styled.dt<{ thumbUrl: string }>`
  display: block;
  font-weight: 500;
  font-size: 18px;
  color: ${COLOR.kurlyPurple};
  line-height: 27px;
  text-align: center;

  &:before {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    margin: 0 auto 10px;
    background: url(${(props) => props.thumbUrl}) no-repeat 50% 50%;
  }
`;

const ListDescription = styled.dd`
  padding-top: 22px;
  font-weight: 300;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  line-height: 25px;
  text-align: center;
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
        <List>
          <ListTitle thumbUrl="https://res.kurly.com/pc/ico/1910/01_check.svg">깐깐한 상품위원회</ListTitle>
          <ListDescription>
            나와 내 가족이 먹고 쓸 상품을 고르는
            <br />
            마음으로 매주 상품을 직접 먹어보고,
            <br />
            경험해보고 성분, 맛, 안정성 등 다각도의
            <br />
            기준을 통과한 상품만을 판매합니다.
            <Emph>(온라인 기준 / 자사몰, 직구 제외)</Emph>
          </ListDescription>
        </List>
        <List>
          <ListTitle thumbUrl="https://res.kurly.com/pc/ico/1910/02_only.svg">차별화된 Kurly Only 상품</ListTitle>
          <ListDescription>
            전국 각지와 해외의 훌륭한 생산자가
            <br />
            믿고 선택하는 파트너, 컬리.
            <br />
            3천여 개가 넘는 컬리 단독 브랜드, 스펙의
            <br />
            Kurly Only 상품을 믿고 만나보세요.
            <Emph>(온라인 기준 / 자사몰, 직구 제외)</Emph>
          </ListDescription>
        </List>
        <List>
          <ListTitle thumbUrl="https://res.kurly.com/pc/ico/1910/03_cold.svg">신선한 풀콜드체인 배송</ListTitle>
          <ListDescription>
            온라인 업계 최초로 산지에서 문 앞까지
            <br />
            상온, 냉장, 냉동 상품을 분리 포장 후
            <br />
            최적의 온도를 유지하는 냉장 배송 시스템,
            <br />
            풀콜드체인으로 상품을 신선하게 전해드립니다.
            <Emph>(샛별배송에 한함)</Emph>
          </ListDescription>
        </List>
        <List>
          <ListTitle thumbUrl="https://res.kurly.com/pc/ico/1910/04_price.svg">
            고객, 생산자를 위한 최선의 가격
          </ListTitle>
          <ListDescription>
            매주 대형 마트와 주요 온라인 마트의 가격
            <br />
            변동 상황을 확인해 신선식품은 품질을
            <br />
            타협하지 않는 선에서 최선의 가격으로,
            <br />
            가공식품은 언제나 합리적인 가격으로
            <br />
            정기 조정합니다.
          </ListDescription>
        </List>
        <List>
          <ListTitle thumbUrl="https://res.kurly.com/pc/ico/1910/05_eco.svg">
            환경을 생각하는 지속 가능한 유통
          </ListTitle>
          <ListDescription>
            친환경 포장재부터 생산자가 상품에만
            <br />
            집중할 수 있는 직매입 유통구조까지,
            <br />
            지속 가능한 유통을 고민하며 컬리를 있게
            <br />
            하는 모든 환경(생산자, 커뮤니티, 직원)이
            <br />더 나아질 수 있도록 노력합니다.
          </ListDescription>
        </List>
      </Item>
    </AticleWhyKurly>
  );
}
