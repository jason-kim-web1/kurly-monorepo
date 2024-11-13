import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import useCheckoutTerms from '../../../checkout/shared/hooks/useCheckoutTerms';
import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import ThirdPartyTermsViewModal from '../../../../shared/modals/ThirdPartyTermsViewModal';

const AgreeTerms = styled.div`
  padding: 18px 0;
  border-bottom: 1px solid ${COLOR.bg};
`;

const ViewMoreButton = styled.button`
  font-size: 13px;
  color: ${COLOR.kurlyGray450};
  text-decoration: underline;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  + div {
    padding-top: 11px;
  }
`;

const Subject = styled.span();

const Message = styled.p`
  padding: 14px 0 8px;
  font-size: 15px;
  line-height: 20px;
  color: ${COLOR.kurlyGray800};
  font-weight: 600;
`;

export default function CheckoutTerms({ subscribe }: { subscribe?: boolean }) {
  const { terms, targetTermsModal, personalInfo, isPickupOrder, isDynamicTerms, onClickTerms, isOpen, close } =
    useCheckoutTerms();

  return (
    <>
      <AgreeTerms>
        {terms?.map(({ code, subject, url, key }) => (
          <Inner key={subject}>
            <Subject>{subject}</Subject>
            <ViewMoreButton onClick={() => onClickTerms(code, url, key)}>보기</ViewMoreButton>
          </Inner>
        ))}
        {isDynamicTerms ? (
          <ThirdPartyTermsViewModal
            open={isOpen}
            onClose={close}
            personalInfo={personalInfo}
            isPickupOrder={isPickupOrder}
          />
        ) : (
          <TermsViewModal open={isOpen} params={targetTermsModal} onClose={close} />
        )}
      </AgreeTerms>
      <Message>위 내용을 확인 하였으며 {subscribe ? '자동결제에 동의 ' : '결제에 동의'}합니다.</Message>
    </>
  );
}
