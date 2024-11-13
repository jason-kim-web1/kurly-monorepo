import { useCallback, useMemo, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { Category } from '../../../../shared/interfaces/MyKurlyStyle';
import { postSiteId } from '../../../../shared/services/myKurlyStyle.service';
import Alert from '../../../../shared/components/Alert/Alert';
import { isPC } from '../../../../../util/window/getDevice';
import { redirectTo } from '../../../../shared/reducers/page';
import { getPageUrl, MY_KURLY_STYLE } from '../../../../shared/constant';
import { FIRST_STEP } from '../constants/myKurlyStyleText';

import { loadMyKurlyStyleProfile } from '../../../../shared/reducers/member';
import { updateSiteInfo } from '../../slice';
import { amplitudeService } from '../../../../shared/amplitude';
import { SubmitSiteProfileSuccess } from '../../../../shared/amplitude/events/mykurly-style/SubmitSiteProfileSuccess';
import { SelectBackButton } from '../../../../shared/amplitude/events/mykurly-style/SelectBackButton';

interface Props {
  categories: Category[];
  profileId?: string;
}

const contentsStyle = `
  .popup-title {
    white-space: pre;
  }
  .popup-footer {
    flex-direction: column;
    padding: 0 24px;
    margin-top: 30px;
    height: auto;
  }
  .popup-footer button {
    width: 100%;
    height: 48px;
    border: 1px solid #ddd;
    border-radius: 6px;
    margin: 0;
  }
  .popup-footer button:last-of-type {
    color: #fff;
    background: #5F0080;
    border: none;
    margin: 8px 0 24px 0;
  }
`;

export default function useStep({ categories, profileId }: Props) {
  const dispatch = useDispatch();

  const router = useRouter();

  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const stepLength: number | undefined = useMemo(() => categories.length, [categories]);

  const lastStep: boolean = useMemo(() => !!stepLength && stepIndex === stepLength - 1, [stepIndex, stepLength]);

  const previousButton = useCallback(async () => {
    void amplitudeService.logEvent(new SelectBackButton({ selectionType: 'previous_button', profileType: profileId }));

    if (stepIndex > FIRST_STEP) {
      return setStepIndex(stepIndex - 1);
    }

    if (!isPC) {
      const { isConfirmed } = await Alert({
        title: '아직 입력하지 않은 정보가 있습니다.\n모든 질문에 답변 후 저장해주세요.',
        contentsStyle,
        confirmButtonText: '이어서 입력하기',
        cancelButtonText: '다음에 하기',
        showCancelButton: true,
        allowOutsideClick: false,
      });

      if (!isConfirmed) {
        router.back();
      }
    }
  }, [router, stepIndex, profileId]);

  const nextButton = useCallback(() => {
    if (stepLength && stepIndex < stepLength - 1) {
      setStepIndex(stepIndex + 1);
    }
  }, [stepIndex, stepLength]);

  const goToMyKurlyStyle = useCallback(() => {
    if (!isPC) {
      dispatch(redirectTo({ url: getPageUrl(MY_KURLY_STYLE.myKurlyStyle) }));
    }
  }, [dispatch]);

  const saveProfile = useCallback(async () => {
    void amplitudeService.logEvent(new SubmitSiteProfileSuccess({ profileType: profileId }));

    setLoading(true);
    const selectedSegments = categories
      .map(({ segments }) => segments)
      .flat()
      .filter(({ selected }) => selected)
      .map(({ id }) => id);

    try {
      const { success } = await postSiteId(profileId, selectedSegments);

      if (success) {
        await Alert({
          text: '정상적으로 저장되었습니다.',
        });
        dispatch(updateSiteInfo());
        dispatch(loadMyKurlyStyleProfile());
      }

      goToMyKurlyStyle();
    } catch {
      goToMyKurlyStyle();
    } finally {
      setLoading(false);
    }
  }, [categories, dispatch, goToMyKurlyStyle, profileId]);

  return {
    stepIndex,
    stepLength,
    lastStep,
    previousButton,
    nextButton,
    saveProfile,
    isSaved: !loading,
  };
}
