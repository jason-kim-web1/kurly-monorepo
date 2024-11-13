import { useDispatch } from 'react-redux';

import type { MainMdChoicesSection } from '../../../interfaces/MainSection.interface';

import SectionHeader from '../shared/SectionHeader';
import ShowMoreButton from './ShowMoreButton';
import SectionContents from '../shared/SectionContents';
import MdOptionList from './MdOptionList';
import MdChoiceProductList from './MdChoiceProductList';
import { selectMdChoiceOption } from '../../../slice';
import { useAppSelector } from '../../../../shared/store';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectMdChoicesMenu } from '../../../../shared/amplitude/events';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeletonPC } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainMdChoicesSection;
}

export default function MdChoicesContainer({ section }: Props) {
  const site = useAppSelector(({ main }) => main.site);
  const { id, key, payload, type } = section;

  const dispatch = useDispatch();

  const { onSelectProduct, onSelectMore } = useSectionEvent(
    section,
    section?.payload?.options.find(({ selected }) => selected),
  );

  const changeOption = (code: string) => {
    dispatch(selectMdChoiceOption(key, id, code));

    amplitudeService.logEvent(
      new SelectMdChoicesMenu({
        id,
        code,
        selectionType: 'click',
        selectionPayload: section.payload,
      }),
    );
  };

  const loadingLayer = createMainSkeletonPC(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, options } = payload;

  const selectedOption = options.find(({ selected }) => selected);

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionHeader title={title} />
      <MdOptionList options={options} selectedOption={selectedOption} onClickOption={changeOption} />
      <MdChoiceProductList
        products={selectedOption?.products ?? []}
        selectProduct={onSelectProduct}
        selectMore={onSelectMore}
      />
      <ShowMoreButton selectedOption={selectedOption} site={site} selectMore={onSelectMore} />
    </SectionContents>
  );
}
