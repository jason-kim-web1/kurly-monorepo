import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import useEMoneyListQuery from '../../../hooks/pc/useEMoneyListQuery';

import ListItem from '../../../components/pc/ListItem';
import Empty from '../../../components/pc/List/Empty';
import Error from '../../../components/pc/List/Error';
import Pending from '../../../components/pc/List/Pending';
import ListHeader from '../../../components/pc/ListHeader';
import PaginationContainer from '../../../containers/pc/PaginationContainer';

const Container = styled.ul`
  list-style: none;
`;

const ListContainer = () => {
  const { data, isError, isSuccess, queryKey } = useEMoneyListQuery();

  const renderValidList = () => (
    <Container>
      {data?.data.emoneyLists.map((item, index) => {
        const { detail, point, regDate, expireDate } = item;
        return (
          <ListItem
            key={`emoney-${queryKey.join('')}-${index}`}
            point={point}
            detail={detail}
            regDate={regDate}
            expireDate={expireDate}
          />
        );
      })}
    </Container>
  );

  const renderList = () => {
    if (isError) {
      return <Error />;
    }
    if (isSuccess) {
      if (isEmpty(data?.data.emoneyLists)) {
        return <Empty />;
      }
      return renderValidList();
    }
    return <Pending />;
  };

  return (
    <section>
      <ListHeader />
      {renderList()}
      <PaginationContainer />
    </section>
  );
};

export default ListContainer;
