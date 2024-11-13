import styled from '@emotion/styled';

import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { motion } from 'framer-motion';

import { isEmpty } from 'lodash';

import { vars } from '@thefarmersfront/kpds-css';

import { PrimaryCategory } from '../../../../shared/reducers/category';
import MenuItem from './MenuItem';
import { useAppSelector } from '../../../../shared/store';
import { CategoryMenuImperativeRef, ScrollToFn } from '../../../types';
import { isNotEmpty } from '../../../../shared/utils/lodash-extends';
import { logPrimaryCategoryItem } from '../../../amplitude/events';
import useScrollOnceToCode from '../../../hooks/useScrollOnceToCode';

interface Props {
  currentCode: string | null;
  categories: Pick<PrimaryCategory, 'name' | 'code' | 'isNew'>[];
  handleChangePrimaryMenu: (code: string) => void;
  height: number;
  stickyTop: number;
}

const Container = styled.ul<{ height: number; stickyTop: number }>`
  position: sticky;
  top: ${({ stickyTop }) => stickyTop}px;
  height: ${({ height }) => height}px;
  padding: ${vars.spacing.$12} ${vars.spacing.$8};
  ${({ height }) => `height: ${height}px;`}
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const Highlight = styled(motion.span)`
  position: absolute;
  width: calc(100% - 1rem);
  left: 0.5rem;
  background-color: ${vars.color.background.$background1};
  transition: height 0.2s ease-out;
  border-radius: 0.625rem;
`;

export default forwardRef(function PrimaryMenu(
  { categories, currentCode, handleChangePrimaryMenu, height, stickyTop }: Props,
  ref: ForwardedRef<CategoryMenuImperativeRef>,
) {
  const site = useAppSelector(({ main }) => main.site);
  const [highlightProps, setHighlightProps] = useState<{
    top: number;
    height: number;
  }>();

  const refs = useRef<HTMLLIElement[]>([]);

  const currentSelectedCode = useMemo(() => {
    if (isEmpty(categories)) return null;
    return currentCode || categories[0].code || null;
  }, [currentCode, categories]);

  const handleClickCategory = (code: string, name: string) => {
    if (currentCode === code) return;
    logPrimaryCategoryItem({ code, name });
    handleChangePrimaryMenu(code);
  };

  const scrollRef = useRef<HTMLUListElement>(null);

  const scrollToCode: ScrollToFn = useCallback(
    (code, behavior) => {
      if (!scrollRef.current) return;

      const index = Math.max(
        categories.findIndex((o) => o.code === code),
        0,
      );
      const targetElement: HTMLLIElement | undefined = refs.current[index];

      if (targetElement) {
        scrollRef.current.scrollTo({
          top: targetElement.offsetTop - (scrollRef.current.offsetHeight - targetElement.offsetHeight) / 2,
          behavior,
        });
      }
    },
    [categories],
  );

  useScrollOnceToCode(
    currentSelectedCode ?? '',
    () => {
      if (!currentSelectedCode) return;
      scrollToCode(currentSelectedCode, 'auto', 300);
    },
    site,
    isNotEmpty(categories),
  );

  useImperativeHandle(
    ref,
    () => ({
      scrollToCode,
    }),
    [scrollToCode],
  );

  useEffect(() => {
    const index = categories.findIndex(({ code }) => code === currentSelectedCode);
    const target: HTMLLIElement | undefined = refs.current[index];
    if (!target) return;

    setHighlightProps({ top: target?.offsetTop || 0, height: target?.offsetHeight });
  }, [categories, currentSelectedCode, handleChangePrimaryMenu]);

  return (
    <Container ref={scrollRef} height={height} stickyTop={stickyTop}>
      {categories.map(({ code, name, isNew }, index) => (
        <MenuItem
          ref={(el) => el && (refs.current[index] = el)}
          key={`${code}-${index}`}
          onClick={() => handleClickCategory(code, name)}
          name={name}
          isSelected={code === currentSelectedCode}
          isNew={isNew}
        />
      ))}

      {highlightProps && (
        <Highlight
          animate={{
            ...highlightProps,
            transition: {
              duration: 0,
            },
          }}
        />
      )}
    </Container>
  );
});
