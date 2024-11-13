import { ChangeEvent, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import {
  clearSelectedProducts,
  PersonalInquiryFormMode,
  resetSearchInfo,
  setIsRegisterImage,
  setOrderProductType,
} from '../slice';
import Alert from '../../../../shared/components/Alert/Alert';
import { InquiryCategory } from '../types';
import { getPersonalInquiryCategories } from '../service/personalInquiry.service';

interface Props {
  inquiryTypeCode?: string;
  inquiryTypeSubCode?: string;
  mode: PersonalInquiryFormMode;
  handleChange(e: any): void;
}

export default function usePersonalInquiryCategory({ inquiryTypeCode, inquiryTypeSubCode, handleChange, mode }: Props) {
  const [categories, setCategories] = useState<InquiryCategory[]>([]);

  const [isSubCategoryChange, setIsSubCategoryChange] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const data = await getPersonalInquiryCategories();
      setCategories(data);
    })();
  }, []);

  const inquiryCategory = categories.find((item) => item.value === inquiryTypeCode);

  const inquirySubCategory = inquiryCategory?.childCodes.find((item) => item.value === inquiryTypeSubCode);

  useEffect(() => {
    if (inquirySubCategory) {
      const orderProductType = inquirySubCategory.orderProductType ?? 'NONE';

      const isNewModeRegisterImage = mode === 'NEW' && inquirySubCategory.isRegisterImage;
      const isEditModeRegisterImage = mode === 'EDIT' && isSubCategoryChange && inquirySubCategory.isRegisterImage;

      dispatch(setOrderProductType(orderProductType));
      dispatch(setIsRegisterImage(inquirySubCategory.isRegisterImage));

      if (isNewModeRegisterImage || isEditModeRegisterImage) {
        Alert({ text: '전체 모습의 사진을 찍어서 등록해주시면, 빠른 처리가 가능합니다.' }).then(() => {
          setIsSubCategoryChange(false);
        });
      }
    }
  }, [dispatch, inquirySubCategory]);

  const resetOrderProductPicker = () => {
    dispatch(resetSearchInfo());
    dispatch(clearSelectedProducts());
  };

  const handleChangeCategory = (e: ChangeEvent) => {
    resetOrderProductPicker();
    const target = {
      type: 'text',
      value: '',
      name: 'inquirySubCategory',
    };
    handleChange({ target }); // reset inquirySubCategory
    handleChange(e);
  };

  const handleChangeSubCategory = (e: ChangeEvent) => {
    resetOrderProductPicker();
    handleChange(e);
    setIsSubCategoryChange(true);
  };

  return {
    categories,
    inquiryCategory,
    inquirySubCategory,
    handleChangeCategory,
    handleChangeSubCategory,
  };
}
