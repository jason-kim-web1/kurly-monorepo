import PhonebillProcessContainer, {
  getServerSidePhonebillProps,
} from '../../../../src/order/checkout/shared/containers/payments/process/PhonebillProcessContainer';

export default PhonebillProcessContainer;

export const getServerSideProps = getServerSidePhonebillProps();
