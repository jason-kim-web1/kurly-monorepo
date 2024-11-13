import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100px;
  background-color: violet;
  border: none;
  border-radius: 3px;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.43;
  word-break: break-all;
  background-color: transparent;
  color: purple;
  resize: none;
  border: none;
`;

const Tag = styled.span`
  padding: 0 16px 10px;
  text-align: right;
`;

interface Props {
  value: string;
  tag?: string;
}

export default function ReceiveMessageArea({ value, tag }: Props) {
  return (
    <Wrapper>
      <Textarea value={value} readOnly />
      {tag && <Tag>{tag}</Tag>}
    </Wrapper>
  );
}
