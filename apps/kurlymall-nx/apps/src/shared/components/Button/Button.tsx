import React, { memo, ReactNode, useMemo } from 'react';

import styled from '@emotion/styled';

import { SerializedStyles } from '@emotion/react';

import { mq } from '../../styles';
import COLOR from '../../constant/colorset';
import Loading from '../Loading/Loading';
import { isPC } from '../../../../util/window/getDevice';

type ButtonTheme = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  id?: string;
  className?: string;
  text: string;
  type?: 'button' | 'submit';
  theme?: ButtonTheme;
  radius?: number;
  fontSize?: number;
  width?: number;
  height?: number;
  icon?: string | ReactNode;
  styleIcon?: {
    css?: SerializedStyles;
    src: string;
  };
  disabled?: boolean;
  onClick?(): void;
  isLoading?: boolean;
  isSubmitLoading?: boolean;
}

const style: Record<
  ButtonTheme,
  {
    color: string;
    backgroundColor: string;
    border: string;
  }
> = {
  primary: {
    color: COLOR.kurlyWhite,
    backgroundColor: COLOR.kurlyPurple,
    border: '0 none',
  },
  secondary: {
    color: COLOR.kurlyPurple,
    backgroundColor: COLOR.kurlyWhite,
    border: `1px solid ${COLOR.kurlyPurple}`,
  },
  tertiary: {
    color: COLOR.kurlyGray800,
    backgroundColor: COLOR.kurlyWhite,
    border: `1px solid ${COLOR.lightGray}`,
  },
};

const BasicButton = styled.button<Pick<ButtonProps, 'width' | 'height' | 'theme' | 'radius'>>`
  display: block;
  padding: 0 10px;
  text-align: center;
  overflow: hidden;
  ${({ width, height, theme, radius }) =>
    mq({
      width: width ? `${width}px` : '100%',
      height: height ? `${height}px` : ['52px', '56px'],
      borderRadius: Number(radius) > -1 ? `${radius}px` : '3px',
      ':disabled':
        theme === 'primary'
          ? {
              backgroundColor: COLOR.lightGray,
            }
          : {
              borderColor: COLOR.lightGray,
              color: COLOR.lightGray,
            },
      ...style[theme as ButtonTheme],
    })}
`;

const LoadingButton = styled(BasicButton)<{ isSubmitLoading?: boolean }>`
  background: ${({ isSubmitLoading }) => (isSubmitLoading ? COLOR.kurlyPurple : COLOR.lightGray)};
  cursor: not-allowed;
  > div {
    display: inline-block;
    position: relative;
    > div:first-of-type {
      max-width: 100px;
      max-height: 100px;
      width: 70%;
      height: 70%;
    }
  }
`;

const Text = styled.span<{ fontSize?: number }>`
  display: inline-block;
  font-size: ${({ fontSize }) => (fontSize ? fontSize : 16)}px;
  font-weight: ${isPC ? 500 : 600};
`;

const DefaultIcon = styled.img({
  display: 'inline-block',
  width: '20px',
  height: '20px',
  marginRight: '4px',
  verticalAlign: 'middle',
});

function Button({
  id,
  className,
  text = '',
  type = 'button',
  theme = 'primary',
  radius,
  fontSize,
  width,
  height,
  icon,
  styleIcon,
  disabled = false,
  onClick,
  isLoading = false,
  isSubmitLoading = false,
}: ButtonProps) {
  const isComponentIcon = useMemo(() => React.isValidElement(icon), [icon]);

  return isLoading || isSubmitLoading ? (
    <LoadingButton
      id={id}
      type="button"
      isSubmitLoading={isSubmitLoading}
      className={className}
      theme={theme}
      width={width}
      height={height}
      radius={radius}
    >
      <Loading theme="white" />
    </LoadingButton>
  ) : (
    <BasicButton
      id={id}
      className={className}
      type={type}
      disabled={disabled}
      onClick={onClick}
      theme={theme}
      width={width}
      height={height}
      radius={radius}
    >
      <Text fontSize={fontSize}>
        {typeof icon === 'string' && <DefaultIcon src={icon} alt="" />}
        {isComponentIcon && icon}
        {styleIcon && <img src={styleIcon.src} css={styleIcon.css} alt="" />}
        {text}
      </Text>
    </BasicButton>
  );
}

export default memo(Button);
