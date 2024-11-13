import styled from '@emotion/styled';

import Button from '../../../../../shared/components/Button/Button';
import COLOR from '../../../../../shared/constant/colorset';
import openNewWindow from '../../../../../shared/utils/open-new-window';
import { ORDER_PATH } from '../../../../../shared/constant';
import usePersonalCustomsCode from '../../../shared/hooks/usePersonalCustomsCode';
import addWindowEventListenerOnMessage from '../../../shared/utils/addWindowEventListenerOnMessage';
import { REFETCH_PERSONAL_CUSTOMS_CODE } from '../../../shared/interfaces/CustomMessageEvent';

const Text = styled.span`
  line-height: 24px;
  color: ${COLOR.kurlyGray600};
`;

const EmptyText = styled.span`
  line-height: 24px;
  color: ${COLOR.invalidRed};
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;

  span {
    font-size: 12px;
    line-height: 28px;
    font-weight: 500;
  }
`;

const EMPTY_MESSAGE = '받는 분의 개인통관고유부호를 입력해주세요.';

const Detail = () => {
  const { hasPCC, personalCustomsCode, refetch } = usePersonalCustomsCode();

  const handleClick = () => {
    addWindowEventListenerOnMessage(REFETCH_PERSONAL_CUSTOMS_CODE, () => {
      refetch();
    });

    openNewWindow({
      url: ORDER_PATH.personalCustomsCodeForm.uri,
      name: 'personal-customs-code-form',
      option: {
        width: 530,
        height: hasPCC ? 630 : 678,
      },
    });
  };

  if (hasPCC) {
    return (
      <>
        <Text>{personalCustomsCode}</Text>
        <ButtonWrapper>
          <Button theme={'tertiary'} text={'수정'} width={60} height={30} radius={3} onClick={handleClick} />
        </ButtonWrapper>
      </>
    );
  }

  return (
    <>
      <EmptyText>{EMPTY_MESSAGE}</EmptyText>
      <ButtonWrapper>
        <Button theme={'secondary'} text={'입력'} width={60} height={30} radius={3} onClick={handleClick} />
      </ButtonWrapper>
    </>
  );
};

export default Detail;
