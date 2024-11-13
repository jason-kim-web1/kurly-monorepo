import { AmplitudeEvent } from '../../AmplitudeEvent';

import type { AppState } from '../../../store';
import { ProductReview } from '../../../../product/board/review/ProductReview.service';

interface Payload {
  reviewData: ProductReview;
  sortType: 'RECOMMEND' | 'RECENTLY';
  productData: AppState['productDetail'];
}

export class ViewReviewDetail extends AmplitudeEvent<Payload> {
  constructor(payload: Payload) {
    super('view_review_detail', payload);
  }

  getPayload() {
    const { reviewData, sortType, productData } = this.payload;

    return {
      position: 1,
      has_image: true,
      review_type: reviewData.type,
      selection_sort_type: sortType === 'RECOMMEND' ? 'review_default' : 'review_recent',
      user_grade: reviewData.reviewerGrade,
      retail_price: productData.retailPrice,
      base_price: productData.basePrice,
      price: productData.discountedPrice ?? productData.basePrice,
      content_id: productData.no,
      content_name: productData.name,
      default_content_id: productData.defaultContentId,
      delivery_type: productData.deliveryTypeNames.join(', '),
      seller: productData.sellerName,
    };
  }
}
