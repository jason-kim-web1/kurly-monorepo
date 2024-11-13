import { useCallback } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { isPC } from '../../../../../util/window/getDevice';

import COLOR from '../../../../shared/constant/colorset';
import { ButtonTemplate } from '../types/buttonTemplate';

import { Segment, TemplateType } from '../../../../shared/interfaces/MyKurlyStyle';
import ThumbnailImage from '../components/ThumbnailImage';
import { ButtonStyle } from '../enums/ButtonStyle.enum';
import { updateProfileState, resetProfileState } from '../../slice';
import { buttonSize, isSimpleType, makeButtonType } from '../utils/profileButton';
import { MINIMUM_SELECTION } from '../constants/myKurlyStyleText';

export const buttonStyle = {
  [ButtonStyle.BUTTON]: css`
    line-height: 1.25;
    border-radius: 4px;
  `,
  [ButtonStyle.IMAGE_BUTTON]: css`
    padding: 20px 0;
    min-height: 179px;
  `,
  [ButtonStyle.BUTTON_DESCRIPTION]: css`
    grid-column: auto / span 2;
    padding: 20px;
    font-size: 18px;
    line-height: 22px;
    text-align: left;
    font-weight: 500;
    ${!isPC &&
    css`
      font-weight: 600;
      font-size: 16px;
    `},
  `,
  [ButtonStyle.IMAGE_BUTTON_DESCRIPTION]: css`
    grid-column: auto / span 2;
    display: flex;
    align-items: center;
    padding: 20px;
    font-size: 18px;
    line-height: 22px;
    text-align: left;
    font-weight: 500;
    ${!isPC &&
    css`
      font-weight: 600;
      font-size: 16px;
    `},
  `,

  [ButtonStyle.BUTTON_TAG]: css`
    ${isPC
      ? css`
          line-height: 50px;
          border-radius: 4px;
        `
      : css`
          padding: 0 12px;
          font-weight: 400;
          font-size: 14px;
          line-height: 36px;
          height: 36px;
        `};
  `,
};

const Wrapper = styled.div<{ templateType: ButtonTemplate }>`
  display: grid;
  column-gap: 10px;
  row-gap: 10px;
  grid-template-columns: repeat(4, 1fr);

  ${!isPC &&
  css`
    grid-template-columns: repeat(2, 1fr);
  `}

  ${({ templateType }) =>
    !isPC &&
    templateType === 'BUTTON_TAG' &&
    css`
      display: flex;
      flex-wrap: wrap;
    `}

  ${({ templateType }) =>
    templateType === 'BUTTON' &&
    css`
      display: flex;
      flex-wrap: wrap;
    `}

  ${({ templateType }) =>
    templateType === 'BUTTON_TAG' &&
    css`
      row-gap: 14px;
    `}
`;

const Input = styled.input`
  overflow: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
`;

const Label = styled.label<{ templateType: ButtonTemplate; selected: boolean; size: string }>`
  border: 1px solid ${COLOR.kurlyGray200};
  background-color: ${COLOR.kurlyWhite};
  border-radius: 6px;
  font-size: 16px;
  text-align: center;
  cursor: pointer;

  ${({ templateType, size }) =>
    templateType === 'BUTTON' &&
    css`
      width: calc(${size} - 10px);
      > div {
        padding: 15px 10px;
      }
    `}

  ${({ templateType }) => buttonStyle[templateType as ButtonStyle]};

  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid ${COLOR.kurlyPurple};
    `}

  ${({ selected, templateType }) =>
    selected &&
    (templateType === ButtonStyle.BUTTON || templateType === ButtonStyle.BUTTON_TAG) &&
    css`
      font-weight: 600;
    `}

  ${({ selected, templateType }) =>
    isPC &&
    selected &&
    (templateType === ButtonStyle.BUTTON || templateType === ButtonStyle.BUTTON_TAG) &&
    css`
      font-weight: 500;
    `}
`;

const TextWrapper = styled.div<{ selected: boolean }>`
  ${({ selected }) =>
    selected &&
    css`
      color: ${COLOR.kurlyPurple};
    `}
`;

const Description = styled.div<{ selected: boolean }>`
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
  font-weight: 400;
  color: ${({ selected }) => (selected ? COLOR.kurlyPurple : COLOR.kurlyGray600)};
`;

interface Props {
  profileId: string;
  segments: Segment[];
  categoryId: string;
  hasProfile: boolean;
  templateTypes: TemplateType;
  max: number;
}

export default function ProfileButton({ profileId, segments, categoryId, hasProfile, templateTypes, max }: Props) {
  const dispatch = useDispatch();

  const onChangeInput = useCallback(
    (segmentId: string, selected: boolean) => {
      if (max === MINIMUM_SELECTION) {
        dispatch(resetProfileState({ categoryId }));
      }
      dispatch(updateProfileState({ segmentId, selected }));
    },
    [dispatch, max, categoryId],
  );

  const templateType = makeButtonType({ templateTypes, hasProfile });

  const simpleTypeButton = isSimpleType(templateType);

  return (
    <Wrapper templateType={templateType}>
      {segments.map(({ id, thumbnailImages, name, description, selected }) => (
        <Label
          key={id}
          htmlFor={`${profileId}${id}`}
          templateType={templateType}
          selected={selected}
          size={buttonSize(name.length)}
        >
          {!simpleTypeButton && thumbnailImages && (
            <ThumbnailImage templateType={templateType} thumbnailImages={thumbnailImages} />
          )}
          <TextWrapper selected={selected}>
            {name}
            {!simpleTypeButton && <Description selected={selected}>{description}</Description>}
          </TextWrapper>
          <Input
            type="checkbox"
            id={`${profileId}${id}`}
            name={`${profileId}${categoryId}`}
            value={`${profileId}${id}`}
            checked={selected}
            onChange={() => onChangeInput(id, selected)}
          />
        </Label>
      ))}
    </Wrapper>
  );
}
