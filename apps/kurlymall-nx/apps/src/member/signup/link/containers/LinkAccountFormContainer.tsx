import { useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { AppState } from '../../../../shared/store';

import LinkAccountForm from '../components/LinkAccountForm';

import { changeLinkForm, submitLinkForm } from '../../reducers/slice';

export default function LinkAccountFormContainer() {
  const dispatch = useDispatch();

  const { form, members } = useSelector(({ social }: AppState) => social.link);

  const handleChange = useCallback(
    (params: { name: string; value: string }) => {
      dispatch(changeLinkForm(params));
    },
    [dispatch],
  );

  const handleSubmit = () => {
    dispatch(submitLinkForm({ provider: 'kakao', form }));
  };

  return <LinkAccountForm form={form} members={members} onChange={handleChange} onSubmit={handleSubmit} />;
}
