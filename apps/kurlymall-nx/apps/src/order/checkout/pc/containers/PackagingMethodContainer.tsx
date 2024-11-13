import { useDispatch } from 'react-redux';

import { setValue } from '../../shared/reducers/checkout.slice';

import { Title } from '../components/Title';
import PackagingMethod from '../components/PackagingMethod';

import { useAppSelector } from '../../../../shared/store';

import { amplitudeService } from '../../../../shared/amplitude';
import { SelectPackingType } from '../../../../shared/amplitude/events';

export default function PackagingMethodContainer() {
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
      <Title title="포장방법" />
      <PackagingMethod selectedValue={selected} available={available} onChange={handleChange} />
    </>
  );
}
