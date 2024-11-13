import { useCallback } from 'react';

import styled from '@emotion/styled';

import { KAKAO_SHARE_KEY } from '../../../shared/configs/config';

import CustomerMenu from './CustomerMenu';
import CompanyMenu from './CompanyMenu';
import SnsMenu from './SnsMenu';
import CertificateMenu from './CertificateMenu';

import { CertificateList, CompanyListMobile, SnsList } from '../../content/footerInfo';
import IndemnificationMessage from './IndemnificationMessage';

import COLOR from '../../../shared/constant/colorset';
import { BULK_ORDER_GOOGLE_FORM_LINK } from '../../../header/constants';

const Container = styled.div`
  margin-top: 8px;
  background-color: ${COLOR.mykurlyBg};
`;

const FooterWrap = styled.div`
  padding: 10px 16px 0;
  font-size: 12px;
  color: ${COLOR.benefitTextGray};
  line-height: 18px;
`;

const Information = styled.div`
  padding-top: 24px;
`;

const Contact = styled.div`
  padding-top: 14px;
`;

const Link = styled.a`
  margin-left: 3px;
  color: ${COLOR.mainPurple};
`;

const Line = styled.span`
  display: inline-block;
  width: 1px;
  height: 10px;
  margin: 0 4px 0 4px;
  background-color: ${COLOR.benefitTextGray};
  vertical-align: -1px;
`;

export default function Footer() {
  // 플러스친구 친구추가 버튼을 생성합니다. 플러스친구 홈 URL에 명시된 id로 설정합니다.
  const handleKakaoChannerAdd = useCallback(() => {
    const kakao = window.Kakao;

    if (!kakao) {
      return;
    }

    try {
      if (!kakao.isInitialized()) {
        kakao.init(KAKAO_SHARE_KEY);
      }

      kakao.Channel.addChannel({
        channelPublicId: '_xcSDxjxl',
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Container>
      <FooterWrap>
        <CompanyMenu menuList={CompanyListMobile} />
        <SnsMenu menuList={SnsList} />
        <CustomerMenu onClickAddChanner={handleKakaoChannerAdd} />
        <Information>
          주식회사 컬리
          <Line />
          대표자 : 김슬아
          <br />
          사업자등록번호 : 261-81-23567
          <Link
            href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=2618123567&amp;apv_perm_no="
            target="_blank"
            rel="noreferrer"
          >
            사업자정보 확인
          </Link>
          <br />
          통신판매업 : 제 2018-서울강남-01646 호
          <br />
          주소 : 서울특별시 강남구 테헤란로 133, 18층(역삼동)
        </Information>
        <Contact>
          채용문의 :<Link href="mailto:recruit@kurlycorp.com">recruit@kurlycorp.com</Link>
          <br />
          팩스 : 070-7500-6098
          <Line />
          이메일 :<Link href="mailto:help@kurlycorp.com">help@kurlycorp.com</Link>
          <br />
          대량주문 문의 :
          <Link href={BULK_ORDER_GOOGLE_FORM_LINK} target="_blank">
            대량주문 문의하기
          </Link>
        </Contact>
        <CertificateMenu menuList={CertificateList} />
        <IndemnificationMessage />
      </FooterWrap>
    </Container>
  );
}
