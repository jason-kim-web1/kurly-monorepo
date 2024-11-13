import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { StyledDeliveryAddress } from '../shared/styled';
import AddressModal from './AddressModal';
import { SearchGlass } from '../../../shared/images';
import { isPC } from '../../../../util/window/getDevice';
import { DeliveryProps } from '../../../shared/interfaces/ShippingAddress';

const schema = Yup.object().shape({
  roadAddress: Yup.string().required('검색을 클릭하여 주소를 입력해주세요.'),
  addressDetail: Yup.string().required('상세주소를 입력해주세요.'),
});

type GiftDeliveryAddressProps = {
  selectedAddress?: DeliveryProps;
  setAddress: (address: DeliveryProps) => void;
  isEdit: boolean;
  savedAddress?: string;
};

function GiftDeliveryAddress({ selectedAddress, setAddress, isEdit, savedAddress }: GiftDeliveryAddressProps) {
  const [openAddressModal, setOpenAddressModal] = useState(false);

  const formik = useFormik<{ roadAddress: string; addressDetail: string }>({
    initialValues: {
      roadAddress: '',
      addressDetail: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (!selectedAddress) return;

      setAddress({
        ...selectedAddress,
        ...values,
      });
    },
  });

  const { values, handleSubmit, setFieldValue } = formik;

  const onSaveSearchResult = (result: DeliveryProps) => {
    setAddress(result);

    setFieldValue('roadAddress', result.roadAddress);

    setOpenAddressModal(false);
  };

  const handleAddressDetail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFieldValue('addressDetail', event.target.value);
  };

  const onSubmit = () => {
    handleSubmit();
  };

  return (
    <>
      <StyledDeliveryAddress className={isPC ? 'pc' : 'mobile'}>
        <div className="div-title div-title__03">
          <img
            src="https://res.kurly.com/images/member-lounges/0701/gift_title03_v2.png"
            alt="03 택배 수령 주소 입력하기"
          />
        </div>
        {isEdit ? (
          <div className="div-address-form">
            <div className="div-address-input">
              <input
                type="text"
                placeholder="도로명, 지번, 건물명 검색"
                value={values.roadAddress}
                readOnly
                onClick={() => setOpenAddressModal(true)}
              />
              <button onClick={() => setOpenAddressModal(true)} className="search-button">
                <img src={SearchGlass} alt="search" />
              </button>
            </div>
            <div className="div-address-input">
              <input
                type="text"
                placeholder="나머지 주소를 입력하세요."
                value={values.addressDetail}
                onBlur={onSubmit}
                onChange={handleAddressDetail}
              />
            </div>
          </div>
        ) : (
          <div className="div-saved-data">{savedAddress}</div>
        )}
      </StyledDeliveryAddress>
      <AddressModal onClose={() => setOpenAddressModal(false)} open={openAddressModal} onSubmit={onSaveSearchResult} />
    </>
  );
}

export default GiftDeliveryAddress;
