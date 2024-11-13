import { useQueryClient, QueryKey } from '@tanstack/react-query';

const useInquiryProductsInvalidate = (key?: QueryKey) => {
  const queryClient = useQueryClient();
  const invalidate = async () => {
    await queryClient.invalidateQueries(key, { exact: false });
  };
  return { invalidate };
};

export default useInquiryProductsInvalidate;
