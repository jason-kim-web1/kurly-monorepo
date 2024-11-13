import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import { css } from '@emotion/react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { ArrowPurple } from '../../../../shared/images';
import { isPC } from '../../../../../util/window/getDevice';
import useToggle from '../../../../order/checkout/shared/hooks/useToggle';
import Checkbox from '../../../../shared/components/Input/Checkbox';
import TermsViewModal from '../../../../shared/modals/TermsViewModal';
import { BULK_ORDER_AGREE } from '../../../../order/shared/shared/constants/terms';
import { setTermCheckState } from '../../reducers/bulk-order.slice';
import { useAppSelector } from '../../../../shared/store';

const Container = styled.div`
  margin-top: 10px;
  ${isPC && 'margin-bottom: 40px'};
`;

const AgreeTitle = styled.h1`
  ${isPC &&
  `
    padding-bottom: 18px;
    border-bottom: 2px solid ${COLOR.kurlyGray800}
  `};
  font-weight: 500;
  font-size: ${isPC ? '20px' : '14px'};
  letter-spacing: -0.3px;
`;

const IconRequired = styled.span`
  color: ${COLOR.loversTag};
`;

const AgreeContent = styled.div`
  display: flex;
  align-items: center;
  padding: 18px 0;
  ${isPC ? `border-bottom: 1px solid ${COLOR.lightGray}` : 'justify-content: space-between'}
`;

const checkboxStyle = css`
  padding: 0;
  font-size: 14px;
`;

const TextRequired = styled.span`
  color: ${COLOR.kurlyGray450};
`;

const ViewButton = styled.a`
  margin-left: 5px;
  padding-right: 10px;
  background: url(${ArrowPurple}) no-repeat 100% 50%;
  color: ${COLOR.kurlyPurple};
  cursor: pointer;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function BulkOrderAgreeForm() {
  const dispatch = useDispatch();

  const { toggle, isOpen } = useToggle();

  const {
    form: { agreePrivacyUse },
  } = useAppSelector(({ bulkOrder }) => bulkOrder);

  const onChange = useCallback(
    (agree) => {
      dispatch(setTermCheckState(agree));
    },
    [dispatch],
  );

  return (
    <Container>
      <AgreeTitle>
        개인정보 수집·이용 동의<IconRequired>*</IconRequired>
      </AgreeTitle>
      <AgreeContent>
        <CheckboxWrapper>
          <Checkbox
            label="개인정보 수집·이용 동의"
            name="agreePrivacyUse"
            checked={agreePrivacyUse}
            onChange={() => onChange(!agreePrivacyUse)}
            css={checkboxStyle}
          />
          <TextRequired>(필수)</TextRequired>
        </CheckboxWrapper>
        <ViewButton onClick={toggle}>보기</ViewButton>
        <TermsViewModal open={isOpen} onClose={toggle} params={BULK_ORDER_AGREE} />
      </AgreeContent>
    </Container>
  );
}
