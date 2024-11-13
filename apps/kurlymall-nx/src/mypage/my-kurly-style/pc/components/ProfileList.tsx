import { useCallback, useState } from 'react';

import { useSelector } from 'react-redux';

import Profile from './Profile';
import { AppState } from '../../../../shared/store';

export default function ProfileList() {
  const [toggledId, setToggledId] = useState<string | null>(null);

  const toggleProfile = useCallback(
    (profileId: string) => {
      if (toggledId === profileId) {
        setToggledId(null);
      } else {
        setToggledId(profileId);
      }
    },
    [toggledId],
  );

  const {
    myKurlyStyleInformation: { sites },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  return (
    <>
      {sites.map(({ id: profileId, displayNewIcon, hasProfile, summary }) => (
        <Profile
          key={profileId}
          profileId={profileId}
          opened={profileId === toggledId}
          toggleProfile={toggleProfile}
          displayNewIcon={displayNewIcon}
          hasProfile={hasProfile}
          summary={summary}
        />
      ))}
    </>
  );
}
