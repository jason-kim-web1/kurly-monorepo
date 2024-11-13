import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { isPC } from '../../../../util/window/getDevice';
import { useAppSelector } from '../../../shared/store';
import { loadMemberGradeInfo } from '../../../shared/reducers/member';

import Loading from '../../../shared/components/Loading/Loading';
import GradeInfoContainer from './pc/GradeInfoContainer';
import MobileGradeInfoContainer from './m/MobileGradeInfoContainer';
import useLoversClose from '../../../events/member-benefit/hooks/useLoversClose';

export default function NextGradeContainer() {
  const dispatch = useDispatch();
  const { isReady } = useRouter();

  const { memberNo } = useAppSelector(({ member }) => ({
    memberNo: member.gradeInfo.memberNo,
  }));

  const [loading, setLoading] = useState(true);

  const NextGradeComponent = isPC ? GradeInfoContainer : MobileGradeInfoContainer;

  useLoversClose(loading);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    dispatch(loadMemberGradeInfo());
  }, [isReady, dispatch]);

  useEffect(() => {
    if (memberNo > 0) {
      setLoading(false);
    }
  }, [memberNo]);

  return loading ? <Loading /> : <NextGradeComponent />;
}
