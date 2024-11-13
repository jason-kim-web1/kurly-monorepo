import styled from '@emotion/styled';

const WrappedText = styled.div`
  border: 10px solid orange;
  width: 100%;
  padding: 20px 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

type TextProps = { text?: string };

function SimpleText({ text }: TextProps) {
  if (!text) {
    return null;
  }
  return <WrappedText>{text}</WrappedText>;
}

export default SimpleText;
