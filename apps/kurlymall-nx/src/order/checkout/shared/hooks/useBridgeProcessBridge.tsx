import { ORDER_PATH } from '../../../../shared/constant';
import Alert from '../../../../shared/components/Alert/Alert';

interface QueryBridgeProps {
  url: string;
  queryResult: string;
}

interface BodyBridgeProps {
  bodyResult: { [key: string]: string | number };
  url: string;
  queryResult: string;
}

export default function useBridgeProcessBridge() {
  const handleQueryBridge = ({ url, queryResult }: QueryBridgeProps) => {
    window.parent.ORDER_PROCESS_QUERY?.(`${origin}${url}${queryResult}`);
  };
  const handleBodyBridge = ({ bodyResult, url, queryResult }: BodyBridgeProps) => {
    window.parent.ORDER_PROCESS_BODY?.({
      url: `${origin}${url}${queryResult}`,
      body: JSON.stringify(bodyResult),
    });
  };

  const handleBridgeError = () => {
    if (!window.parent.ORDER_PROCESS_QUERY) {
      window.location.replace(ORDER_PATH.fail.uri);
      return;
    }

    handleQueryBridge({ url: ORDER_PATH.fail.uri, queryResult: '' });
  };

  const handleIframePaymentError = async () => {
    await Alert({ text: '일시적인 오류가 발생했습니다.\n문제가 계속되면 고객센터로 문의해주세요.' });
    window.history.back();
  };

  return {
    handleQueryBridge,
    handleBodyBridge,
    handleBridgeError,
    handleIframePaymentError,
  };
}
