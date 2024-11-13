import { CategoriesDataProvider } from '../../../src/product/list/categories/Context/CategoriesDataProvider';
import CategoryPageContentContainer from '../../../src/product/list/categories/m/CategoryPageContentContainer';

export default function CategoryList() {
  return (
    <CategoriesDataProvider>
      <CategoryPageContentContainer />
    </CategoriesDataProvider>
  );
}
