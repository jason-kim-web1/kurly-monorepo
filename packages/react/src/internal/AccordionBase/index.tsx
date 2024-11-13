import { createContext, useContext, PropsWithChildren } from 'react';
import { AccordionBaseStyles } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';

// TODO: KPDS 스타일 제외한 기본 스타일 추가
// TODO: Minimal ARIA Support https://www.w3.org/WAI/ARIA/apg/patterns/accordion/examples/accordion/
export interface AccordionBaseContext {
  value: string[];
  checkIsOpen(nextValue: string): boolean;
  onChangeValue(nextValue: string): void;
}

const initialContextState: AccordionBaseContext = {
  value: [],
  checkIsOpen: () => false,
  onChangeValue: (nextValue) => {},
};

const AccordionBaseContext = createContext<AccordionBaseContext>(initialContextState);

type AccordionBaseProps = PropsWithChildren<{
  value: string[];
  onValueChange: (nextValue: string[]) => void;
}>;

export const AccordionBase = ({ children, value, onValueChange }: AccordionBaseProps) => {
  // TODO: 내부 데이터 구조 필요 여부 논의 필요
  const checkIsOpen = (nextValue: string) => value.filter((item) => nextValue === item).length > 0;

  const onChangeValue: AccordionBaseContext['onChangeValue'] = (nextValue) => {
    const isPrevOpen = checkIsOpen(nextValue);
    if (isPrevOpen) {
      onValueChange(value.filter((item) => item !== nextValue));
      return;
    }
    onValueChange([...value, nextValue]);
  };

  return (
    <AccordionBaseContext.Provider value={{ value, onChangeValue, checkIsOpen }}>
      {children}
    </AccordionBaseContext.Provider>
  );
};

interface AccordionBaseItemContext {
  isOpen: boolean;
  value: string;
}

const initialAccordionBaseItemContext: AccordionBaseItemContext = {
  isOpen: false,
  value: '',
};

const AccordionBaseItemContext = createContext(initialAccordionBaseItemContext);

type AccordionBaseItemProps = PropsWithChildren<{
  className?: string;
  value: string;
}>;

const AccordionBaseItem = ({ children, className, value }: PropsWithChildren<AccordionBaseItemProps>) => {
  const { checkIsOpen } = useContext(AccordionBaseContext);
  const isOpen = checkIsOpen(value);
  return (
    <AccordionBaseItemContext.Provider value={{ isOpen, value }}>
      <div className={clsx(AccordionBaseStyles.item, className)}>{children}</div>
    </AccordionBaseItemContext.Provider>
  );
};

type AccordionBaseHeaderProps = {
  className?: string;
};

// TODO: 아이콘 처리
const AccordionBaseHeader = ({ children, className }: PropsWithChildren<AccordionBaseHeaderProps>) => {
  const { onChangeValue } = useContext(AccordionBaseContext);
  const { isOpen, value } = useContext(AccordionBaseItemContext);
  const handleClickTrigger = () => onChangeValue(value);
  return (
    <h3 className={clsx(AccordionBaseStyles.header, className)}>
      <button type="button" onClick={handleClickTrigger}>
        <span>{children}</span>
        <span className={AccordionBaseStyles.headerIconVariants({ open: isOpen })}>
          아이콘 {isOpen ? '열림' : '닫힘'}
        </span>
      </button>
    </h3>
  );
};

type AccordionBaseContentProps = {
  className?: string;
};

// TODO: 애니메이션 처리
const AccordionContent = ({ className, children }: PropsWithChildren<AccordionBaseContentProps>) => {
  const { isOpen } = useContext(AccordionBaseItemContext);
  return isOpen ? <div className={className}>{children}</div> : null;
};

AccordionBase.Item = AccordionBaseItem;
AccordionBase.Header = AccordionBaseHeader;
AccordionBase.Content = AccordionContent;

export type { AccordionBaseItemProps, AccordionBaseHeaderProps, AccordionBaseContentProps };
