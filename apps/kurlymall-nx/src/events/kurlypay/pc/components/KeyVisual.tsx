import EventImage from '../../shared/components/EventImage';
import { KEY_VISUAL_TEXT } from '../../shared/constants/alternativeText';
import SignUpButton from './SignUpButton';

export default function KeyVisual() {
  return (
    <>
      <EventImage imageName="img_keyVisual" imageHeight={'587px'} altText={KEY_VISUAL_TEXT} isPC />
      <SignUpButton keyVisual />
    </>
  );
}
