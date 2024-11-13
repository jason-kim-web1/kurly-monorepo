import { useRouter } from 'next/router';

import { useEffect } from 'react';

import AuthContainer from '../../../src/shared/components/Auth/AuthContainer';
import Header from '../../../src/header/components/Header';
import Footer from '../../../src/footer/components/Footer';
import SaveSuccessful from '../../../src/mypage/my-kurly-style/shared/containers/SaveSuccessful';
import { useScreenName } from '../../../src/shared/hooks';
import { amplitudeService, ScreenName } from '../../../src/shared/amplitude';
import { SubmitProfileSuccess } from '../../../src/shared/amplitude/events/mykurly-style';

export default function MyKurlyStyleSuccessPage() {
  useScreenName(ScreenName.PROFILE_SETTING_SUCCESS);

  const router = useRouter();

  useEffect(() => {
    void amplitudeService.logEvent(new SubmitProfileSuccess());
  }, []);

  return (
    router.isReady && (
      <>
        <Header />
        <AuthContainer loginRequired>
          <SaveSuccessful />
        </AuthContainer>
        <Footer />
      </>
    )
  );
}
