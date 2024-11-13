import styled from '@emotion/styled';
import { css } from '@emotion/react';

import Checkbox from '../../shared/components/Checkbox';
import Button from '../../../../shared/components/Button/Button';
import COLOR from '../../../../shared/constant/colorset';
import { Agreed, CONFIRM_BUTTON_ARRAY, LOVERS_CAUTION_TEXT } from '../constants';
import { isPC } from '../../../../../util/window/getDevice';
import CautionText from './CautionText';

const TermWrapper = styled.div`
  ${isPC
    ? css`
        max-width: 50vw;
        margin: auto;
      `
    : css`
        padding-top: 32px;
      `}
`;

const TermsContent = styled.div`
  ${isPC
    ? ''
    : css`
        padding: 0 8px 24px;
      `}
`;

const Title = styled.div`
  font-size: ${isPC ? 20 : 18}px;
  font-weight: ${isPC ? 500 : 600};
  text-align: left;
  color: ${COLOR.kurlyGray800};
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;

  & > button {
    padding: ${isPC ? '0 0 11px 0' : '11px 0 12px'};
    margin-left: auto;
  }
`;

const TermsViewButton = styled.button`
  border: none;
  color: ${COLOR.kurlyGray400};
  font-size: 13px;
  font-weight: 400;
  text-decoration: underline;
`;

const CheckList = styled.div<{ itemCount: number }>`
  padding-top: ${({ itemCount }) => (!isPC || itemCount > 1 ? 10 : 24)}px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  padding: ${isPC ? '30px 0 0 0' : '8px 0'};
`;

type TermsListProps = {
  openTerms: (key: Agreed, url: string) => () => void;
  termsArray: { id: Agreed; label: string; total: boolean; required: boolean; link: string; circleCheckbox: boolean }[];
  onCancel?: () => void;
  onGoToPaySubscription: () => void;
};

export default function TermsList({ termsArray, openTerms, onCancel, onGoToPaySubscription }: TermsListProps) {
  return (
    <TermWrapper>
      <TermsContent>
        <Title>컬리멤버스 가입 동의</Title>
        <CheckList itemCount={termsArray.length}>
          {termsArray.map(({ id, label, total, required, link, circleCheckbox }) => (
            <FlexDiv key={id}>
              <Checkbox
                id={id}
                inputId={id}
                activeId={`${id}CheckboxActive`}
                inactiveId={`${id}CheckboxInactive`}
                label={`${!total ? (required ? '(필수)' : '(선택)') : ''} ${label}`}
                defaultChecked={false}
                isTotal={total}
                circleCheckbox={circleCheckbox}
              />
              {link && <TermsViewButton onClick={openTerms(id, link)}>보기</TermsViewButton>}
            </FlexDiv>
          ))}
        </CheckList>
        <CautionText text={LOVERS_CAUTION_TEXT} paddingTop={isPC ? 5 : 10} />
      </TermsContent>
      <ButtonGroup>
        {onCancel && <Button text="취소" theme="tertiary" onClick={onCancel} radius={6} />}
        {CONFIRM_BUTTON_ARRAY.map(({ id, active, loading }) => (
          <Button
            key={id}
            id={id}
            text="확인 후 계속"
            onClick={onGoToPaySubscription}
            radius={6}
            disabled={!active}
            isSubmitLoading={loading}
          />
        ))}
      </ButtonGroup>
    </TermWrapper>
  );
}
