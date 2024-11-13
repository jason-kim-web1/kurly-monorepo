import PersonalInformation from '../../shared/containers/PersonalInformation';
import ProfileList from '../components/ProfileList';
import SetProfile from '../../shared/components/SetProfile';

interface Props {
  changeButtonState: (yearBirthValidation: boolean, genderValidation: boolean) => void;
}

export default function Profile({ changeButtonState }: Props) {
  return (
    <>
      <PersonalInformation changeButtonState={changeButtonState} />
      <ProfileList />
      <SetProfile />
    </>
  );
}
