import { eq } from 'lodash';

export const checkEmptySearchKeyword = (keyword: string) => eq(keyword.trim(), '');
