import CategoryPageContentContainer from '../../src/product/list/categories/pc/containers/CategoryPageContentContainer';
import { CategoriesDataProvider } from '../../src/product/list/categories/Context/CategoriesDataProvider';

export default function CategoryList() {
  return (
    <CategoriesDataProvider>
      <CategoryPageContentContainer />
    </CategoriesDataProvider>
  );
}
