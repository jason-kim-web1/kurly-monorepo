import { useSelector } from 'react-redux';

import PersonalInformation from '../../shared/containers/PersonalInformation';
import Profile from './Profile';

import { AppState } from '../../../../shared/store';

interface Props {
  changeButtonState: (yearBirthValidation: boolean, genderValidation: boolean) => void;
}

export default function ProfileList({ changeButtonState }: Props) {
  const {
    myKurlyStyleInformation: { sites },
  } = useSelector(({ myKurlyStyle }: AppState) => myKurlyStyle);

  return (
    <>
      <PersonalInformation changeButtonState={changeButtonState} />
      {sites.map(({ id: profileId, displayNewIcon, name, hasProfile, summary, description, thumbnailImages }) => (
        <Profile
          key={profileId}
          profileId={profileId}
          displayNewIcon={displayNewIcon}
          name={name}
          hasProfile={hasProfile}
          summary={summary}
          description={description}
          thumbnailImages={thumbnailImages}
        />
      ))}
    </>
  );
}
