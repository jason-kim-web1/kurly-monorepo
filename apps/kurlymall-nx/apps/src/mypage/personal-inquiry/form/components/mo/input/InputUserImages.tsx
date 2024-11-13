import { css } from '@emotion/react';

import styled from '@emotion/styled';

import InputUserPhoto from '../../shared/input/photo/InputUserPhoto';
import { UserInquiryContentImageData } from '../../../../list/types';
import { UserImageNotices } from '../../shared/constants';

const photoContainerStyle = css`
  gap: 1.5vw;
  > div {
    height: 21vw;
    width: 21vw;
  }
`;

const DescriptionWrap = styled.div`
  margin-top: 0.9rem;
  line-height: 1.58;
  font-size: 0.75rem;
  color: #999999;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
`;

const DescriptionDotIcon = styled.span`
  :before {
    content: '•';
    margin: 0 0.25rem;
  }
`;

interface Props {
  draftId: number;
  userImages: UserInquiryContentImageData[];
  descriptions?: string[];
}

export default function InputUserImages({ userImages, draftId, descriptions = [] }: Props) {
  return (
    <InputUserPhoto
      draftId={draftId}
      images={userImages.map((it) => ({
        id: it.id.toString(),
        attachmentId: it.id,
        url: it.imageUrl,
      }))}
      photoContainerStyle={photoContainerStyle}
    >
      <DescriptionWrap>
        {UserImageNotices.map((notice) => (
          <Description key={notice}>
            <DescriptionDotIcon />
            {notice}
          </Description>
        ))}
        {descriptions.map((description) => (
          <Description key={description}>
            <DescriptionDotIcon />
            {description}
          </Description>
        ))}
      </DescriptionWrap>
    </InputUserPhoto>
  );
}
