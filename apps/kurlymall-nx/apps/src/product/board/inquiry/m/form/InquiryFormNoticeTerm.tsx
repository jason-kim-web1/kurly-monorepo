import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';

const Container = styled.div`
  color: ${COLOR.kurlyGray600};
  font-size: 15px;
  padding: 24px;
  position: relative;
  .tit-inquiry {
    display: block;
    padding-bottom: 16px;
    font-size: 18px;
    line-height: 23px;
    color: ${COLOR.kurlyGray800};
  }

  .desc-inquiry {
    display: block;
    padding: 20px 0 16px;
    font-size: 16px;
    line-height: 21px;
    color: ${COLOR.kurlyGray800};
  }

  ul {
    position: relative;
    li {
      font-size: 15px;
      line-height: 20px;
      color: #666;
      padding-left: 12px;
      padding-bottom: 10px;
      &:before {
        overflow: hidden;
        position: absolute;
        width: 3px;
        height: 3px;
        border-radius: 50%;
        margin: 7px 8px 0 -11px;
        background: #666;
        vertical-align: top;
        content: '';
      }
      &:last-of-type {
        padding-bottom: 0;
      }
    }
  }

  .notice-inquiry {
    display: block;
    padding: 8px 0 0 12px;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    color: ${COLOR.invalidRed};
    &:before {
      display: inline-block;
      margin: 0 4px 0 -16px;
      content: '※';
    }
  }
`;

export default function InquiryFormNoticeTerm() {
  return (
    <Container>
      <strong className="tit-inquiry">상품 문의 작성 전 확인해주세요!</strong>
      <ul className="list-inquiry">
        <li>답변은 영업일 기준 2~3일 소요됩니다.</li>
        <li>해당 게시판의 성격과 다른 글은 사전동의 없이 담당 게시판으로 이동될 수 있습니다.</li>
        <li>배송관련, 주문(취소/교환/환불)관련 문의 및 요청사항은 마이컬리 내 1:1 문의에 남겨주세요.</li>
      </ul>
      <strong className="desc-inquiry">제품</strong>
      <ul className="list-inquiry">
        <li>
          입고일 : 품절 상품 입고 일이 확정된 경우, 섬네일에 기재되어 있습니다. (종 모양을 클릭하여, 재입고 알람
          설정가능)
        </li>
        <li>
          제품 상세정보 : 영양성분 및 함량, 용량, 보관 및 취급 방법 등 제품 정보는 상세 이미지 또는 상세정보에서
          확인가능합니다.
        </li>
      </ul>
      <strong className="desc-inquiry">주문취소</strong>
      <ul className="list-inquiry">
        <li>
          배송 단계별로 주문취소 방법이 상이합니다. <br />
          [입금확인] 단계 : [마이컬리 &gt; 주문내역 상세페이지]에서 직접 취소 가능
          <br />
          [입금확인] 이후 단계 : 고객센터로 문의
        </li>
        <li>생산이 시작된 [상품 준비중] 이후에는 취소가 제한되는 점 고객님의 양해 부탁드립니다.</li>
        <li>
          비회원은 모바일 App 또는 모바일 웹사이트에서 [마이컬리 &gt; 비회원 주문 조회 페이지]에서 취소가 가능합니다.
        </li>
        <li>일부 예약상품은 배송 3~4일 전에만 취소 가능합니다.</li>
      </ul>
      <strong className="notice-inquiry">
        주문상품의 부분 취소는 불가능합니다. 전체 주문 취소 후 재구매 해주세요.
      </strong>
      <strong className="desc-inquiry">배송</strong>
      <ul className="list-inquiry">
        <li>주문 완료 후 배송 방법(샛별배송/하루배송)은 변경이 불가능합니다.</li>
        <li>배송일 배송시간 지정은 불가능합니다. (예약배송 포함)</li>
        <li>
          비회원은 모바일 App 또는 모바일 웹사이트에서 [마이컬리 &gt; 비회원 주문 조회 페이지]에서 취소가 가능합니다.
        </li>
      </ul>
      <strong className="notice-inquiry">
        전화번호, 이메일, 주소, 계좌번호 등의 상세 개인정보가 문의 내용에 저장되지 않도록 주의해 주시기 바랍니다.
      </strong>
    </Container>
  );
}
