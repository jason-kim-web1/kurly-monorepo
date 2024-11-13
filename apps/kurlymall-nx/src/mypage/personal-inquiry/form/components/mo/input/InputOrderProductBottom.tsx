import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  padding: 0.5rem 0.75rem;
  height: 115px;
`;

const Button = styled.button<{ active: boolean }>`
  height: 3.25rem;
  background-color: ${({ active }) => (active ? '#5f0080' : '#dddddd')};
  width: 100%;
  border: 0;
  border-radius: 6px;
  font-size: 1rem;
`;

const Text = styled.span({
  color: 'white',
});

interface Props {
  onClick(): void;
  active: boolean;
}

const InputOrderProductBottom = ({ active, onClick }: Props) => (
  <Container>
    <Button type="button" active={active} onClick={onClick}>
      <Text>상품 선택 완료</Text>
    </Button>
  </Container>
);

export default InputOrderProductBottom;
