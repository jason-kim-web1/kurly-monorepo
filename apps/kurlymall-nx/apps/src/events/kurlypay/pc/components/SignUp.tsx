import EventImage from '../../shared/components/EventImage';
import { SIGN_UP_TEXT } from '../../shared/constants/alternativeText';
import SignUpButton from './SignUpButton';

export default function SignUp() {
  return (
    <>
      <EventImage imageName="img_signup" imageHeight={'523px'} altText={SIGN_UP_TEXT} isPC />
      <SignUpButton />
    </>
  );
}
