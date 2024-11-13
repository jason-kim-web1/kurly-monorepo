import getMockProductDetail from '../../../src/shared/stress-test/getMockProductDetail';

import ProductPage from '../../goods/[productCode]';

export default ProductPage;

export const getServerSideProps = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 300);
  });
  const product = getMockProductDetail();
  return {
    props: {
      adultVerificationFailed: false,
      product,
    },
  };
};
