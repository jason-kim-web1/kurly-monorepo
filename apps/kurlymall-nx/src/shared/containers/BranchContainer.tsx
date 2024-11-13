import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { AppState } from '../store';

import { branchService } from '../branch';

export default function BranchContainer() {
  const { accessToken } = useSelector((state: AppState) => state.auth);

  useEffect(() => {
    if (accessToken) {
      branchService.setAccessToken(accessToken);
    }
  }, [accessToken]);

  return null;
}
