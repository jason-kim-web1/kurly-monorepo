import { KURLY_REGEX } from '../../../constant/regex';
import { ADDRESS_DETAIL_PLACEHOLDER_TEXT, MAX_ADDRESS_DETAIL_LENGTH } from '../../../constant/shipping-address';

import InputBox from '../../Input/InputBox';

const styles = {
  input: {
    padding: '0 0 4px',
    '> label': {
      padding: '0 0 13px',
      fontSize: '16px',
    },
    input: {
      height: '48px',
      '::placeholder': {
        color: '#ccc',
      },
    },
  },
};

interface Props {
  address: string;
  addressDetail?: string;
  onChange(params: { name?: string; value: string }): void;
}

export default function AdditionalAddress({ address, addressDetail, onChange }: Props) {
  return (
    <InputBox
      type="text"
      id="addressDetail"
      label={address}
      placeholder={ADDRESS_DETAIL_PLACEHOLDER_TEXT}
      name="addressDetail"
      value={addressDetail}
      onChange={onChange}
      maxLength={MAX_ADDRESS_DETAIL_LENGTH}
      denyPattern={KURLY_REGEX}
      css={styles.input}
    />
  );
}
