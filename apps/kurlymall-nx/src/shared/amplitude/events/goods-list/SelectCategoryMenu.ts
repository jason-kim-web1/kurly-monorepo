import { ProductSibling } from '../../../../product/list/types';

import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  rootCategory: {
    code: string;
    name: string;
  };
  siblingCategory: Pick<ProductSibling, 'code' | 'name'>;
}

export class SelectCategoryMenu extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_category_subtab', payload);
  }

  getPayload() {
    const { rootCategory, siblingCategory } = this.payload;
    const { code: primaryCateogryId, name: primaryCategoryName } = rootCategory;
    const { code: siblingCategoryId, name: siblingCategoryName } = siblingCategory;

    return {
      primary_category_id: primaryCateogryId,
      primary_category_name: primaryCategoryName,
      secondary_category_id: siblingCategoryId,
      secondary_category_name: siblingCategoryName,
    };
  }
}
