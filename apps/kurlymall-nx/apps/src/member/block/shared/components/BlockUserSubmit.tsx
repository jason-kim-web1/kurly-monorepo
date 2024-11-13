import styled from '@emotion/styled';

import { useDispatch } from 'react-redux';

import { BLOCK_USER_ERROR_MESSAGE, BLOCK_USER_SUCCESS_MESSAGE, IBlockUser } from '../../interface/BlockUser.interface';
import Button from '../../../../shared/components/Button/Button';
import { useFormEvent } from '../../../../shared/hooks/useFormEvent';
import usePostUnblockMember from '../queries/usePostUnblockMember';
import appService from '../../../../shared/services/app.service';
import { isWebview } from '../../../../../util/window/getDevice';
import Alert from '../../../../shared/components/Alert/Alert';
import { redirectTo, redirectToLogin } from '../../../../shared/reducers/page';
import { USER_MENU_PATH } from '../../../../shared/constant';
import { setAccessToken } from '../../../../shared/reducers/auth';
import { contentsStyle } from '../styled';
import { getLockedToken } from '../service';

const ButtonWrapper = styled.div`
  padding-top: 32px;
`;

interface Props {
  isPossibleSubmit: boolean;
  handleResetForm: () => void;
}

export default function BlockUserSubmit({ isPossibleSubmit, handleResetForm }: Props) {
  const dispatch = useDispatch();

  const {
    values: { newPassword, unblockToken },
  } = useFormEvent<IBlockUser>();
  const { mutate: doUnblockMember } = usePostUnblockMember();
  const lockedToken = getLockedToken();

  const handleSubmit = () => {
    if (!unblockToken) return;

    doUnblockMember(
      {
        newPassword,
        unblockToken,
        lockedToken,
      },
      {
        onSuccess(data) {
          const { access_token: accessToken } = data.data;
          if (!accessToken) return;

          if (isWebview()) {
            appService.sendNewToken({
              token: accessToken,
            });
          }

          Alert({
            text: BLOCK_USER_SUCCESS_MESSAGE.PASSWORD_CHANGE,
            showConfirmButton: true,
            contentsStyle,
          }).then(() => {
            if (!isWebview()) {
              dispatch(
                setAccessToken({
                  accessToken,
                  isGuest: false,
                }),
              );
            }
            dispatch(
              redirectTo({
                url: USER_MENU_PATH.home.uri,
              }),
            );
          });
        },
        onError(err) {
          const { message } = err as Error;

          if (message === BLOCK_USER_ERROR_MESSAGE.AUTHORIZATION_FAILED) {
            dispatch(
              redirectToLogin({
                message,
              }),
            );
            return;
          }

          Alert({
            text: message,
            showConfirmButton: true,
            contentsStyle,
          }).then(() => {
            if (message === BLOCK_USER_ERROR_MESSAGE.EXPIRED_TOKEN) {
              handleResetForm();
              return;
            }
            document.getElementById('newPassword')?.focus();
          });
        },
      },
    );
  };

  return (
    <>
      <ButtonWrapper>
        <Button theme="primary" text="완료" disabled={!isPossibleSubmit} onClick={handleSubmit} />
      </ButtonWrapper>
    </>
  );
}
