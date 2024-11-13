import { memo } from 'react';
import styled from '@emotion/styled';

import useCheckoutTerms from '../../shared/hooks/useCheckoutTerms';

import COLOR from '../../../../shared/constant/colorset';
import { Title } from '../components/Title';
import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import ThirdPartyTermsViewModal from '../../../../shared/modals/ThirdPartyTermsViewModal';

const AgreeTerms = styled.div`
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid ${COLOR.bg};
`;

const Message = styled.strong`
  display: block;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: ${COLOR.kurlyGray800};
`;

const IndemnificationMessage = styled.p`
  padding-left: 16px;
  font-size: 12px;
  line-height: 16px;
  color: ${COLOR.kurlyGray600};
  &:before {
    display: inline-block;
    width: 16px;
    margin-left: -16px;
    content: '※';
  }

  + p {
    padding-top: 4px;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  + div {
    padding-top: 12px;
  }
  + strong {
    padding-top: 20px;
  }
`;

const Subject = styled.span();

const ViewMoreButton = styled.button`
  color: ${COLOR.kurlyGray450};
  text-decoration: underline;
`;

function TermsContainer() {
  const { terms, targetTermsModal, isDynamicTerms, isPickupOrder, personalInfo, onClickTerms, isOpen, close } =
    useCheckoutTerms();

  return (
    <>
      <Title title="개인정보 및 결제 동의" />
      <AgreeTerms>
        {terms?.map(({ code, subject, url, key }) => (
          <Inner key={subject}>
            <Subject>{subject}</Subject>
            <ViewMoreButton onClick={() => onClickTerms(code, url, key)}>보기</ViewMoreButton>
          </Inner>
        ))}
        <Message>위 내용을 확인 하였으며 결제에 동의합니다.</Message>
        {isDynamicTerms ? (
          <ThirdPartyTermsViewModal
            personalInfo={personalInfo}
            open={isOpen}
            onClose={close}
            isPickupOrder={isPickupOrder}
          />
        ) : (
          <TermsViewModal open={isOpen} params={targetTermsModal} onClose={close} />
        )}
      </AgreeTerms>
      <IndemnificationMessage>
        주문완료 상태일 경우에만 주문 취소가 가능하며, 상품 미배송 시 결제하신 수단으로 환불됩니다.
      </IndemnificationMessage>
      <IndemnificationMessage>
        컬리 내 개별 판매자가 등록한 오픈마켓 상품의 경우 컬리는 통신판매중개자로서 주문, 품질, 교환/환불 등 의무와
        책임을 부담하지 않습니다.
      </IndemnificationMessage>
    </>
  );
}

export default memo(TermsContainer);
