import type { QueryKey } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { useAppSelector } from '../../../../shared/store';
import Alert from '../../../../shared/components/Alert/Alert';
import COLOR from '../../../../shared/constant/colorset';
import { ThumbsUpIcon, ThumbsUpActiveIcon } from '../../../../shared/images';
import { COMMON_PATH, getPageUrl } from '../../../../shared/constant';

import { useHelpfulReview } from '../hooks';
import { isPC } from '../../../../../util/window/getDevice';
import { redirectTo } from '../../../../shared/reducers/page';

interface Props {
  queryKey: QueryKey;
  reviewId: number;
  reviewType?: 'POST' | 'IMAGE';
  sortType?: 'RECOMMEND' | 'RECENTLY';
  count: number;
  isChecked: boolean;
}

const buttonHoverStyle = css`
  :hover {
    color: ${COLOR.kurlyPurple};

    .ico {
      background: url(${ThumbsUpActiveIcon}) no-repeat center;
    }
  }
`;

const Button = styled.button<{ checked: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 88px;
  height: 32px;
  padding: 0 13px 0 11px;
  border: 1px solid ${COLOR.kurlyGray250};
  border-radius: 20px;
  font-size: 12px;
  line-height: 20px;
  color: ${({ checked }) => (checked ? COLOR.kurlyPurple : COLOR.kurlyGray450)};
  ${isPC && buttonHoverStyle}
`;

const LikeIcon = styled.span<{ checked: boolean }>`
  width: 15px;
  height: 15px;
  margin-right: 4px;
  background: url(${({ checked }) => (checked ? ThumbsUpActiveIcon : ThumbsUpIcon)}) no-repeat center;
`;

export default function HelpfulButton({ queryKey, reviewId, count, isChecked }: Props) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { pathname } = router;
  const { isGuest } = useAppSelector(({ auth }) => auth);
  const { mutate, status } = useHelpfulReview(queryKey);
  const buttonText = count > 0 ? `도움돼요 ${count}` : '도움돼요';

  const handleClick = async () => {
    if (pathname.includes('mypage')) {
      await Alert({ text: '본인이 작성한 후기는 선택할 수 없습니다.' });
      return;
    }

    if (isGuest) {
      const text = '회원전용 서비스입니다. 로그인 페이지로 이동하시겠습니까?';
      const { isDismissed } = await Alert({ text, showCancelButton: true });

      if (isDismissed) {
        return;
      }

      dispatch(
        redirectTo({
          url: getPageUrl(COMMON_PATH.login),
          query: {
            internalUrl: router.asPath,
          },
        }),
      );

      return;
    }

    mutate({ reviewId, isChecked });
  };

  return (
    <Button checked={isChecked} disabled={status === 'loading'} onClick={handleClick}>
      <LikeIcon className="ico" checked={isChecked} />
      <span>{buttonText}</span>
    </Button>
  );
}
