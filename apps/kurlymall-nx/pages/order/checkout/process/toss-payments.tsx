import TossPaymentsProcessContainer, {
  getServerSideTossPaymentsProps,
} from '../../../../src/order/checkout/shared/containers/payments/process/TossPaymentsProcessContainer';

export default TossPaymentsProcessContainer;

export const getServerSideProps = getServerSideTossPaymentsProps();
