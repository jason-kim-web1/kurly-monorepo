import { useDispatch } from 'react-redux';

import { useEffect } from 'react';

import ListLayout from '../../shared/components/ListLayout';
import StepLayout from '../../shared/components/StepLayout';

import { loadProfile } from '../../slice';
import { amplitudeService, ScreenName } from '../../../../shared/amplitude';

interface Props {
  profileId: string;
  hasProfile: boolean | null;
}
export default function Profile({ profileId, hasProfile }: Props) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasProfile) {
      void amplitudeService.setScreenName(ScreenName.PROFILE_SETTING_EDIT);
    } else {
      void amplitudeService.setScreenName(ScreenName.PROFILE_SETTING);
    }
    if (profileId) {
      dispatch(loadProfile(profileId));
    }
  }, [dispatch, hasProfile, profileId]);
  return <>{hasProfile ? <ListLayout profileId={profileId} /> : <StepLayout profileId={profileId} />}</>;
}
