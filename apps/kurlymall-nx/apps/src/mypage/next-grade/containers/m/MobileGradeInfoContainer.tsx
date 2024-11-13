import GradeTopInfo from '../../components/m/GradeTopInfo';
import GradeList from '../../components/m/GradeList';
import BenefitMoreButton from '../../components/m/BenefitMoreButton';
import GradeNotice from '../../components/shared/GradeNotice';

export default function GradeInfoContainer() {
  return (
    <>
      <GradeTopInfo />
      <GradeList />
      <BenefitMoreButton />
      <GradeNotice />
    </>
  );
}
