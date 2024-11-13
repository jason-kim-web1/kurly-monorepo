import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.ul`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  margin-bottom: 12px;
  background-color: ${COLOR.kurlyWhite};

  &::-webkit-scrollbar {
    display: none;
  }

  li:first-of-type {
    margin-left: 16px;
  }

  li:last-of-type {
    margin-right: 16px;
  }
`;

const ButtonWrapper = styled.li<{ selected: boolean }>`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  align-items: center;
  height: 32px;
  font-size: 14px;
  line-height: 18px;
  background-color: ${({ selected }) => (selected ? COLOR.benefitGray : COLOR.kurlyWhite)};
  border: 1px solid ${({ selected }) => (selected ? COLOR.benefitGray : '#ebeff3')};
  border-radius: 100px;
`;

const Button = styled.button<{ selected: boolean }>`
  width: 100%;
  height: 100%;
  padding: 6px 12px;
  display: flex;
  justify-content: center;
  font-weight: ${({ selected }) => (selected ? 600 : 400)};
  color: ${({ selected }) => (selected ? COLOR.kurlyWhite : COLOR.benefitTextGray)};
`;

interface Props {
  collections: { code: string; name: string }[];
  selectedCollection: { code: string; name: string };
  onClickCollection: (code: string, name: string) => () => void;
}

const ChipMenuCollections = ({ collections, selectedCollection, onClickCollection }: Props) => {
  const { code: selectedCollectionCode } = selectedCollection;

  return (
    <Container>
      {collections.map(({ code, name }, index) => (
        <ButtonWrapper
          key={`${code}-${index}`}
          selected={selectedCollectionCode === code}
          onClick={onClickCollection(code, name)}
        >
          <Button selected={selectedCollectionCode === code}>{name}</Button>
        </ButtonWrapper>
      ))}
    </Container>
  );
};

export { ChipMenuCollections };
