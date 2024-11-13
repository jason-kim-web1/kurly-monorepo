import styled from '@emotion/styled';

import { isPC } from '../../../../util/window/getDevice';
import Checkbox from '../../../shared/components/Input/Checkbox';
import COLOR from '../../../shared/constant/colorset';
import TermsViewModal from '../../../shared/modals/TermsViewModal';
import useKurlyMembersTerms from '../hooks/useKurlyMembersTerms';

const Wrapper = styled.div`
  padding: ${isPC ? '0 30px' : '0 20px'};
`;

const TermsTitle = styled.div`
  line-height: 20px;
  font-size: 16px;
  font-weight: 600;
  padding: 18px 0;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FlatCheckbox = styled(Checkbox)`
  padding: 0;
  min-height: ${isPC ? '38px' : '37px'};
`;

const AllCheckbox = styled(Checkbox)`
  padding: 0;
  min-height: 48px;
`;

const FlatCheckboxText = styled.span`
  font-size: 14px;
  font-weight: 400;
`;

const TermsViewButton = styled.button`
  border: none;
  color: ${COLOR.kurlyGray450};
  font-size: 13px;
  font-weight: 400;
  text-decoration: underline;
`;

export default function KurlyMembersTerms() {
  const {
    paymentTermsList,
    termsState,
    allCheckState,
    modalIsOpen,
    modalClose,
    targetTermsModal,
    handleAllCheckbox,
    handleCheckbox,
    handleTermsView,
  } = useKurlyMembersTerms();

  return (
    <Wrapper>
      <TermsTitle>컬리멤버스 가입 동의</TermsTitle>
      <CheckboxWrapper>
        <AllCheckbox label="약관 전체 동의" checked={allCheckState} onChange={handleAllCheckbox} />
      </CheckboxWrapper>
      {paymentTermsList.map(({ id, label, required, link }) => (
        <CheckboxWrapper key={id}>
          <FlatCheckbox
            label={
              <FlatCheckboxText>
                {required ? '(필수)' : '(선택)'} {label}
              </FlatCheckboxText>
            }
            required={required}
            checked={termsState[id]}
            onChange={() => handleCheckbox(id)}
            flatTheme
          />
          {link && <TermsViewButton onClick={() => handleTermsView({ url: link, key: id })}>보기</TermsViewButton>}
        </CheckboxWrapper>
      ))}
      <TermsViewModal open={modalIsOpen} params={targetTermsModal} onClose={modalClose} />
    </Wrapper>
  );
}
