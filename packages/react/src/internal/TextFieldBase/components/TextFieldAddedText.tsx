import { TextFieldProps } from '@/internal/TextFieldBase';
import { TextFieldStyles } from '@thefarmersfront/kpds-css';
import { Typography } from '@/components/Typography';

export const TextFieldAddedText = ({ errorText, infoText }: Pick<TextFieldProps, 'errorText' | 'infoText'>) => {
  if (!errorText && !infoText) {
    return null;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <ul className={TextFieldStyles.addedTextUL}>
        {errorText ? <TextFieldStateText errorText={errorText} /> : <TextFieldInfoText infoText={infoText} />}
      </ul>
    </div>
  );
};

const TextFieldStateText = ({ errorText }: Pick<TextFieldProps, 'errorText'>) => {
  if (!errorText) {
    return null;
  }

  return (
    <>
      {errorText.map(({ isError, text }) => (
        <li key={text} className={TextFieldStyles.errorText({ error: isError })}>
          <Typography variant={'$smallRegular'}>{text}</Typography>
        </li>
      ))}
    </>
  );
};

const TextFieldInfoText = ({ infoText }: Pick<TextFieldProps, 'infoText'>) => {
  if (!infoText) {
    return null;
  }

  const { isDot, text } = infoText;
  return (
    <>
      {text.map((text) => (
        <li key={text} className={TextFieldStyles.infoText({ dot: isDot })}>
          {isDot && <span className={TextFieldStyles.infoTextDot} />}
          <Typography variant={'$smallRegular'}>{text}</Typography>
        </li>
      ))}
    </>
  );
};
