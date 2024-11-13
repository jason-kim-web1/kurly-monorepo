import styled from '@emotion/styled';

import BenefitMenu from '../../../../src/member/benefit/components/pc/BenefitMenu';
import BenefitPayment from '../../../../src/member/benefit/components/pc/BenefitPayment';
import BenefitBanner from '../../../../src/member/benefit/components/pc/BenefitBanner';

import { Menus, Banners } from '../../../../src/member/benefit/content/total';

const Container = styled.div`
  width: 820px;
  margin: 0 auto;
  padding: 65px 0 100px;
`;

const PaymentWrap = styled.div`
  display: flex;
  padding: 40px 0 50px;
  border-bottom: 1px solid #eee;
`;

const Title = styled.h3`
  min-width: 260px;
  font-weight: 600;
  font-size: 28px;
  letter-spacing: -1px;
  color: #282828;
`;

const Content = styled.div`
  width: 100%;
`;

const BannerWrap = styled.div`
  margin-top: 58px;
`;

export default function Total() {
  return (
    <Container>
      {Menus.map((menu) => (
        <BenefitMenu menu={menu} key={menu.title} />
      ))}

      <PaymentWrap>
        <Title>결제 혜택</Title>
        <Content>
          <BenefitPayment />
        </Content>
      </PaymentWrap>

      <BannerWrap>
        {Banners.map((banner) => (
          <BenefitBanner banner={banner} key={banner.link} />
        ))}
      </BannerWrap>
    </Container>
  );
}
