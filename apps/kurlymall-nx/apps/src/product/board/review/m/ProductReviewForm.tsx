import * as React from 'react';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import MessageTextArea from '../../../../shared/components/Message/MessageTextArea';
import InputUserImages from '../../../../mypage/personal-inquiry/form/components/mo/input/InputUserImages';

const descriptions = [
  '동일한 상품의 후기는 월 1회만 적립됩니다.',
  '업로드 후기 및 사진을 컬리가 공개하고, 마케팅을 목적으로 컬리의 모든 서비스와 SNS 등 외부채널에서 사용 (일부 편집 포함)하는 것에 동의합니다.',
];

const Form = styled.form`
  position: relative;
  padding: 20px;
`;

const ReviewGuideButton = styled.button`
  position: absolute;
  right: 20px;
  display: flex;
  line-height: 19px;
  color: ${COLOR.kurlyGray450};
  &:after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    background: url('https://res.kurly.com/mobile/ico/2010/ico_question_v2.svg') 50% 50% no-repeat;
    background-size: 20px 20px;
  }
`;

const Label = styled.label`
  display: inline-block;
  font-weight: 600;
  line-height: 19px;
  :after {
    content: '*';
    color: ${COLOR.pointText};
  }
`;

const TextArea = styled(MessageTextArea)`
  width: 100%;
  margin: 16px 0;
  color: ${COLOR.kurlyGray800};
  > div {
    height: 144px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 52px;
  border-radius: 6px;
  margin-top: 30px;
  font-size: 16px;
  color: ${COLOR.kurlyWhite};
  background-color: ${COLOR.kurlyPurple};
  &[disabled] {
    background-color: ${COLOR.lightGray};
  }
`;

export default function ProductReviewForm() {
  const [value, setValue] = React.useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ReviewGuideButton type="button">작성 시 유의사항</ReviewGuideButton>
      <div>
        <Label htmlFor="contents">자세한 후기를 들려주세요.</Label>
        <TextArea
          id="contents"
          name="contents"
          placeholder="최소 10자 이상 적어주세요."
          value={value}
          onChange={(newValue) => setValue(newValue)}
          maxLength={5000}
        />
      </div>
      <InputUserImages userImages={[]} draftId={1} descriptions={descriptions} />
      <SubmitButton type="submit" disabled={value.length < 10}>
        등록하기
      </SubmitButton>
    </Form>
  );
}
