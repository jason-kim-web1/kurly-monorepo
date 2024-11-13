import { useEffect } from 'react';

import { branchService } from '../../shared/branch';

export default function useMainPage() {
  useEffect(() => {
    branchService.openAppDownloadBanner().catch(); //ignore
  }, []);
}
