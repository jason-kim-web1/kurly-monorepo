import { GetStaticProps } from 'next';
import { dehydrate } from '@tanstack/react-query';

import { REVALIDATE } from './constants';
import { getQueryClient } from './utils/getQueryClient';

export const getPartnersLorealStaticProps: GetStaticProps = async () => {
  const queryClient = await getQueryClient();
  return {
    props: { dehydratedState: dehydrate(queryClient) },
    revalidate: REVALIDATE,
  };
};
