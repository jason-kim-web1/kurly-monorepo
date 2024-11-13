import styled from '@emotion/styled';

import COLOR from '../../../../../shared/constant/colorset';
import { DotGray } from '../../../../../shared/images';

const Wrapper = styled.div`
  margin-top: 20px;
  padding: 15px 16px;
  color: ${COLOR.kurlyGray700};
  background-color: ${COLOR.kurlyGray100};
  border-radius: 6px;
`;

const Title = styled.p`
  font-size: 13px;
  font-weight: 500;
`;

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 14px;
  font-size: 12px;
`;

const List = styled.li`
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  line-height: 18px;

  ~ li {
    margin-top: 4px;
  }

  img {
    margin: 8px 8px 0 0;
  }
`;

const TERMS = [
  '개인통관고유부호 등록 및 저장에 동의하면, 다음 해외상품 주문 시 등록 된 개인통관고유부호를 주문서에 자동으로 입력합니다.',
  '주문완료 후 개인통관고유부호는 수정 할 수 없으므로, 올바르게 입력 되었는지 꼭 확인 바랍니다.',
  '해외배송 상품의 통관이 고객님의 사유(개인통관고유부호 오류 및 관세미납, 자가사용사유서 미제출 등)로 지연되거나, 이로 인한 물품 멸실이 발생하는 경우 고객님의 책임을 부담하며, 관련 비용(제품 가격 및 배송비용 등)을 부담하실 수 있습니다.',
  '저장된 개인통관고유부호 삭제를 원할 경우, 컬리 고객센터(1644-1107)로 문의 바랍니다.',
];

const PersonalCustomsCodeTerms = () => {
  return (
    <Wrapper>
      <Title>꼭 확인해주세요!</Title>
      <Content>
        {TERMS.map((term, index) => (
          <List key={`term-${index}`}>
            <img src={DotGray} alt="dot-gray" />
            <span>{term}</span>
          </List>
        ))}
      </Content>
    </Wrapper>
  );
};

export default PersonalCustomsCodeTerms;
