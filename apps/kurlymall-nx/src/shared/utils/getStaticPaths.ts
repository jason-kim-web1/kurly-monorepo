import type { GetStaticPaths } from 'next';

const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export { getStaticPaths };
