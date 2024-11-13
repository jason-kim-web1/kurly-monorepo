import { useState } from 'react';

import styled from '@emotion/styled';

import { head } from 'lodash';

import COLOR from '../../../../../../../shared/constant/colorset';

import useGroupProduct, { OptionListType } from '../../../../../hooks/useGroupProduct';

import { GroupKey, GroupMember, GroupMemberSubOption } from '../../../../../types';

import CalendarTypOptionButton from './CalendarTypOptionButton';
import CalendarOptionModal from './modal/CalendarOptionModal';
import { Option } from './modal/ContentList';
import { amplitudeService } from '../../../../../../../shared/amplitude';
import { SelectContentsGroupOption } from '../../../../../../../shared/amplitude/events/product/SelectContentsGroupOption';
import { useAppSelector } from '../../../../../../../shared/store';
import { ViewGroupOptionSelection } from '../../../../../../../shared/amplitude/events/product/ViewGroupOptionSelection';
import { getFusionQueryId } from '../../../../../shared/utils/productDetailEvent';

const Container = styled.div`
  padding-bottom: 0;
`;

const ReservationContentWrapper = styled.div`
  padding: 24px 16px 24px;
`;

const ContentsTitle = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: ${COLOR.kurlyGray800};
  line-height: 21px;
`;

const ReservationList = styled.div`
  display: flex;
  margin-top: 16px;
  border: 1px solid ${COLOR.kurlyGray200};
  border-radius: 8px;
`;

export interface HandleChangeOptionProps {
  optionsIndex: number;
  option: Option;
  optionPosition: number;
  optionTitle: string;
}

interface Props {
  productNo: number;
  groupKeys: GroupKey[];
  groupMembers: GroupMember[];
  sectionIndex?: number;
}

export default function CalendarContent({ productNo, groupKeys, groupMembers, sectionIndex = 0 }: Props) {
  const { queryId } = useAppSelector(({ productList }) => productList);
  const { contentType, defaultContentId } = useAppSelector(({ productDetail }) => productDetail);

  const [isModalActive, setIsModalActive] = useState(false);
  const [openSectionIndex, setOpenSectionIndex] = useState(sectionIndex);

  const { optionList } = useGroupProduct({ productNo, groupKeys, groupMembers });

  const hasOption = groupKeys.length > 1;

  const sectionTitle = groupKeys.map(({ title }) => title).join('·') + ' 선택';

  const onClickOpenModalWithSection = (index: number) => {
    if (isModalActive) {
      return;
    }

    setIsModalActive(true);
    setOpenSectionIndex(index);
    amplitudeService.logEvent(
      new ViewGroupOptionSelection({
        fusionQueryId: getFusionQueryId(queryId),
      }),
    );
  };

  const onClickCloseModal = () => {
    setIsModalActive(false);
  };

  const handleClickOpenSection = (index: number) => {
    setOpenSectionIndex(index);
  };

  const [optionListState, setOptionListState] = useState(optionList);

  const findBeforeSelectedSubOption = (options: GroupMemberSubOption[]) => {
    if (!optionListState[1]) {
      return null;
    }

    return options.find((sub) => sub.description === optionListState[1].selectedOption.description);
  };

  const handleChangeOption = ({ optionsIndex, option, optionPosition, optionTitle }: HandleChangeOptionProps) => {
    const beforeSubOption = option.value.subOptions
      ? findBeforeSelectedSubOption(option.value.subOptions) ?? head(option.value.subOptions)
      : null;

    const updatedOptionList = optionListState.map((it, i) =>
      i === optionsIndex
        ? {
            ...it,
            selectedOption: {
              ...option,
              description: option.description ?? '',
            },
          }
        : {
            ...it,
            selectedOption: {
              ...it.selectedOption,
              ...beforeSubOption,
            },
            options: option.value.subOptions ? option.value.subOptions : it.options,
          },
    ) as OptionListType[];

    setOptionListState(updatedOptionList);

    amplitudeService.logEvent(
      new SelectContentsGroupOption({
        defaultContentId,
        option: {
          description: option.description,
          isSoldOut: option.isSoldOut,
        },
        contentType,
        optionsType: optionTitle,
        optionPosition: optionPosition,
        fusionQueryId: getFusionQueryId(queryId),
      }),
    );
  };

  return (
    <Container>
      <ReservationContentWrapper>
        <ContentsTitle>{sectionTitle}</ContentsTitle>
        <ReservationList>
          {optionList.map((option, index) => (
            <CalendarTypOptionButton
              key={option.title}
              buttonIndex={index}
              isProductOption={index !== 0}
              hasOption={hasOption}
              selectedOption={option.selectedOption.description ?? ''}
              onClickOpenModalWithSection={onClickOpenModalWithSection}
            />
          ))}
        </ReservationList>
      </ReservationContentWrapper>
      <CalendarOptionModal
        open={isModalActive}
        optionListState={optionListState}
        openSectionIndex={openSectionIndex}
        onClickClose={onClickCloseModal}
        handleClickOpenSection={handleClickOpenSection}
        onClickOptionItem={handleChangeOption}
        onClickCloseModal={onClickCloseModal}
      />
    </Container>
  );
}
