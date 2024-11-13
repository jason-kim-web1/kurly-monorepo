import { memo, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import TermsModal from './TermsModal';

import { loadPersonalInformationTerms } from '../reducers/terms';
import { AppState } from '../store';

interface Props {
  open: boolean;
  onClose: () => void;
}

function PersonalInformationTermsModal({ open, onClose }: Props) {
  const dispatch = useDispatch();
  const { personalInformationTermsHTML } = useSelector(({ terms }: AppState) => terms);

  useEffect(() => {
    if (open) {
      dispatch(loadPersonalInformationTerms());
    }
  }, [open, dispatch]);

  return <TermsModal html={personalInformationTermsHTML} open={open} onClose={onClose} />;
}

export default memo(PersonalInformationTermsModal);
