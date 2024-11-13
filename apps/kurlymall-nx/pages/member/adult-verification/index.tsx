import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import AdultVerificationContainer from '../../../src/member/adult-verification/AdultVerificationContainer';

export default function AdultVerificationPage() {
  return (
    <AuthContainer loginRequired>
      <AdultVerificationContainer />
    </AuthContainer>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
