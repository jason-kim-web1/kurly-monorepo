import { useEffect } from 'react';

import { useWebview } from '../../../../src/shared/hooks';
import { isWebview } from '../../../../util/window/getDevice';

import appService from '../../../../src/shared/services/app.service';

import { INTRODUCE_PATH } from '../../../../src/shared/constant';

import MobileHeader from '../../../../src/shared/components/layouts/MobileHeader';
import HeaderButtons from '../../../../src/shared/components/layouts/HeaderButtons';
import BackButton from '../../../../src/shared/components/Button/BackButton';
import HeaderTitle from '../../../../src/shared/components/layouts/HeaderTitle';
import CartButtonContainer from '../../../../src/shared/containers/m/CartButtonContainer';
import UserMenu from '../../../../src/shared/components/layouts/UserMenu';
import IntroduceLayout from '../../../../src/introduce/containers/m/IntroduceLayout';
import PricePolicyContainer from '../../../../src/introduce/containers/m/PricePolicyContainer';
import Footer from '../../../../src/footer/components/m/Footer';

export default function PricePolicyPage() {
  const webview = useWebview();

  useEffect(() => {
    if (isWebview()) {
      appService.changeTitle('About Kurly');
    }
  }, []);

  return (
    <>
      {!webview && (
        <MobileHeader>
          <HeaderButtons position="left">
            <BackButton />
          </HeaderButtons>
          <HeaderTitle>About Kurly</HeaderTitle>
          <HeaderButtons position="right">
            <CartButtonContainer />
          </HeaderButtons>
        </MobileHeader>
      )}

      <IntroduceLayout menu={INTRODUCE_PATH.pricePolicy.name}>
        <PricePolicyContainer />
      </IntroduceLayout>

      {!webview && (
        <>
          <Footer />
          <UserMenu />
        </>
      )}
    </>
  );
}
