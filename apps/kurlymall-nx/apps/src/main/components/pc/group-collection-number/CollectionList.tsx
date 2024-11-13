import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

const Container = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: 34px 0 20px 0;
`;

const Button = styled.button`
  display: block;
  padding: 10px 20px;
  border-radius: 22px;
  margin: 0 5px 20px 5px;
  font-size: 14px;
  height: 40px;
  line-height: 16px;
  background-color: ${COLOR.bgLightGray};
  color: ${COLOR.kurlyGray800};

  &:hover {
    background-color: #f7f3f8;
    color: ${COLOR.kurlyPurple};
  }

  &.selected {
    background-color: ${COLOR.kurlyPurple};
    color: ${COLOR.kurlyWhite};
  }
`;

interface Props {
  collections: { code: string; name: string }[];
  selectedCollection?: { code: string; name: string };
  onClickCollection: (code: string, name: string) => () => void;
}

const CollectionList = ({ collections, selectedCollection, onClickCollection }: Props) => {
  return (
    <Container>
      {collections.map(({ code, name }) => (
        <li key={code}>
          <Button
            type="button"
            onClick={onClickCollection(code, name)}
            className={code === selectedCollection?.code ? 'selected' : ''}
          >
            {name}
          </Button>
        </li>
      ))}
    </Container>
  );
};

export { CollectionList };
