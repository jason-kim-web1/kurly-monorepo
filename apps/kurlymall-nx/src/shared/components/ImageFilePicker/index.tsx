import type { ReactNode, ChangeEvent } from 'react';
import { useRef } from 'react';

import type { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';
import { isUndefined } from 'lodash';

import Camera from '../../icons/Camera';
import COLOR from '../../constant/colorset';
import { visuallyHidden } from '../../utils/visuallyHidden';

interface Props {
  onChange(event: ChangeEvent<HTMLInputElement>): void;
  allowedFileExtensions?: string[];
  children?: ReactNode;
  imagePickerStyle?: SerializedStyles;
}

const Wrap = styled.div`
  position: relative;
  width: auto;
  height: 100%;
`;

const Button = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 1px solid ${COLOR.lightGray};
  overflow: hidden;
  border-radius: 6px;
`;

export default function ImageFilePicker({
  allowedFileExtensions = ['png', 'jpg', 'jpeg'],
  children,
  onChange,
  imagePickerStyle,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const acceptableFileExtensions = allowedFileExtensions.map((extension) => `image/${extension}`).join(', ');

  const handleClick = () => {
    if (!ref.current) {
      return;
    }
    ref.current.click();
  };

  return (
    <Wrap css={imagePickerStyle}>
      <Button type="button" onClick={handleClick}>
        {isUndefined(children) ? <Camera /> : children}
      </Button>
      <input
        ref={ref}
        css={visuallyHidden}
        type="file"
        accept={acceptableFileExtensions}
        multiple
        onChange={onChange}
      />
    </Wrap>
  );
}
