import { MouseEvent } from 'react';

import { useDispatch } from 'react-redux';

import Alert from '../../../../../shared/components/Alert/Alert';
import { fetchKakao } from '../../../../../shared/api';
import { redirectTo } from '../../../../../shared/reducers/page';

const KakaoInquiryButton = () => {
  const dispatch = useDispatch();

  const handleClickButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { title, message, okButtonActionUrl } = await fetchKakao();

    const { isConfirmed } = await Alert({
      title,
      text: message,
      showConfirmButton: true,
      showCancelButton: true,
    });

    if (isConfirmed) {
      dispatch(redirectTo({ url: okButtonActionUrl }));
    }
  };

  return (
    <button type="button" onClick={handleClickButton}>
      카카오톡 상담 받기
    </button>
  );
};

export default KakaoInquiryButton;
