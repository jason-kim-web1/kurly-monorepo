import { memo, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import TermsModal from './TermsModal';

import { loadKurlyTermsHTML } from '../reducers/terms';
import { AppState } from '../store';

interface Props {
  open: boolean;
  onClose(): void;
}

function KurlyTermsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const { kurlyTermsHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    if (open) {
      dispatch(loadKurlyTermsHTML());
    }
  }, [open, dispatch]);

  return <TermsModal html={kurlyTermsHTML} open={open} onClose={onClose} />;
}
export default memo(KurlyTermsModal);
