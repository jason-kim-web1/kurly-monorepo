import styled from '@emotion/styled';

import COLOR from '../../../shared/constant/colorset';

import { KURLY_NAME } from '../../constants';

import RecruitIcon from '../shared/RecruitIcon';

const MenuText = styled.span`
  display: flex;
  position: relative;

  &.active {
    font-weight: 500;
    color: ${COLOR.kurlyPurple};
  }
`;

const NumberText = styled.span`
  padding-right: 3px;
`;

interface Props {
  activeName: string;
  name: string;
  id: number;
  isExternalLink?: boolean;
}

export default function SelectionMenuText({ activeName, name, id, isExternalLink }: Props) {
  return (
    <MenuText className={activeName === name ? 'active' : ''}>
      {name !== KURLY_NAME && <NumberText>{id}.</NumberText>}
      {name}
      {isExternalLink && <RecruitIcon />}
    </MenuText>
  );
}
