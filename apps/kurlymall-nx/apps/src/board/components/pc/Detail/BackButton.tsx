import styled from '@emotion/styled';

import Button from '../../../../shared/components/Button/Button';

interface HeaderViewProps {
  buttonText?: string;
  onClick?: () => void;
}

const ActionWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 20px 0;
  justify-content: flex-end;
  span {
    font-size: 13px;
  }
`;

export default function BackButton({ buttonText = '목록', onClick }: HeaderViewProps) {
  return (
    <ActionWrapper>
      <Button text={buttonText} width={150} height={42} radius={0} onClick={onClick} />
    </ActionWrapper>
  );
}
