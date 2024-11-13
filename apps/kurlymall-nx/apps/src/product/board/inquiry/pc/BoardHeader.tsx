import styled from '@emotion/styled';

import Link from 'next/link';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  padding-bottom: 40px;
  letter-spacing: -0.5px;
`;

const Title = styled.strong`
  display: block;
  padding-bottom: 16px;
  font-size: 24px;
  font-weight: 500;
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
`;

const DescriptionUl = styled.ul`
  line-height: 19px;
  font-weight: 400;
  color: ${COLOR.kurlyGray450};
`;

const DescriptionLi = styled.li`
  padding-left: 10px;

  :before {
    display: inline-block;
    width: 2px;
    height: 2px;
    margin: 11px 6px 0 -10px;
    background: ${COLOR.kurlyGray450};
    vertical-align: top;
    content: '';
  }
`;

const InquiryLink = styled.a`
  font-weight: bold;
  text-decoration: underline;
  margin-left: 3px;
`;

export default function BoardHeader() {
  return (
    <Container>
      <Title>상품 문의</Title>
      <DescriptionUl>
        <DescriptionLi>
          상품에 대한 문의를 남기는 공간입니다. 해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수
          있습니다.
        </DescriptionLi>
        <DescriptionLi>
          배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리 내
          <Link href="/mypage/inquiry/list" passHref>
            <InquiryLink>1:1 문의</InquiryLink>
          </Link>
          에 남겨주세요.
        </DescriptionLi>
      </DescriptionUl>
    </Container>
  );
}
