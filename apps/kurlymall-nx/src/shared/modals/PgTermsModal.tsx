import { memo, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import TermsModal from './TermsModal';

import { loadPgTermsHTML } from '../reducers/terms';
import { AppState } from '../store';

interface Props {
  open: boolean;
  onClose: () => void;
}

function PgTermsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const { pgTermsHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    if (open) {
      dispatch(loadPgTermsHTML());
    }
  }, [open, dispatch]);

  return <TermsModal html={pgTermsHTML} open={open} onClose={onClose} />;
}
export default memo(PgTermsModal);
