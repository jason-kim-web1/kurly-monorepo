import styled from '@emotion/styled';

import KakaoInquiryButton from '../../../../../shared/components/Button/KakaoInquiryButton';
import PersonalInquiryButton from '../../../../../shared/components/Button/PersonalInquiryButton';
import { SelectMyKurlyPersonalInquiryChannel } from '../../../../../shared/amplitude/events/mypage';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  > button {
    width: 49%;
  }
`;

export default function PersonalInquiryListBottom() {
  return (
    <Container>
      <KakaoInquiryButton amplitude={new SelectMyKurlyPersonalInquiryChannel({ selectionType: 'kakaotalk' })} />
      <PersonalInquiryButton
        amplitude={new SelectMyKurlyPersonalInquiryChannel({ selectionType: 'kurly_one_by_one' })}
      />
    </Container>
  );
}
