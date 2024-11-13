import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../../../../../../shared/constant/colorset';

import { GroupMemberSubOption } from '../../../../../../types';

const ButtonWrapper = styled.div<{ isSelected: boolean }>`
  min-width: 60px;
  padding: 9px 14px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isSelected ? COLOR.kurlyPurple : COLOR.kurlyGray200)};
  outline: none;
`;

const Text = styled.span<{ isSelected: boolean }>`
  font-size: 13px;
  font-weight: ${(props) => (props.isSelected ? 500 : 400)};
  color: ${(props) => (props.isSelected ? COLOR.kurlyPurple : COLOR.kurlyGray800)};
  line-height: 1.38;
`;

interface Props {
  member: GroupMemberSubOption;
  isSelected: boolean;
  linkUrl: string;
}

export default function TextButton({ member, isSelected, linkUrl }: Props) {
  return (
    <Link href={linkUrl} scroll={false}>
      <ButtonWrapper isSelected={isSelected}>
        <Text isSelected={isSelected}>{member.description}</Text>
      </ButtonWrapper>
    </Link>
  );
}
