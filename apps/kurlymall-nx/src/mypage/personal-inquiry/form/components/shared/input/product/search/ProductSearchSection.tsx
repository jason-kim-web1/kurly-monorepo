import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import DateRangeSelector from './DateRangeSelector';
import { modifySearchInfo, OrderProductSearchInfoState } from '../../../../../slice';
import DateIndicators from './DateIndicators';
import { CUSTOM_DATE_SELECTOR_TAB_NUMBER, orderProductSateSelectorTabs } from './OrderProductSearchDateTab';
import KeywordSearchBar, { OrderProductSearchTab } from './KeywordSearchBar';

const Container = styled.div`
  #submit {
    margin-top: 12px;
  }
`;

const DateSelectorContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  'div:last-child': {
    margin: 0,
  },
});

const DateRangeContainer = styled.div`
  > div {
    margin-top: 12px;
    span {
      font-weight: normal;
    }
  }
`;

interface Props {
  searchInfo: OrderProductSearchInfoState;
  displaySearchIcon: boolean;
}

const ProductSearchSection = ({ searchInfo, displaySearchIcon }: Props) => {
  const { dateSelectorTabNumber } = searchInfo;

  const dispatch = useDispatch();

  const setStartDate = (date: string) => dispatch(modifySearchInfo({ startDate: date }));
  const setEndDate = (date: string) => dispatch(modifySearchInfo({ endDate: date }));
  const setTabNumber = (tabNumber: number) => dispatch(modifySearchInfo({ dateSelectorTabNumber: tabNumber }));

  const setSearchPeriod = (tabNumber: number, dates: [string, string]) => () => {
    setTabNumber(tabNumber);
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  return (
    <Container>
      <DateSelectorContainer>
        {orderProductSateSelectorTabs.map((tab, index) => (
          <DateRangeSelector
            key={tab.displayName}
            text={tab.displayName}
            onClick={setSearchPeriod(index, [tab.dates[0], tab.dates[1]])}
            active={dateSelectorTabNumber === index}
          />
        ))}
      </DateSelectorContainer>
      {dateSelectorTabNumber === CUSTOM_DATE_SELECTOR_TAB_NUMBER && (
        <DateRangeContainer>
          <DateIndicators
            startDate={searchInfo.startDate}
            endDate={searchInfo.endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </DateRangeContainer>
      )}
      <KeywordSearchBar
        initialInputValue={searchInfo.orderNo?.toString() ?? searchInfo.keyword ?? ''}
        initialTabNumber={
          searchInfo.orderNo === null ? OrderProductSearchTab.ProductName : OrderProductSearchTab.OrderNumber
        }
        displaySearchIcon={displaySearchIcon}
      />
    </Container>
  );
};

export default ProductSearchSection;
