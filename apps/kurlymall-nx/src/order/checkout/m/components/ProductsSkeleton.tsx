import { Divider } from '../../../../shared/components/Divider/Divider';
import LoadingCollapse from './Loading/LoadingCollapse';

export const ProductsSkeleton = ({ title }: { title: string }) => {
  return (
    <>
      <LoadingCollapse testId={'loading-checkout-products'} title={title} />
      <Divider />
    </>
  );
};
