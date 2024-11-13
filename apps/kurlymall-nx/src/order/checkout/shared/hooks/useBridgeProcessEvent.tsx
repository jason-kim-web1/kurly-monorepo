import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { checkBrowserEnvironment } from '../../../../shared/utils/checkBrowserEnvironment';
import { setPaymentGatewayUrl } from '../../../shared/shared/reducers/payments.slice';

declare global {
  interface Window {
    ORDER_PROCESS_QUERY?: (url: string) => void;
    ORDER_PROCESS_BODY?: ({ url, body }: { url: string; body: string }) => void;
  }
}
export default function useBridgeProcessEvent() {
  const dispatch = useDispatch();
  const { replace } = useRouter();

  const handleProcessQuery = (url: string) => replace(url);

  const handleProcessBody = ({ url, body }: { url: string; body: string }) => {
    const form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', url);

    Object.entries(JSON.parse(body)).forEach(([key, value]) => {
      const formObject = document.createElement('input');
      formObject.setAttribute('type', 'hidden');
      formObject.setAttribute('name', key);
      formObject.setAttribute('value', value as string);

      form.appendChild(formObject);
    });

    document.body.appendChild(form);
    form.submit();
  };

  useEffect(() => {
    if (!checkBrowserEnvironment()) {
      return;
    }
    window.ORDER_PROCESS_QUERY = handleProcessQuery;
    window.ORDER_PROCESS_BODY = handleProcessBody;
    return () => {
      dispatch(setPaymentGatewayUrl(null));
      delete window.ORDER_PROCESS_QUERY;
      delete window.ORDER_PROCESS_BODY;
    };
  }, []);
}
