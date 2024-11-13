import styled from '@emotion/styled';

const LabelWrap = styled.label({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: 10,
});

const InputContent = styled.div({});

interface Props {
  header: React.ReactNode;
  children: React.ReactNode;
}

export default function InputRowItem({ header, children }: Props) {
  return (
    <LabelWrap>
      {header}
      <InputContent>{children}</InputContent>
    </LabelWrap>
  );
}
