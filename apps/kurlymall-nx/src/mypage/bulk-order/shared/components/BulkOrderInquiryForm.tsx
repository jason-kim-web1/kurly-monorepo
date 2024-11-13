import { css } from '@emotion/react';

import { useCallback } from 'react';

import { useDispatch } from 'react-redux';

import COLOR from '../../../../shared/constant/colorset';

import { isPC } from '../../../../../util/window/getDevice';
import { useAppSelector } from '../../../../shared/store';
import { InputEventType } from '../../interfaces/BulkOrderForm.interface';

import InputGroup from '../../../../shared/components/InputGroup/InputGroup';
import MessageArea from '../../../../shared/components/Message/MessageTextArea';
import FormText from './FormText';
import { handleChange } from '../../reducers/bulk-order.slice';

const theme = {
  height: 200,
  textColor: COLOR.kurlyGray800,
  placeholderColor: COLOR.placeholder,
  backgroundColor: COLOR.kurlyWhite,
  border: `solid 1px ${COLOR.lightGray}`,
  borderFocus: `solid 1px ${COLOR.kurlyGray800}`,
};

const textAreaStyle = css`
  textarea {
    font-size: 14px;
  }
`;

export default function BulkOrderInquiryForm() {
  const dispatch = useDispatch();

  const {
    form: { note },
  } = useAppSelector(({ bulkOrder }) => bulkOrder);

  const onChange = useCallback(
    (event: InputEventType) => {
      dispatch(handleChange(event));
    },
    [dispatch],
  );

  const handleChangeInquery = (value: string) => {
    onChange({ name: 'note', value });
  };

  return (
    <InputGroup htmlFor="inquiry-contents" label="문의 사항">
      <MessageArea
        theme={theme}
        showCount
        id="inquiry-contents"
        name="note"
        placeholder="문의 사항을 입력해주세요"
        value={note}
        maxLength={5000}
        showCountText
        onChange={handleChangeInquery}
        css={textAreaStyle}
      />
      <FormText warning={isPC}>원활한 상담을 위해 상품명, 수량, 상담전화 희망 시간 등을 적어주세요.</FormText>
    </InputGroup>
  );
}
