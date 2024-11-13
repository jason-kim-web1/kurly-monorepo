import { useContext, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { MYPAGE_ADDRESS_QUERY_KEY } from './useAddressListQuery';
import { AddressContext } from '../context/addressContext';

export default function useAddressEvents() {
  const queryClient = useQueryClient();
  const {
    actions: { setShowIframe },
  } = useContext(AddressContext);

  useEffect(() => {
    const handleAddressAction = async (e: MessageEvent) => {
      if (e.data.source === 'addressChanged' || e.data.source === 'closeAddressSearch') {
        await queryClient.invalidateQueries(MYPAGE_ADDRESS_QUERY_KEY);
        setShowIframe(false);
        return;
      }
    };

    window.addEventListener('message', handleAddressAction);

    return () => window.removeEventListener('message', handleAddressAction);
  }, [queryClient]);
}
