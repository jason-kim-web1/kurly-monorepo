import appService from '../../../../shared/services/app.service';
import { ProductInquiryPostItem } from '../types';

export default function useProductInquiryWebview(productNo: number, productName: string) {
  const openRegisterPage = (item?: ProductInquiryPostItem) => {
    const query = `productNo=${productNo}` + `&productName=${encodeURIComponent(productName)}`;

    const modifyQuery = item
      ? `&inquiryId=${item.id}` +
        `&subject=${encodeURIComponent(item.subject)}` +
        `&content=${encodeURIComponent(item.contents)}` +
        `&isSecret=${item.isSecret}`
      : '';

    appService.openWebview({
      url: `${window.location.origin}/webview/goods/inquiry/form?${query}${modifyQuery}`,
      title: '상품문의',
      is_modal: false,
    });
  };

  return { openRegisterPage };
}
