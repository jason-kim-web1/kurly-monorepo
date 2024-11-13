import { createSlice } from '@reduxjs/toolkit';

import { Dispatch } from 'redux';

import { AppState } from '../../shared/store';
import { getFaqList } from '../../board/board.service';
import { FAQ_TYPE } from '../../shared/api/board/faq';

export interface FaqCategory {
  name: string;
  value: string;
}

interface FaqItem {
  no: number;
  category: string;
  question: string;
  answer: string;
  selected: boolean;
}

export interface FaqState {
  category: FaqCategory;
  faqs: FaqItem[];
  isLoading: boolean;
  error: '';
}

const initialState: FaqState = {
  category: {
    name: 'TOP 공지',
    value: FAQ_TYPE.top,
  },
  faqs: [],
  isLoading: false,
  error: '',
};

const { actions, reducer } = createSlice({
  name: 'FAQ',
  initialState,
  reducers: {
    setFaqs: (state, { payload: faqs }) => ({ ...state, faqs }),
    toggleFaqSelected: (state, { payload: targetFaq }) => ({
      ...state,
      faqs: state.faqs.map((it) => ({ ...it, selected: it.no === targetFaq ? !it.selected : false })),
    }),
    setCategory: (state, { payload: category }) => ({ ...state, category }),
    loading: (state) => ({ ...state, isLoading: true }),
    done: (state) => ({ ...state, isLoading: false }),
    setError: (state, { payload: error }) => ({ ...state, error }),
    clearError: (state) => ({ ...state, error: '' }),
  },
});

export const { setFaqs, setCategory, loading, done, clearError, setError } = actions;

export const loadFaqs = () => async (dispatch: Dispatch<any>, getState: () => AppState) => {
  const { faq }: AppState = getState();
  const { category } = faq;

  dispatch(loading());
  try {
    const { data } = await getFaqList({ page: 0, size: 1000, type: category?.value ?? FAQ_TYPE.all });
    dispatch(setFaqs(data.map((it) => ({ ...it, selected: false } as FaqItem))));
  } catch (err) {
    dispatch(setError(err.message));
  }
  dispatch(done());
};

export default reducer;

export const { toggleFaqSelected } = actions;
