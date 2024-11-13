import { ProductSibling } from '../../../../product/list/types';

import { AmplitudeEvent } from '../../AmplitudeEvent';

interface Payload {
  url: string;
  rootCategory: {
    code: string;
    name: string;
  };
  siblingCategory: Pick<ProductSibling, 'code' | 'name'>;
}

export class SelectCategoryBanner extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('select_category_banner', payload);
  }

  getPayload() {
    const { url, rootCategory, siblingCategory } = this.payload;

    const { code: primaryCateogryId, name: primaryCategoryName } = rootCategory;
    const { code: siblingCategoryId, name: siblingCategoryName } = siblingCategory;
    const bannerCategory = url.split('category=');
    const bannerCategoryId = bannerCategory.length > 1 ? bannerCategory[bannerCategory.length - 1] : null;

    return {
      url,
      banner_category_id: bannerCategoryId,
      primary_category_id: primaryCateogryId,
      primary_category_name: primaryCategoryName,
      secondary_category_id: siblingCategoryId,
      secondary_category_name: siblingCategoryName,
    };
  }
}
