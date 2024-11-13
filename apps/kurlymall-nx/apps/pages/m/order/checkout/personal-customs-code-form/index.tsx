import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PersonalCustomsCodeForm from '../../../../../src/order/checkout/m/components/PersonalCustomsCodeDetail/PersonalCustomsCodeForm';
import { WebviewServerSideProps, getWebviewServerSideProps } from '../../../../../src/server/webview';
import { setAccessToken } from '../../../../../src/shared/reducers/auth';
import { isWebview } from '../../../../../util/window/getDevice';

const PersonalCustomsCodeFormPage = ({ accessToken }: WebviewServerSideProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isWebview() || !accessToken) {
      return;
    }

    dispatch(
      setAccessToken({
        accessToken,
        isGuest: false,
      }),
    );
  }, [accessToken, dispatch]);

  return <PersonalCustomsCodeForm />;
};

export default PersonalCustomsCodeFormPage;

export const getServerSideProps = getWebviewServerSideProps();
