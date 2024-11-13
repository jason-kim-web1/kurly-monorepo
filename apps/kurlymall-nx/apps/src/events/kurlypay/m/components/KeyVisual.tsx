import EventImage from '../../shared/components/EventImage';
import { KEY_VISUAL_TEXT } from '../../shared/constants/alternativeText';
import SignUpButton from './SignUpButton';

export default function KeyVisual() {
  return (
    <>
      <EventImage imageName="img_keyVisual" imageHeight={'168vw'} altText={KEY_VISUAL_TEXT} />
      <SignUpButton bottom={11} />
    </>
  );
}
