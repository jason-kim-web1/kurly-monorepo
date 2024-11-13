import { useState, ChangeEvent } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../../shared/store';

import { changeSignupForm } from '../../reducers/slice';

import AdditionalBox from '../components/AdditionalBox';

export default function AdditionalInputContainer() {
  const [selected, setSelected] = useState('RECOMMENDER_ID');

  const dispatch = useDispatch();

  const { recommender, eventName } = useSelector(({ social }: AppState) => social.signup.form);

  const handleChangeRadio = (params: { name: string; value: string }) => {
    setSelected(params.value);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSignupForm(event.target));
  };

  return (
    <AdditionalBox
      selectedValue={selected}
      recommender={recommender}
      eventName={eventName}
      onChangeInput={handleChange}
      onChangeRadio={handleChangeRadio}
    />
  );
}
