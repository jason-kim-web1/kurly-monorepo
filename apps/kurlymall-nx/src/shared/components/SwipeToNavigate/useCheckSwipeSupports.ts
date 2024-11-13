import { useEffect, useState } from 'react';

import { checkIfBrowserSupports } from './utils';

export default function useCheckSwipeSupports() {
  const [supports, setSupports] = useState(false);

  useEffect(() => {
    setSupports(checkIfBrowserSupports());
  }, [setSupports]);

  return supports;
}
