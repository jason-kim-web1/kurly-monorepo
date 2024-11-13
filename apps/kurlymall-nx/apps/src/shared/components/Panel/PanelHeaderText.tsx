const styles = {
  text: {
    overflow: 'hidden',
    maxWidth: '60%',
    whiteSpace: 'nowrap' as const,
    textOverflow: 'ellipsis',
    fontSize: '14px',
  },
};

interface Props {
  text: string;
}

export default function PanelHeaderText({ text }: Props) {
  return <p css={styles.text}>{text}</p>;
}
