import { useDispatch } from 'react-redux';

import Alert from '../../../shared/components/Alert/Alert';
import { deletePersonalInquiryItem } from '../../../shared/api';
import { deleteItem } from '../list/slice';
import { storePersonalInquirySessionData } from '../service/PersonalInquiryDataStorage';
import { redirectTo } from '../../../shared/reducers/page';
import { INQUIRY_PATH, getPageUrl } from '../../../shared/constant';
import { UserInquiryContentImageData } from '../list/types';
import { MemberOrderProductData } from '../shared/types';

export default function usePersonalInquiryItem() {
  const dispatch = useDispatch();

  const deleteInquiry = async (id: number) => {
    const { isConfirmed } = await Alert({
      text: '해당 글을 삭제하시겠습니까?',
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (!isConfirmed) {
      return;
    }

    try {
      await deletePersonalInquiryItem(id);
      await Alert({ text: '삭제가 완료 되었습니다.' });
    } catch (err) {
      await Alert({ text: '1:1문의 글 삭제에 실패하였습니다. \n 다시 시도 부탁 드리겠습니다.' });
      return;
    }
    dispatch(deleteItem(id));
  };

  const updateInquiry = async ({
    id,
    title,
    contents,
    orderNo,
    orderProducts,
    inquiryTypeCode,
    inquiryTypeSubCode,
    images,
    allowsNotification,
  }: {
    id: number;
    title: string;
    contents: string;
    orderNo: number;
    orderProducts: MemberOrderProductData[];
    inquiryTypeCode: string;
    inquiryTypeSubCode: string;
    allowsNotification: boolean;
    images: UserInquiryContentImageData[];
  }) => {
    storePersonalInquirySessionData({
      draft: {
        id,
        subject: title,
        contents,
      },
      orderData: {
        orderNo,
        products: orderProducts,
      },
      inquiryTypeCode,
      inquiryTypeSubCode,
      userImages: images,
      allowsNotification,
    });

    dispatch(
      redirectTo({
        url: getPageUrl(INQUIRY_PATH.form),
        query: {
          id,
        },
      }),
    );
  };

  return { deleteInquiry, updateInquiry };
}
