import { useDispatch } from 'react-redux';

import Collapse from '../../../../shared/components/Collapse/Collapse';
import CollapseSummary from '../../../../shared/components/Collapse/CollapseSummary';
import PackagingMethod from '../components/PackagingMethod';
import { Divider } from '../../../../shared/components/Divider/Divider';

import useToggle from '../../shared/hooks/useToggle';

import { setValue } from '../../shared/reducers/checkout.slice';
import { useAppSelector } from '../../../../shared/store';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectPackingType } from '../../../../shared/amplitude/events';

const PackagingText = {
  PAPER: '종이 포장재',
  KURLY: '컬리 퍼플 박스',
  PERSONAL: '개인 보냉 박스',
};

export default function PackagingMethodContainer() {
  const { isOpen, toggle } = useToggle(true);

  const dispatch = useDispatch();

  const reusablePackage = useAppSelector(({ checkout }) => checkout.reusablePackage);
  const { defaultSelected, selected, available } = reusablePackage;

  const handleChange = ({ value }: { value: string }) => {
    amplitudeService.logEvent(
      new SelectPackingType({
        packingType: value,
        defaultPackingType: defaultSelected,
      }),
    );

    dispatch(
      setValue({
        reusablePackage: {
          ...reusablePackage,
          selected: value,
        },
      }),
    );
  };

  if (!selected) {
    return null;
  }

  return (
    <>
      <Collapse
        title="포장방법"
        summary={<CollapseSummary text={PackagingText[selected ?? 'PAPER']} />}
        opened={isOpen}
        onClick={toggle}
      >
        <PackagingMethod selectedValue={selected} available={available} onChange={handleChange} />
      </Collapse>
      <Divider />
    </>
  );
}
