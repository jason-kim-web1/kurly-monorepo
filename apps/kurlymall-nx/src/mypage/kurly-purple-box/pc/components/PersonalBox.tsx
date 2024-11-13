import styled from '@emotion/styled';
import { useCallback, useState } from 'react';

import { useDispatch } from 'react-redux';

import { isEmpty } from 'lodash';

import { css } from '@emotion/react';

import { useQueryClient } from '@tanstack/react-query';

import { redirectToLogin } from '../../../../shared/reducers/page';

import Alert from '../../../../shared/components/Alert/Alert';
import { useAppSelector } from '../../../../shared/store';
import FormContainer from '../containers/FormContainer';

import { ERROR_MESSAGE, PERSONAL_BOX_AVAILABLE_TEXT } from '../../shared/constants/requestConstant';
import { PC_PURPLE_BOX_URL } from '../../shared/constants/imageUrl';
import { PERSONAL_BOX_TEXT } from '../../shared/constants/alternativeText';

import Button from '../../../../shared/components/Button/Button';

import { usePersonalBox } from '../../shared/hooks/usePersonalBoxQuery';
import PersonalBoxAlternativeText from '../../shared/components/PersonalBoxAlternativeText';
import { PERSONAL_BOX_COMPLETE_REQUEST } from '../../shared/utils/kurlyPurpleBoxQueryKey';
import { getPersonalBoxAvailable } from '../../../../shared/services/kurlyPurpleBox.service';
import NextImage from '../../../../shared/components/NextImage';

const Wrapper = styled.div`
  position: relative;
  background: #f4f1fb;
`;

const styles = css`
  position: absolute;
  bottom: 115px;
  left: 50%;
  width: 877px;
  height: 100px !important;
  transform: translateX(-50%);
  background: none;
  span {
    font-size: 0;
    line-height: 0;
  }
`;

export default function PersonalBox() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const isGuest = useAppSelector(({ auth }) => auth.isGuest);
  const currentAddress = useAppSelector(({ shippingAddress }) => shippingAddress.currentAddress);

  const [openPersonalBoxForm, setOpenPersonalBoxForm] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { data: personalBox, isError: isPersonalBoxError } = usePersonalBox('always');

  const handleClickRequest = useCallback(async () => {
    setIsFetching(true);
    if (isGuest || !currentAddress) {
      dispatch(redirectToLogin());
      return;
    }
    if (isPersonalBoxError) {
      await Alert({
        text: ERROR_MESSAGE,
      });
      window.location.reload();
      return;
    }
    //web에서는 페이지 리프레시 없이 페이지 배송지변경이 가능하므로, 버튼을 클릭 할때마다 신청가능 지역 여부를 조회합니다.
    const params = {
      address: currentAddress?.roadAddress,
      addressDetail: currentAddress?.addressDetail,
    };
    getPersonalBoxAvailable(params)
      .then(async (response) => {
        if (isEmpty(personalBox?.requestState) && !response) {
          await Alert({
            text: PERSONAL_BOX_AVAILABLE_TEXT,
          });
          return;
        }
        setOpenPersonalBoxForm(true);
      })
      .catch(async () => {
        await Alert({
          text: ERROR_MESSAGE,
        });
        window.location.reload();
      })
      .finally(() => setIsFetching(false));
  }, [dispatch, isGuest, isPersonalBoxError, personalBox, currentAddress]);

  const handleClosePersonalBoxForm = useCallback(() => {
    queryClient.setQueryData(PERSONAL_BOX_COMPLETE_REQUEST, false);
    setOpenPersonalBoxForm(false);
  }, [queryClient]);

  return (
    <Wrapper>
      <NextImage src={`${PC_PURPLE_BOX_URL}img_purplebox_19.jpg`} alt={PERSONAL_BOX_TEXT} width={1900} height={1070} />
      <PersonalBoxAlternativeText />
      <Button
        text="개인 보냉 박스 신청 바로 가기"
        onClick={handleClickRequest}
        isSubmitLoading={isFetching}
        css={styles}
      />
      {openPersonalBoxForm && <FormContainer handleClosePersonalBoxForm={handleClosePersonalBoxForm} />}
    </Wrapper>
  );
}
