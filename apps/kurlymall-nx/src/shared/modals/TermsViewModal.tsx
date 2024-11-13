import { memo, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import TermsModal from './TermsModal';

import { useAppSelector } from '../store';
import { loadTermsFile } from '../reducers/terms';

interface Props {
  open: boolean;
  params: {
    key: string;
    url: string;
  };
  onClose: () => void;
}

function TermsViewModal({ open, params, onClose }: Props) {
  const dispatch = useDispatch();
  const termsFile = useAppSelector(({ terms }) => terms.termsFile);

  useEffect(() => {
    if (open) {
      dispatch(loadTermsFile(params));
    }
  }, [open, dispatch, params]);

  const terms = termsFile?.find(({ key }) => key === params.key);

  if (terms?.status === 'error') {
    return null;
  }

  return <TermsModal html={terms?.html} open={open} onClose={onClose} />;
}

export default memo(TermsViewModal);
