import { css } from '@emotion/react';

import { Dispatch, SetStateAction } from 'react';

import styled from '@emotion/styled';

import SimpleDialog from '../../../../shared/components/Dialog/SimpleDialog';
import DialogFilter from '../components/DialogFilter';

import type { UrlBasedFilter } from '../../shared/util/parseFilterData';
import type { FilterGroup } from '../../types';
import type { SortType } from '../components/FilterGroupItem';

const dialogInnerStyle = css`
  overflow: hidden;
  max-width: 780px;
  min-width: 780px;
  min-height: 540px;
  max-height: 540px;
  margin: 0;
  border-radius: 12px;
  box-shadow: none;
  padding: 0 23.5px 24px 30px;
`;

const WrapperSimpleDialog = styled(SimpleDialog)`
  min-width: 1050px;
`;

interface Props {
  open: boolean;
  filterData: FilterGroup;
  activeFilter: UrlBasedFilter;
  defaultSortType: SortType;
  onChangeSortType: (sort: SortType) => void;
  onDialogFilter(): void;
  groupByInitialCharacter: Map<string, string[]>;
  navigatorKey: { key: string };
  onNavigatorKey: Dispatch<SetStateAction<{ key: string }>>;
}

export default function FilterSelectPopup({
  open,
  filterData,
  activeFilter,
  defaultSortType,
  onChangeSortType,
  onDialogFilter,
  groupByInitialCharacter,
  navigatorKey,
  onNavigatorKey,
}: Props) {
  const voidFunction = () => {};

  return (
    <WrapperSimpleDialog
      dialogStyle={dialogInnerStyle}
      open={open}
      onHandleClose={voidFunction}
      disableEscapeKeyDown
      onBackdropClick={onDialogFilter}
    >
      <DialogFilter
        filterData={filterData}
        activeFilter={activeFilter}
        defaultSortType={defaultSortType}
        onChangeSortType={onChangeSortType}
        onClose={onDialogFilter}
        groupByInitialCharacter={groupByInitialCharacter}
        navigatorKey={navigatorKey.key}
        onNavigatorKey={onNavigatorKey}
      />
    </WrapperSimpleDialog>
  );
}
