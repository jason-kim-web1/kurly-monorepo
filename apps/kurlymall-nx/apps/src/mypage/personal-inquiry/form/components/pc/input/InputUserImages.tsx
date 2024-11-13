import { css } from '@emotion/react';

import styled from '@emotion/styled';

import FormInputRow from './FormInputRow';
import InputUserPhoto from '../../shared/input/photo/InputUserPhoto';
import { UserInquiryContentImageData } from '../../../../list/types';
import { UserImageNotices } from '../../shared/constants';

const Wrapper = styled.div`
  > div {
    padding: 3px 0 0;
  }
`;

const photoContainerStyle = css`
  gap: 9px;
  > div {
    height: 72px;
    width: 72px;
  }
  font-size: 20px !important;
  span {
    font-size: 20px;
  }
`;

const DescriptionWrap = styled.div`
  margin: 11px 0 7px;
  line-height: 16px;
  font-size: 13px;
  color: #999999;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 7px;
`;

const DescriptionDotIcon = styled.span`
  :before {
    content: '•';
    margin-right: 3px;
  }
`;

interface Props {
  userImages: UserInquiryContentImageData[];
  draftId: number;
}

export default function InputUserImages({ userImages, draftId }: Props) {
  return (
    <FormInputRow label="" required={false}>
      <Wrapper>
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
          </DescriptionWrap>
        </InputUserPhoto>
      </Wrapper>
    </FormInputRow>
  );
}
