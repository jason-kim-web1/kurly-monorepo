import styled from '@emotion/styled';
import { times } from 'lodash';
import Skeleton from 'react-loading-skeleton';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`
  width: 100%;
  background-color: white;
  margin-bottom: 0.5rem;
  padding: 0 1.25rem;
  display: flex;
  flex-direction: row;
  height: 3rem;
  align-items: center;
`;

const Date = styled.div`
  margin-left: 2rem;
  width: 5rem;
`;

const Number = styled.div`
  margin-left: 0.5rem;
  width: 10rem;
`;

interface Props {
  count: number;
}

export default function OrderProductPickerLoading({ count }: Props) {
  return (
    <Container>
      {times(count, (num) => (
        <Item key={num}>
          <Date>
            <Skeleton />
          </Date>
          <Number>
            <Skeleton />
          </Number>
        </Item>
      ))}
    </Container>
  );
}
