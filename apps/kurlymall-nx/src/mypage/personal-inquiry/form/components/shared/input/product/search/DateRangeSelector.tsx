import styled from '@emotion/styled';

const Container = styled.div({
  width: '100%',
  height: '2.5rem',
  margin: '0 0.375rem 0 0',
  borderRadius: 3,
  border: 'solid 1px rgba(221, 221, 221, 0.5)',
  fontSize: '0.875rem',
  color: '#666666',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&.active': {
    border: 'solid 1px #5f0080',
    color: '#5f0080',
    fontWeight: 500,
  },
});

interface Props {
  text: string;
  onClick(): void;
  active: boolean;
}

export default function DateRangeSelector({ text, onClick, active }: Props) {
  return (
    <Container data-testid="date-selector" onClick={onClick} className={active ? 'active' : ''}>
      <span data-testid="date-selector-text">{text}</span>
    </Container>
  );
}
