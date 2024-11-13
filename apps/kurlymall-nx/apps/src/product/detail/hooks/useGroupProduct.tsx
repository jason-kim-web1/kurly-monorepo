import { head, isEmpty } from 'lodash';

import { useDispatch } from 'react-redux';

import { GroupKey, GroupMember, GroupMemberSubOption } from '../types';

import { changeProductDetail, startLoading } from '../slice';
import { SelectContentsGroupOption } from '../../../shared/amplitude/events/product/SelectContentsGroupOption';
import { amplitudeService } from '../../../shared/amplitude';
import { useAppSelector } from '../../../shared/store';
import { getFusionQueryId } from '../shared/utils/productDetailEvent';

export interface ChangeOptionItemProps {
  option: GroupMemberSubOption;
  optionPosition: number;
  optionsType: string;
}

export interface SelectedOptionType {
  description: string | null;
  contentsProductNo?: number;
  imageUrl?: string;
  isSoldOut?: boolean;
  isPurchaseStatus?: boolean;
  value?: GroupMemberSubOption;
  prices?: {
    retailPrice: number;
    basePrice: number;
    discountedPrice: number;
    discountedRate: number;
  };
}

export interface OptionListType {
  descriptionType: string;
  options: GroupMemberSubOption[];
  selectedOption: SelectedOptionType;
  title: string;
}

interface Props {
  productNo: number;
  groupKeys: GroupKey[];
  groupMembers: GroupMember[];
}

const EMPTY_SUB_OPTION = {
  description: '',
  contentsProductNo: 0,
  imageUrl: '',
  isSoldOut: false,
  isPurchaseStatus: false,
  prices: {
    retailPrice: 0,
    basePrice: 0,
    discountedPrice: 0,
    discountedRate: 0,
  },
  subOptions: [],
};

const EMPTY_OPTION_LIST = { options: EMPTY_SUB_OPTION };

export default function useGroupProduct({ productNo, groupKeys, groupMembers }: Props) {
  const dispatch = useDispatch();

  const { queryId } = useAppSelector(({ productList }) => productList);
  const { contentType, defaultContentId } = useAppSelector(({ productDetail }) => productDetail);

  const getHeadOptionInFilter = (options: GroupMemberSubOption[], target = 0) => {
    const headOption = options[target] ?? EMPTY_SUB_OPTION;

    if (!headOption) {
      return EMPTY_SUB_OPTION;
    }

    return headOption;
  };

  const getSubOptionsMatedFilter = (subOptions: GroupMemberSubOption[]) => {
    const headSubOptions = head(subOptions);

    if (!headSubOptions) {
      return null;
    }

    return headSubOptions.subOptions;
  };

  const findSelectedOptionContentsNo = (subOptions: GroupMemberSubOption[]) =>
    subOptions.find((subOption) => subOption.contentsProductNo === productNo);

  const findSubOptionMatchedContentsNo = (options: GroupMemberSubOption[]) =>
    options.filter(({ subOptions }) => subOptions && findSelectedOptionContentsNo(subOptions));

  const createOnlyOneOptionLevel = (options: GroupMemberSubOption[]) => {
    const selectedOption = getHeadOptionInFilter(findSubOptionMatchedContentsNo(options), 0);

    if (!selectedOption.subOptions) {
      return EMPTY_OPTION_LIST;
    }

    const foundSelectedOption = findSelectedOptionContentsNo(selectedOption.subOptions);

    return {
      options: options.map((option) => ({
        ...head(option.subOptions),
        description: option.description,
      })),
      selectedOption: {
        ...foundSelectedOption,
        description: selectedOption.description,
      },
    };
  };

  const createFirstOptionLevel = (options: GroupMemberSubOption[]) => {
    const selectedOption = getHeadOptionInFilter(findSubOptionMatchedContentsNo(options), 0);

    if (!selectedOption.subOptions) {
      return EMPTY_OPTION_LIST;
    }

    const foundSelectedOption = findSelectedOptionContentsNo(selectedOption.subOptions);

    return {
      options: options.map((option) => {
        if (!option.subOptions) {
          return;
        }

        const subOptionsLength = option.subOptions.length;
        const isSoldOut = isEmpty(option.subOptions.filter((it) => !it.isSoldOut));
        const isPurchaseStatus = option.subOptions.filter((it) => !it.isPurchaseStatus).length !== subOptionsLength;

        if (option.contentsProductNo === productNo) {
          return {
            ...option,
            contentsProductNo: option.contentsProductNo,
            isSoldOut,
            isPurchaseStatus,
          };
        }

        return {
          ...option,
          isSoldOut,
          isPurchaseStatus,
        };
      }),
      selectedOption: {
        ...foundSelectedOption,
        description: selectedOption.description,
      },
    };
  };

  const createRestOfOptionLevel = (options: GroupMemberSubOption[]) => {
    const subOptions = getSubOptionsMatedFilter(findSubOptionMatchedContentsNo(options));

    if (!subOptions) {
      return [];
    }

    const selectedOption = findSelectedOptionContentsNo(subOptions as GroupMemberSubOption[]);

    return {
      options: subOptions,
      selectedOption,
    };
  };

  const buildOptionListInGroupProduct = (keys: GroupKey[], options: GroupMemberSubOption[]) =>
    keys.map((key, depth) => {
      const isOneLevelOption = options
        .filter((it) => it.subOptions)
        .map((it) => it.subOptions?.some((that) => !that.description))
        .every((it) => it);

      if (isOneLevelOption) {
        return {
          ...key,
          ...createOnlyOneOptionLevel(options),
        };
      }

      if (depth !== 0) {
        return {
          ...key,
          ...createRestOfOptionLevel(options),
        };
      }

      return {
        ...key,
        ...createFirstOptionLevel(options),
      };
    });

  const optionList = buildOptionListInGroupProduct(groupKeys, groupMembers) as OptionListType[];

  const findBeforeSelectedSubOption = (option: GroupMemberSubOption) => {
    if (!option.subOptions) {
      return;
    }

    if (!optionList[1]) {
      return EMPTY_SUB_OPTION;
    }

    return option.subOptions.find((sub) => sub.description === optionList[1].selectedOption?.description);
  };

  const changeOptionItem = ({
    option,
    optionPosition,
    optionsType,
  }: {
    option: GroupMemberSubOption;
    optionPosition: number;
    optionsType: string;
  }) => {
    const targetOption = option.subOptions
      ? findBeforeSelectedSubOption(option) ?? head(option.subOptions) ?? null
      : option;

    if (!targetOption) {
      return;
    }

    const productCode = targetOption.contentsProductNo;

    if (!productCode) {
      throw Error();
    }

    if (productCode === productNo) {
      return;
    }

    dispatch(startLoading());

    amplitudeService.logEvent(
      new SelectContentsGroupOption({
        defaultContentId,
        option,
        contentType,
        optionsType,
        optionPosition,
        fusionQueryId: getFusionQueryId(queryId),
      }),
    );

    dispatch(changeProductDetail(productCode));
  };

  return { optionList, changeOptionItem };
}
