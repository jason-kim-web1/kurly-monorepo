import FormInputRow from './FormInputRow';
import InputBox from '../../../../../../shared/components/Input/InputBox';

interface Props {
  onChange(e: any): void;
  subject?: string;
}

export default function InputSubject({ subject, onChange }: Props) {
  const handleChange = ({ name, value }: { name: string; value: any }) => {
    onChange({
      target: {
        type: 'text',
        value,
        name,
      },
    });
  };

  return (
    <FormInputRow label="제목" id="inquiry-subject" required>
      <InputBox
        type="text"
        placeholder="제목을 입력해주세요"
        value={subject}
        id="inquiry-subject"
        name="subject"
        maxLength={100}
        height={44}
        css={{
          padding: 0,
          input: {
            fontSize: 14,
          },
        }}
        onChange={handleChange}
      />
    </FormInputRow>
  );
}
