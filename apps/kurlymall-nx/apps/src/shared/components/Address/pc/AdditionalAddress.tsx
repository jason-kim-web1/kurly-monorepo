import styled from '@emotion/styled';

import COLOR from '../../../constant/colorset';
import { KURLY_REGEX } from '../../../constant/regex';
import { ADDRESS_DETAIL_PLACEHOLDER_TEXT, MAX_ADDRESS_DETAIL_LENGTH } from '../../../constant/shipping-address';

import Button from '../../Button/Button';
import InputBox from '../../Input/InputBox';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  button > span {
    line-height: 24px;
    > img {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: top;
    }
  }
`;

const Address = styled.p`
  display: inline-flex;
  overflow: hidden;
  flex: 1;
  margin-right: 10px;
  padding: 0 12px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 3px;
  background-color: ${COLOR.kurlyGray100};
  font-size: 14px;
  line-height: 42px;
  color: ${COLOR.kurlyGray450};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const styles = {
  input: {
    input: {
      fontSize: '14px',
      '::placeholder': {
        color: '#ccc',
      },
    },
  },
  button: {
    '> span': {
      fontSize: '14px',
      fontWeight: 500,
      img: {
        margin: 0,
      },
    },
  },
};

interface Props {
  address: string;
  addressDetail?: string;
  onChange(params: { name?: string; value: string }): void;
  onClick: () => void;
}

export default function AdditionalAddress({ address, addressDetail, onChange, onClick }: Props) {
  return (
    <>
      <Wrapper>
        <Address>{address}</Address>
        <Button
          width={120}
          height={44}
          radius={3}
          text="재검색"
          theme="secondary"
          icon="https://res.kurly.com/pc/service/common/2006/ico_search.svg"
          onClick={onClick}
          css={styles.button}
        />
      </Wrapper>
      <InputBox
        type="text"
        id="addressDetail"
        placeholder={ADDRESS_DETAIL_PLACEHOLDER_TEXT}
        name="addressDetail"
        value={addressDetail}
        onChange={onChange}
        maxLength={MAX_ADDRESS_DETAIL_LENGTH}
        height={44}
        denyPattern={KURLY_REGEX}
        css={styles.input}
      />
    </>
  );
}
