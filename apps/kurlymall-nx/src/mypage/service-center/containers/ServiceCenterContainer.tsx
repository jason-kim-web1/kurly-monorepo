import styled from '@emotion/styled';
import { css } from '@emotion/react';

import COLOR from '../../../../src/shared/constant/colorset';
import KakaoInquiryButton from '../../../../src/shared/components/Button/KakaoInquiryButton';
import PersonalInquiryButton from '../../../../src/shared/components/Button/PersonalInquiryButton';
import InquiryInfo from '../components/InquiryInfo';
import { SelectMyKurlyServiceCenterChannel } from '../../../shared/amplitude/events/mypage';
import TextDivider from '../../../shared/icons/TextDivider';

const Container = styled.div``;

const ContentBox = styled.div`
  padding: 0 20px 20px;
  border-top: 8px solid ${COLOR.bg};
  &:first-of-type {
    border-top: 0 none;
  }
`;

const Title = styled.h2`
  padding: 20px 0 10px;
  font-weight: 600;
  font-size: 16px;
`;

const TextSplit = styled(TextDivider)`
  margin: 0 6px;
`;

const styles = {
  inquiryButton: css`
    margin: 16px 0 8px;
  `,
  inquiryText: css`
    padding: 8px 0 !important;
  `,
};

export default function ServiceCenterContainer() {
  return (
    <Container>
      <ContentBox>
        <Title>고객행복센터 안내</Title>
        <InquiryInfo
          title="전화 문의"
          call="1644-1107"
          text={
            <>
              월~토요일
              <TextSplit />
              오전 7시 - 오후 6시
            </>
          }
          amplitude={new SelectMyKurlyServiceCenterChannel({ selectionType: 'call' })}
        />
      </ContentBox>
      <ContentBox>
        <InquiryInfo
          title="카카오톡 문의"
          text={
            <>
              월~토요일
              <TextSplit />
              오전 7시 - 오후 6시
            </>
          }
          textSecond={
            <>
              일/공휴일
              <TextSplit />
              오전 7시 - 오후 1시
            </>
          }
        />
        <KakaoInquiryButton
          amplitude={new SelectMyKurlyServiceCenterChannel({ selectionType: 'kakaotalk' })}
          css={styles.inquiryButton}
        />
        <InquiryInfo
          title="1:1문의"
          text={
            <>
              365일
              <TextSplit />
              고객센터 운영시간에 순차적으로 답변드리겠습니다.
            </>
          }
          css={styles.inquiryText}
        />
        <PersonalInquiryButton
          amplitude={new SelectMyKurlyServiceCenterChannel({ selectionType: 'kurly_one_by_one' })}
        />
      </ContentBox>
    </Container>
  );
}
