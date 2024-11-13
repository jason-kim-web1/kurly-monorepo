import Link from 'next/link';

import styled from '@emotion/styled';

import COLOR from '../../../../../../../../shared/constant/colorset';

import { GroupMemberSubOption } from '../../../../../../types';

const ButtonWrapper = styled.div<{ isSelected: boolean }>`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.isSelected ? COLOR.kurlyPurple : COLOR.kurlyGray200)};
  outline: none;
`;

const Img = styled.img`
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
`;

interface Props {
  member: GroupMemberSubOption;
  isSelected: boolean;
  linkUrl: string;
}

export default function ImageButton({ member, isSelected, linkUrl }: Props) {
  return (
    <Link href={linkUrl} scroll={false}>
      <ButtonWrapper isSelected={isSelected}>
        {member.imageUrl && member.description && <Img src={member.imageUrl} alt={member.description} />}
      </ButtonWrapper>
    </Link>
  );
}
