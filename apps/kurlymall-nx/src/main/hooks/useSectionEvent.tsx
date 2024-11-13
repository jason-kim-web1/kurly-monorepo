import { MdChoicesOption } from '../interfaces/MainSection.interface';
import { amplitudeService } from '../../shared/amplitude';
import { SelectRecommendation } from '../../shared/amplitude/events';
import { ProductMainSelectData } from '../../shared/interfaces';
import { useAppSelector } from '../../shared/store';

export default function useSectionEvent(section: any, selectedOption?: MdChoicesOption) {
  const { sections } = useAppSelector(({ main }) => main);

  const onSelectTitle = () => {
    amplitudeService.logEvent(
      new SelectRecommendation({
        eventName: section.type,
        sectionType: 'title',
        sections,
        section,
      }),
    );
  };

  const onSelectImage = () => {
    amplitudeService.logEvent(
      new SelectRecommendation({
        eventName: section.type,
        sectionType: 'image',
        sections,
        section,
      }),
    );
  };

  const onSelectDescription = () => {
    amplitudeService.logEvent(
      new SelectRecommendation({
        eventName: section.type,
        sectionType: 'description',
        sections,
        section,
      }),
    );
  };

  const onSelectProduct = (selectProduct: ProductMainSelectData) => {
    amplitudeService.logEvent(
      new SelectRecommendation({
        eventName: section.type,
        sectionType: selectProduct.type,
        target: selectProduct.productNo,
        position: selectProduct.index,
        sections,
        section,
        selectedOption,
      }),
    );
  };

  const onSelectMore = () => {
    amplitudeService.logEvent(
      new SelectRecommendation({
        eventName: section.type,
        sectionType: 'more',
        sections,
        section,
        selectedOption,
      }),
    );
  };

  return {
    onSelectTitle,
    onSelectProduct,
    onSelectMore,
    onSelectImage,
    onSelectDescription,
  };
}
