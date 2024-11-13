import styled from '@emotion/styled';

import EventImage from '../../shared/components/EventImage';
import { SIGN_UP_TEXT } from '../../shared/constants/alternativeText';
import SignUpButton from './SignUpButton';
import COLOR from '../../../../shared/constant/colorset';

const Wrapper = styled.div`
  background: ${COLOR.gradeToolTipBorder};
  @supports (padding-bottom: constant(safe-area-inset-bottom)) {
    padding-bottom: constant(safe-area-inset-bottom);
  }
  @supports (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: env(safe-area-inset-bottom);
  }
`;

export default function SignUp() {
  return (
    <Wrapper>
      <EventImage imageName="img_signup" imageHeight={'167vw'} altText={SIGN_UP_TEXT} />
      <SignUpButton bottom={8.5} />
    </Wrapper>
  );
}
