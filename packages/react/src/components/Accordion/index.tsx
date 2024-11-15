import type { PropsWithChildren } from 'react';
import { AccordionStyles } from '@thefarmersfront/kpds-css';
import { AccordionBase } from '@/internal/AccordionBase';

type AccordionProps = PropsWithChildren<{
  value: string[];
  onValueChange: (nextValue: string[]) => void;
}>;

export const Accordion = ({ value, onValueChange, children }: AccordionProps) => {
  return (
    <AccordionBase value={value} onValueChange={onValueChange}>
      {children}
    </AccordionBase>
  );
};

type AccordionItemProps = PropsWithChildren<{
  value: string;
  title: string;
}>;

const AccordionItem = ({ value, children, title }: AccordionItemProps) => (
  <AccordionBase.Item value={value}>
    <AccordionBase.Header className={AccordionStyles.header}>{title}</AccordionBase.Header>
    <AccordionBase.Content>{children}</AccordionBase.Content>
  </AccordionBase.Item>
);

Accordion.Item = AccordionItem;
