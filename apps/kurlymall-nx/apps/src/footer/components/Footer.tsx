import styled from '@emotion/styled';

import CustomerMenu from './CustomerMenu';
import CompanyMenu from './CompanyMenu';
import SnsMenu from './SnsMenu';
import CertificateMenu from './CertificateMenu';

import { CompanyList, SnsList, CertificateList } from '../content/footerInfo';
import IndemnificationMessage from './IndemnificationMessage';
import COLOR from '../../shared/constant/colorset';

const Container = styled.div`
  padding-top: 30px;
  border-top: 1px solid ${COLOR.bgLightGray};
`;

const Content = styled.div`
  width: 1050px;
  margin: 0 auto;
`;

const CustomerCenter = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding-bottom: 30px;
`;

const CompanyWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyInfo = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  color: ${COLOR.kurlyGray450};
  margin-bottom: 40px;
`;

const Line = styled.span`
  padding-left: 4px;

  &:after {
    content: '|';
    padding-right: 4px;
    font-size: 10px;
    vertical-align: top;
  }
`;

const CompanyLink = styled.a`
  margin-left: 3px;
  color: ${COLOR.kurlyPurple};
`;

export default function Footer() {
  return (
    <Container>
      <Content id="footer">
        <CustomerCenter>
          <CustomerMenu />
          <CompanyWrap>
            <CompanyMenu menuList={CompanyList} />
            <CompanyInfo>
              법인명 (상호) : 주식회사 컬리 <Line /> 사업자등록번호 : 261-81-23567
              <CompanyLink
                href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&amp;apv_perm_no="
                target="_blank"
                rel="noreferrer"
              >
                사업자정보 확인
              </CompanyLink>
              <br />
              통신판매업 : 제 2018-서울강남-01646 호
              <br />
              주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동) <Line /> 대표이사 : 김슬아
              <br />
              채용문의 :<CompanyLink href="mailto:recruit@kurlycorp.com">recruit@kurlycorp.com</CompanyLink>
              <br />
              팩스: 070 - 7500 - 6098
            </CompanyInfo>
            <SnsMenu menuList={SnsList} />
          </CompanyWrap>
        </CustomerCenter>
        <CertificateMenu menuList={CertificateList} />
      </Content>
      <IndemnificationMessage />
    </Container>
  );
}
