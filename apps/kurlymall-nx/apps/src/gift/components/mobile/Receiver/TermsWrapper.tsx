import { memo } from 'react';

import { TermsPolicyList, TermsType } from '../../../../shared/interfaces';

import Checkbox from '../../../../shared/components/Input/Checkbox';
import TermsList from '../../../../order/shared/m/components/TermsList';

const styles = {
  label: {
    padding: 0,
    fontWeight: 600,
  },
};

interface Props {
  terms: TermsPolicyList[];
  isAllAgreed: boolean;
  onChangeAgree: (agreed: boolean, code: TermsType) => void;
  onChangeAllAgree: (checked: boolean) => void;
}

function TermsWrapper({ terms, isAllAgreed, onChangeAllAgree, onChangeAgree }: Props) {
  return (
    <>
      <Checkbox
        id="terms-agree"
        label="선물 수락 필수 동의"
        checked={isAllAgreed}
        onChange={({ target }) => onChangeAllAgree(target.checked)}
        css={styles.label}
      />
      <TermsList terms={terms} onChange={onChangeAgree} />
    </>
  );
}

export default memo(TermsWrapper);
