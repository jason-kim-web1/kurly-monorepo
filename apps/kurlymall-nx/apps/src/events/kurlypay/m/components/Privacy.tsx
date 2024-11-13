import EventImage from '../../shared/components/EventImage';
import { PRIVACY_TEXT } from '../../shared/constants/alternativeText';

export default function Privacy() {
  return <EventImage imageName="img_privacy" imageHeight={'170vw'} altText={PRIVACY_TEXT} />;
}
