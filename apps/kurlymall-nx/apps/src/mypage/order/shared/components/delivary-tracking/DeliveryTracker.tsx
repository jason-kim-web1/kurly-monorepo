import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { isPC } from '../../../../../../util/window/getDevice';

import Alert from '../../../../../shared/components/Alert/Alert';

import RawHTML from '../../../../../shared/components/layouts/RawHTML';
import Loading from '../../../../../shared/components/Loading/Loading';
import { useAppSelector } from '../../../../../shared/store';
import { getDeliveryTrackingHtml } from '../../services/delivery-tracking.service';

const TrackerWrapper = styled.div`
  display: flex;
  margin: 0 auto;
`;

const styles = {
  tracker: {
    margin: '0 auto',
  },
};

interface Props {
  invoiceNo: string;
  extraCourierCode: string;
}

export default function DeliveryTracker({ invoiceNo, extraCourierCode }: Props) {
  const { hasSession } = useAppSelector(({ auth }) => auth);

  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  const { isReady, back } = useRouter();

  const handleCloseAlert = useCallback(() => {
    if (isPC) window.close();

    back();
  }, [back]);

  const loadDeliveryTrackingHtml = useCallback(async () => {
    try {
      const { parsedHtml } = await getDeliveryTrackingHtml({ invoiceNo, extraCourierCode });
      setHtml(parsedHtml);
    } catch (err) {
      Alert({
        text: err.message,
        allowOutsideClick: false,
      }).then(() => handleCloseAlert());
    }
    setLoading(false);
  }, [extraCourierCode, handleCloseAlert, invoiceNo]);

  useEffect(() => {
    if (!isReady || !hasSession) {
      return;
    }

    loadDeliveryTrackingHtml();
  }, [isReady, hasSession, loadDeliveryTrackingHtml]);

  if (loading) return <Loading />;

  return (
    <TrackerWrapper>
      <link
        rel="stylesheet"
        href="//info.sweettracker.co.kr/webjars/github-com-twbs-bootstrap/v3.3.7/dist/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        href="//info.sweettracker.co.kr/webjars/github-com-twbs-bootstrap/v3.3.7/dist/css/bootstrap-theme.css"
      />
      <link rel="stylesheet" href="//info.sweettracker.co.kr/static/css/parcel/tracking-tropical.css" />
      <RawHTML css={styles.tracker} html={html} />
    </TrackerWrapper>
  );
}
