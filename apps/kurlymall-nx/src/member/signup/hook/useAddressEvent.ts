import { useCallback, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../../shared/store';
import { useFormEvent } from '../../../shared/hooks/useFormEvent';
import { NormalSignupFormInterface } from '../interfaces/NormalSignupForm.interface';
import { isPC } from '../../../../util/window/getDevice';
import { useCurrentAddress } from '../../../shared/hooks/useCartAddress';

export default function useAddressEvent(setShowAddressSearch?: (value: boolean) => void) {
  const dispatch = useDispatch();
  const { handleChange } = useFormEvent<NormalSignupFormInterface>();
  const { isAddressAssigned, currentAddress } = useAppSelector(({ shippingAddress }) => shippingAddress);
  const { loadCartAddress } = useCurrentAddress();

  const updateAddressData = useCallback(() => {
    if (currentAddress) {
      handleChange({ name: 'numberAddress', value: currentAddress.address ?? '' });
      handleChange({ name: 'roadAddress', value: currentAddress.roadAddress ?? '' });
      handleChange({ name: 'subAddress', value: currentAddress.addressDetail ?? '' });
      handleChange({ name: 'zoneCode', value: currentAddress.roadZoneCode ?? '' });
      handleChange({ name: 'zipCode', value: currentAddress.roadZoneCode ?? '' });

      let addressType = '';
      if (currentAddress.baseAddressType === 'road') {
        addressType = 'ROAD_ADDRESS';
      } else {
        addressType = 'NUMBER_ADDRESS';
      }
      handleChange({ name: 'baseAddressType', value: addressType });
    }
  }, [currentAddress, handleChange]);

  useEffect(() => {
    updateAddressData();
  }, [updateAddressData]);

  useEffect(() => {
    (async () => {
      if (isPC) {
        return;
      }

      if (isAddressAssigned) {
        await loadCartAddress();
      }
    })();
  }, [isAddressAssigned, loadCartAddress]);

  // PC 에서는 주소 검색 후 이벤트 발생하고 창이 닫히므로,
  // 부모 윈도우에서 이벤트를 추가로 발동
  useEffect(() => {
    // if (!isPC) {
    //   return;
    // }

    const findEvent = async (e: MessageEvent) => {
      if (e.data.source === 'addressChanged') {
        await loadCartAddress();
        if (setShowAddressSearch) {
          setShowAddressSearch(false);
        }
      } else if (e.data.source === 'closeAddressSearch') {
        if (setShowAddressSearch) {
          setShowAddressSearch(false);
        }
      }
    };

    window.addEventListener('message', findEvent);

    return () => {
      window.removeEventListener('message', findEvent);
    };
  }, [dispatch, loadCartAddress, setShowAddressSearch]);
}
