import styled from '@emotion/styled';

import React, { ForwardedRef, forwardRef, Fragment, memo, ReactNode, useEffect, useRef } from 'react';

import { isString, pick } from 'lodash';

import { vars } from '@thefarmersfront/kpds-css';

import { PrimaryCategory } from '../../../../shared/reducers/category';
import { multiMaxLineText } from '../../../../shared/utils';
import { IconNBadge6x6 } from '../../../../shared/images';
import { convertRemToPixel } from '../../../../shared/utils/font';
import { EMOJI_REGEX } from '../../../../shared/constant';

interface Props extends Pick<PrimaryCategory, 'isNew' | 'name'> {
  isSelected?: boolean;
  onClick: () => void;
}

const Container = styled.li`
  margin-top: 0.125rem;

  &:first-of-type {
    margin-top: unset;
  }
`;

const NewBadge = styled.span`
  z-index: 1;
  position: absolute;
  background-image: url(${IconNBadge6x6});
  background-size: contain;
  background-position: 50% 50%;
  display: inline-block;
  top: 1rem;
  width: 0.375rem;
  height: 0.375rem;
`;

const Text = styled.span`
  position: relative;
  font-size: 1rem;
  line-height: 1.375;
  z-index: 1;
`;

const TextBoxWrapper = styled.span`
  ${multiMaxLineText(2)}
  text-overflow: ellipsis;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const Button = styled.button<{ isSelected: boolean }>`
  position: relative;
  width: 100%;
  text-align: left;
  padding: 0.75rem;
  color: ${({ isSelected }) => (isSelected ? vars.color.text.$primary : vars.color.text.$secondary)};
  border-radius: 0.625rem;
  background-color: unset;
  transition: background-color 0.2s ease-out;

  &:active {
    background-color: ${vars.color.main.$secondaryContainer};
  }

  ${Text} {
    font-weight: ${({ isSelected }) => (isSelected ? 600 : 400)};
  }
`;

const LineBrakePolicy = memo(function LineBrakePolicy({ text }: { text: string }) {
  const textArray: ReactNode[] = text.split('·');
  if (textArray.length === 1) {
    return <>{textArray[0]}</>;
  }

  const replacedText = textArray.map((o, index) => {
    if (index === 0) return <span key={index}>{o}</span>;
    if (isString(o) && EMOJI_REGEX.test(o)) return <span key={index}>{`·${o}`}</span>;

    return (
      <Fragment key={index}>
        <wbr />
        <span>{`·${o}`}</span>
      </Fragment>
    );
  });

  return <>{replacedText}</>;
});

function MenuItem({ onClick: handleClick, isSelected = false, name, isNew }: Props, ref: ForwardedRef<HTMLLIElement>) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!badgeRef.current || !textRef.current) return;
    const textRect = { ...pick(textRef.current.getBoundingClientRect(), ['width']) };
    badgeRef.current.style.left = `${textRect.width + convertRemToPixel(0.75) + 2}px`;
  }, [isNew, name, isSelected]);

  return (
    <Container ref={ref}>
      <Button type={'button'} onClick={handleClick} isSelected={isSelected}>
        <TextBoxWrapper>
          <Text ref={textRef}>
            <LineBrakePolicy text={name} />
          </Text>
        </TextBoxWrapper>
        {isNew && <NewBadge ref={badgeRef} />}
      </Button>
    </Container>
  );
}

export default forwardRef(MenuItem);
