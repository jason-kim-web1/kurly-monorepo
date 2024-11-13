import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { Swiper } from 'swiper/types';

import type { MainMdChoicesSection } from '../../../interfaces/MainSection.interface';

import SectionTitle from '../shared/SectionTitle';
import MdOptionListContainer from './MdOptionListContainer';
import { selectMdChoiceOption } from '../../../slice';
import ProductListSwiperContainer from './ProductListSwiperContainer';
import SectionContents from '../shared/SectionContents';
import ShowAllProductsButton from './ShowAllProductsButton';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectMdChoicesMenu } from '../../../../shared/amplitude/events';
import useSectionEvent from '../../../hooks/useSectionEvent';
import { createMainSkeleton } from '../shared/skeleton/CreateMainSkeleton';

interface Props {
  section: MainMdChoicesSection;
  measure(): void;
}

export default function MdChoicesContainer({ section, measure }: Props) {
  const { id, key, payload, type } = section;

  const [swiper, setSwiper] = useState<Swiper>();
  const [selectEvents, setSelectEvents] = useState<number[]>([]);

  const dispatch = useDispatch();

  const selectedOption = payload?.options.find(({ selected }) => selected);
  const selectedIndex = payload?.options.findIndex(({ code }) => code === selectedOption?.code) ?? 0;
  const { onSelectProduct, onSelectMore } = useSectionEvent(section, selectedOption);

  useEffect(() => {
    if (!swiper?.slides) {
      return;
    }
    swiper.slideTo(selectedIndex);

    // swiper?.slides 체크함
    if (measure) {
      measure();
    }
  }, [swiper, selectedIndex, measure]);

  const loadingLayer = createMainSkeleton(type);

  if (!payload) {
    return <SectionContents section={section} loadingLayer={loadingLayer} />;
  }

  const { title, subtitle, options } = payload;

  const changeOption = (code: string) => {
    dispatch(selectMdChoiceOption(key, id, code));

    // 마켓/뷰티 변경 및 최초에 페이지 로딩시 swiper.slideTo(selectedIndex); 이벤트로 인해 발생되는 이벤트 방어로직
    setSelectEvents([...selectEvents, id]);
    const isExistProduct = payload.options.some((it) => it.products.length > 0);

    if (!isExistProduct || selectEvents.length <= 1) {
      return;
    }

    amplitudeService.logEvent(
      new SelectMdChoicesMenu({
        id,
        code,
        selectionType: 'click',
        selectionPayload: section.payload,
      }),
    );
  };

  return (
    <SectionContents section={section} loadingLayer={loadingLayer}>
      <SectionTitle title={title} subtitle={subtitle} />
      <MdOptionListContainer options={options} selectedOption={selectedOption} changeOption={changeOption} />
      <ProductListSwiperContainer
        setSwiper={setSwiper}
        options={options}
        selectedIndex={selectedIndex}
        changeOption={changeOption}
        selectProduct={onSelectProduct}
      />
      {selectedOption && (
        <ShowAllProductsButton
          name={`${selectedOption.name} 전체보기`}
          href={selectedOption.link}
          selectMore={onSelectMore}
        />
      )}
    </SectionContents>
  );
}
