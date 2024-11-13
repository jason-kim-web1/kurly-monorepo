import styled from '@emotion/styled';

import { useWebview } from '../../../shared/hooks';

import COLOR from '../../../shared/constant/colorset';
import { PurpleArrowRight } from '../../../shared/images';

const UserServiceContainer = styled.div`
  text-align: center;
`;

const Description = styled.p`
  line-height: 16px;
  margin: 13px 0 2px 0;
  color: ${COLOR.kurlyGray500};
  font-size: 12px;
  font-weight: 400;
`;

const ServiceLink = styled.span`
  padding-right: 11px;
  line-height: 18px;
  font-size: 12px;
  background: url(${PurpleArrowRight}) no-repeat 100% 1px;
  background-size: 8px 12px;
  color: ${COLOR.kurlyPurple};
`;

export default function UserServiceView() {
  const webview = useWebview();
  return (
    <UserServiceContainer>
      <div>
        <Description>보다 상세한 이용안내가 필요하신가요?</Description>
        <ServiceLink>
          <a href={'/mypage/faq'}>자주하는 질문</a>
        </ServiceLink>
      </div>

      <div>
        <Description>추가적인 문의 사항이 있으신가요?</Description>
        <ServiceLink>
          <a href={webview ? 'kurly://compose/inquiry' : '/mypage/inquiry/form'}>1:1 문의</a>
        </ServiceLink>
      </div>
    </UserServiceContainer>
  );
}
