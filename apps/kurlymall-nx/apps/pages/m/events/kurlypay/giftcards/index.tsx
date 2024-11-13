import { KURLYPAY_WEB_URL } from '../../../../../src/shared/configs/config';

export default function giftcardsPage() {}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: `${KURLYPAY_WEB_URL}/giftcards`,
      permanent: true,
    },
  };
}
