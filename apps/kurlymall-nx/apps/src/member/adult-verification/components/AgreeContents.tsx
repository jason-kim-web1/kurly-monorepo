import styled from '@emotion/styled';

import { isMobileDevice } from '../../../../util/window/getDevice';

const WrapAgree = styled.div`
  padding: ${isMobileDevice ? '0 20px 15px 36px' : '0 0 18px 36px'};
  text-align: left;
`;

const AgreeList = styled.dl`
  padding-top: 12px;
  &:first-of-type {
    padding-top: 0;
    margin-top: ${isMobileDevice ? 0 : '-2px'};
  }
`;
const AgreeListTitle = styled.dt`
  display: block;
  font-size: 13px;
  line-height: 19px;
`;
const AgreeListDesc = styled.dd`
  padding-top: ${isMobileDevice ? '3px' : '3px'};
  font-size: 13px;
  color: #808080;
  line-height: 16px;
`;
const AgreeNotice = styled.p`
  padding-top: ${isMobileDevice ? '11px' : '10px'};
  font-size: 12px;
  color: #999;
  line-height: 16px;
`;

export default function AgreeContents() {
  return (
    <WrapAgree>
      <AgreeList>
        <AgreeListTitle>수집∙이용 목적</AgreeListTitle>
        <AgreeListDesc>이용자 식별 및 연령확인, 성인인증 이력관리</AgreeListDesc>
      </AgreeList>
      <AgreeList>
        <AgreeListTitle>개인정보 항목</AgreeListTitle>
        <AgreeListDesc>이름, 성인 여부</AgreeListDesc>
      </AgreeList>
      <AgreeList>
        <AgreeListTitle>보유 및 이용기간</AgreeListTitle>
        <AgreeListDesc>회원 탈퇴 시 또는 성인인증 후 1년(단, 이름 2년)</AgreeListDesc>
      </AgreeList>
      <AgreeNotice>
        청소년 보호법 준수를 위해 연 1회 본인(실명) 확인이 필요합니다. 동의를 거부하실 수 있으며 거부 시 성인인증이
        필요한 서비스 이용이 제한됩니다.
      </AgreeNotice>
    </WrapAgree>
  );
}
