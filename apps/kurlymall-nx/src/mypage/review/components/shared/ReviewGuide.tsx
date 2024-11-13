import { reviewGuideContents } from '../../constants/ReviewGuideContents';
import NextImage from '../../../../shared/components/NextImage';
import {
  ReviewGuideWrapper,
  ReviewGuideTitle,
  ReviewGuideDescription,
  ReviewImageGuideWrapper,
  ReviewImageGuideItem,
} from './styled-components';
import { isPC } from '../../../../../util/window/getDevice';

export default function ReviewGuide() {
  const { title, description, imageGuides } = reviewGuideContents;

  return (
    <ReviewGuideWrapper isPC={isPC}>
      <ReviewGuideTitle isPC={isPC}>{title}</ReviewGuideTitle>
      <ReviewGuideDescription isPC={isPC}>{description}</ReviewGuideDescription>
      <ReviewImageGuideWrapper isPC={isPC}>
        {imageGuides.map(({ imageUrl, imageDescription }) => (
          <ReviewImageGuideItem key={imageUrl} isPC={isPC}>
            <NextImage src={imageUrl} alt={imageUrl} width={100} height={100} objectFit="cover" />
            <p>{imageDescription}</p>
          </ReviewImageGuideItem>
        ))}
      </ReviewImageGuideWrapper>
    </ReviewGuideWrapper>
  );
}
