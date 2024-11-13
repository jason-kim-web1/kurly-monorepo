import styled from '@emotion/styled';

import { css } from '@emotion/react';

import InputBox from '../../../../shared/components/Input/InputBox';
import Radio from '../../../../shared/components/Input/Radio';
import Button from '../../../../shared/components/Button/Button';
import { Member, LinkForm } from '../../interfaces';

const Form = styled.form`
  padding: 8px 0 12px;
`;

const InputWrap = styled.div`
  margin-bottom: 12px;
`;

const ButtonWrap = styled.div`
  padding-top: 8px;
`;

const Title = styled.p`
  display: inline-block;
  padding-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: #333;
`;

const radio = css`
  padding: 12px 0;
`;

interface Props {
  form: LinkForm;
  members: Member[];
  onChange(params: { name: string; value: string }): void;
  onSubmit(): void;
}

export default function LinkAccountForm({ form, members, onChange, onSubmit }: Props) {
  const handleSubmit = (e: any) => {
    e.preventDefault();

    onSubmit();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputWrap>
        <Title>아이디</Title>
        {members.map(({ number, id }) => (
          <Radio
            key={number}
            css={radio}
            label={id}
            value={number}
            id={`member-${number}`}
            name="memberNo"
            selectedValue={form.memberNo}
            onChange={onChange}
          />
        ))}
      </InputWrap>
      <InputWrap>
        <InputBox
          id="password"
          name="password"
          label="비밀번호"
          type="password"
          value={form.password}
          placeholder="비밀번호를 입력해주세요"
          onChange={onChange}
          maxLength={16}
        />
      </InputWrap>
      <ButtonWrap>
        <Button radius={6} height={48} text="카카오계정 연결하기" type="submit" disabled={!form.password} />
      </ButtonWrap>
    </Form>
  );
}
