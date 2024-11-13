import styled from '@emotion/styled';

import { css } from '@emotion/react';

import ColorSet from '../../../../shared/constant/colorset';
import COLOR from '../../../../shared/constant/colorset';
import { BASE_BREAK_POINT } from '../../constants';
import Checkbox from '../../../../shared/components/Input/Checkbox';

const Section = styled.section`
  padding: 24px 30px 0;
  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: calc(71px + constant(safe-area-inset-bottom));
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: calc(71px + env(safe-area-inset-bottom));
  }
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding: 24px 12px 0;
  }
`;

const AgreementCheckBoxWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  align-items: stretch;
  padding-bottom: 12px;
  label {
    font-size: 15px;
  }
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    padding-bottom: 21px;
    label {
      letter-spacing: -0.5px;
    }
  }
`;

const AgreementTermsButton = styled.button`
  word-break: keep-all;
  padding: 10px;
  margin: 0 -10px -5px 0;
`;

const AgreementTermsButtonText = styled.span`
  color: ${ColorSet.kurlyGray450};
  font-weight: 400;
  font-size: 14px;
  text-decoration-line: underline;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    letter-spacing: -0.5px;
  }
`;

const Title = styled.h2`
  margin-bottom: 3px;
  line-height: 14px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    margin-bottom: 0;
  }
`;

const TitleText = styled.span`
  font-weight: 600;
  font-size: 16px;
  @media only screen and (min-width: ${BASE_BREAK_POINT}px) {
    font-weight: 500;
    letter-spacing: -0.5px;
  }
`;

const styles = css`
  cursor: pointer;
  .requiredText {
    color: ${COLOR.beautyPurple};
  }
`;

interface Props {
  agree: boolean;
  onChange(status: boolean): void;
  onClickShowTerms(): void;
}

const AgreementSection = ({ agree, onChange, onClickShowTerms }: Props) => {
  const toggleAgreeStatus = () => onChange(!agree);
  return (
    <Section>
      <Title>
        <TitleText>제휴 멤버십 연동 약관 동의</TitleText>
      </Title>
      <AgreementCheckBoxWrap>
        <Checkbox
          iconColor={ColorSet.kurlyGray800}
          label={
            <>
              <span className="requiredText">(필수)</span> 개인정보 제3자 제공 동의
            </>
          }
          checked={agree}
          onChange={toggleAgreeStatus}
          styles={styles}
        />
        <AgreementTermsButton type="button" onClick={onClickShowTerms}>
          <AgreementTermsButtonText>보기</AgreementTermsButtonText>
        </AgreementTermsButton>
      </AgreementCheckBoxWrap>
    </Section>
  );
};

export default AgreementSection;
