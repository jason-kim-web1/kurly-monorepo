import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

import { MY_BEAUTY_BOX_URL } from '../../../../src/partners/loreal/constants';

const PartnersLorealPopUp = () => {
  const { isReady, query } = useRouter();
  const formElementRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const { current } = formElementRef;
    if (!current || !isReady) {
      return;
    }
    current.submit();
  }, [isReady]);
  if (!isReady) {
    return null;
  }
  return (
    <form ref={formElementRef} method="POST" id="lorealLnkgForm" action={MY_BEAUTY_BOX_URL}>
      <input type="hidden" name="userKey" id="userKey" value={query.userKey} />
      <input
        type="hidden"
        name="returnUrl"
        id="returnUrl"
        value={`${window.location.origin}/popup/partners/loreal/callback`}
      />
    </form>
  );
};

export default PartnersLorealPopUp;
