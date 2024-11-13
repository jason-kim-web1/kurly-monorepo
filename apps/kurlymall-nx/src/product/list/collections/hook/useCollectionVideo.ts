import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { eq } from 'lodash';

import { VideoAudioStatus, VideoPlayStatus } from '../types';
import { ne } from '../../../../shared/utils/lodash-extends';

interface Props {
  inView: boolean;
  videoSrc: string;
}

const useCollectionVideo = ({ inView }: Props) => {
  const ref = useRef<HTMLVideoElement>(null);

  const [isError, setIsError] = useState(false);
  const [playStatus, setPlayStatus] = useState<VideoPlayStatus>(VideoPlayStatus.NONE);
  const [audioStatus, setAudioStatus] = useState<VideoAudioStatus>(VideoAudioStatus.MUTE);

  const isPlayable = !isError && ne(playStatus, VideoPlayStatus.NONE);

  const handleVisibilityChange = useCallback(() => {
    if (!ref.current) return;

    const isPlaying = eq(playStatus, VideoPlayStatus.PLAYING);
    const isPaused = eq(playStatus, VideoPlayStatus.PAUSE);

    if (eq(window.document.visibilityState, 'hidden') && isPlaying) {
      ref.current.pause();
      return;
    }

    if (eq(window.document.visibilityState, 'visible') && isPaused) {
      void ref.current.play();
    }
  }, [playStatus]);

  const eventHandlers = useMemo(
    () => ({
      handleEnded: () => {
        setPlayStatus(VideoPlayStatus.ENDED);
      },

      handlePlaying: () => {
        setPlayStatus(VideoPlayStatus.PLAYING);
      },

      handleCanPlay: () => {
        setPlayStatus(VideoPlayStatus.CAN_PLAY);
      },

      handlePause: () => {
        setPlayStatus(VideoPlayStatus.PAUSE);
      },

      handleVolumeChange: () => {
        setAudioStatus(ref.current?.muted ? VideoAudioStatus.MUTE : VideoAudioStatus.UN_MUTE);
      },
    }),
    [setAudioStatus],
  );

  useEffect(() => {
    window.document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      window.document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    const videoEl = ref.current;
    if (!videoEl || !isPlayable) return;

    if (!inView) {
      videoEl.pause();
      return;
    }

    if (!videoEl.ended && videoEl.paused) {
      void videoEl.play();
    }
  }, [inView, isPlayable]);

  return {
    ref,
    isPlayable,
    isError,
    setIsError,
    playStatus,
    setPlayStatus,
    audioStatus,
    setAudioStatus,
    eventHandlers,
  };
};

export { useCollectionVideo };
