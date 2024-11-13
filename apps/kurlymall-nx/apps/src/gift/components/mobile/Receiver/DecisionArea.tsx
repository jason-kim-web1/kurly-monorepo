import styled from '@emotion/styled';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';

import { AppState } from '../../../../shared/store';
import { updateTerms, updateTermsAgreements } from '../../../slice';

import { getTermsAgreements } from '../../../../order/checkout/shared/utils';

import { TermsType } from '../../../../shared/interfaces';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { TERMS_PATH, getPageUrl } from '../../../../shared/constant';

import Button from '../../../../shared/components/Button/Button';
import InformationList from '../../../../shared/components/InformationList/InformationList';
import Panel from '../../../../shared/components/Panel/Panel';
import TermsWrapper from './TermsWrapper';

const ButtonWrapper = styled.div`
  padding-top: 16px;
  button {
    span {
      font-weight: 600;
    }
    + button {
      margin-top: 10px;
    }
  }
`;

const AgreeArea = styled.div`
  > label {
    font-weight: 600;
  }
`;

const styles = {
  list: {
    paddingTop: '16px',
  },
};

interface Props {
  onApproved(): void;
  onRejected(): void;
}

export default function DecisionArea({ onApproved, onRejected }: Props) {
  const dispatch = useDispatch();
  const scrollArea = useRef<HTMLDivElement>(null);
  const { terms } = useSelector(({ gift }: AppState) => gift);

  const toggleAllTerms = (agreed: boolean) => {
    const list = terms.map((term) => ({
      ...term,
      agreed,
    }));

    dispatch(updateTerms(list));
    dispatch(updateTermsAgreements(getTermsAgreements(list)));
  };

  const toggleTerms = (agreed: boolean, termsCode: TermsType) => {
    const list = terms.map((term) => ({
      ...term,
      agreed: term.code === termsCode ? agreed : term.agreed,
    }));

    dispatch(updateTerms(list));
    dispatch(updateTermsAgreements(getTermsAgreements(list)));
  };

  return (
    <Panel>
      <AgreeArea ref={scrollArea}>
        <TermsWrapper
          terms={terms}
          isAllAgreed={!isEmpty(terms) && terms.every(({ agreed }) => agreed)}
          onChangeAgree={toggleTerms}
          onChangeAllAgree={toggleAllTerms}
        />
        <InformationList
          contents={[
            '5일 이내 배송지 입력을 하지 않으실 경우, 주문이 취소됩니다.',
            '선물 문의가 있을 경우, 고객센터에 남겨주시면 신속히 해결해드리겠습니다.',
            '도서산간 및 일부 지역은 배송이 어려울 수 있습니다.',
            '재고 상황에 따라 배송 일정이 상이할 수 있으니 [배송조회 하기] 를 통해 상세 일정 확인 부탁드립니다.',
            <>
              자세한 개인정보 처리 사항은 컬리{' '}
              {<MobileLink url={getPageUrl(TERMS_PATH.privacyPolicy)}>개인정보처리방침</MobileLink>}을 확인해 주시기
              바랍니다.
            </>,
          ]}
          css={styles.list}
        />
        <ButtonWrapper>
          <Button text="선물 수락하기" height={48} onClick={onApproved} />
          <Button text="선물 거절하기" height={48} theme="tertiary" onClick={onRejected} />
        </ButtonWrapper>
      </AgreeArea>
    </Panel>
  );
}
