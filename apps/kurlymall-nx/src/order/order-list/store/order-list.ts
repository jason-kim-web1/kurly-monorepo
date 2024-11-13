import { createSlice } from '@reduxjs/toolkit';

import { MouseEvent } from 'react';

import { TabList } from '../../../shared/components/KPDS/Tab';
import { DATE_FILTER_OPTION } from '../constants/order-list';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectOrderHistoryPeriodSubTab } from '../../../shared/amplitude/events/mypage/SelectOrderHistoryPeriodSubTab';

import { AppThunk } from '../../../shared/store';
import { SESSION_STORAGE_KEY, storeSessionStorage } from '../../../shared/services/session.storage.service';
import { RestoreOrderList } from '../interface/Restoration';

export interface OrderListState {
  dateTabState: TabList[];
  activeDate: {
    name: string;
    value: string;
  };
}

export const initialState: OrderListState = {
  dateTabState: DATE_FILTER_OPTION,
  activeDate: {
    name: DATE_FILTER_OPTION.find((tab) => tab.isActive)?.tabName ?? '',
    value: DATE_FILTER_OPTION.find((tab) => tab.isActive)?.value ?? '',
  },
};

const { actions, reducer } = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    setActiveDate: (
      state,
      { payload: { tabState, name, value } }: { payload: { tabState: TabList[]; name: string; value: string } },
    ) => {
      state.dateTabState = tabState;
      state.activeDate.name = name;
      state.activeDate.value = value;
    },
    setInitialTabState: (state) => {
      state.activeDate = initialState.activeDate;
      state.dateTabState = initialState.dateTabState;
    },
  },
});

export const { setInitialTabState, setActiveDate } = actions;

export const changeDateTab =
  ({ date, clickTabEvent }: { date?: string; clickTabEvent?: MouseEvent<HTMLButtonElement> }): AppThunk =>
  async (dispatch, getState) => {
    const {
      orderList: { dateTabState },
    } = getState();

    if (!date) {
      return;
    }

    const newState = dateTabState.map((tab) => ({ ...tab, isActive: tab.value === date }));
    const tabName = newState.find((tab) => tab.isActive)?.tabName;

    if (!newState || !tabName) {
      return;
    }

    dispatch(setActiveDate({ tabState: newState, name: tabName, value: date }));

    if (clickTabEvent) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      storeSessionStorage<RestoreOrderList>(SESSION_STORAGE_KEY.ORDER_LIST_RESTORATION, {
        activeDate: date,
      });

      amplitudeService.logEvent(new SelectOrderHistoryPeriodSubTab({ selectionValue: tabName }));
    }
  };

export default reducer;
