import styled from '@emotion/styled';

import { useEffect, useRef } from 'react';

import { MdChoicesOption } from '../../../interfaces/MainSection.interface';
import MdOptionList from './MdOptionList';

const Container = styled.div`
  overflow: hidden;
`;

interface Props {
  options: MdChoicesOption[];
  selectedOption?: MdChoicesOption;
  changeOption(code: string): void;
}

export default function MdOptionListContainer({ options, selectedOption, changeOption }: Props) {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const current = listRef.current;

    if (!current || !selectedOption) {
      return;
    }

    const menuItems = Array.from(current.children) as HTMLLIElement[];
    const { width } = current.getBoundingClientRect();

    menuItems.forEach(({ offsetLeft, offsetWidth, id }: { offsetLeft: number; offsetWidth: number; id: string }) => {
      if (id !== selectedOption.code) {
        return;
      }

      current.scrollTo({
        left: offsetLeft - width / 2 + offsetWidth / 2 + 9,
        top: 0,
        behavior: 'smooth',
      });
    });
  }, [listRef, selectedOption]);

  return (
    <Container>
      <MdOptionList listRef={listRef} options={options} selectedOption={selectedOption} changeOption={changeOption} />
    </Container>
  );
}
