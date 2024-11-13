import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactNode, RefObject, useEffect, useMemo, useState } from 'react';

import { IconPlay } from '../../../../../shared/components/icons/video/IconPlay';
import { IconPause } from '../../../../../shared/components/icons/video/IconPause';
import { IconReplay } from '../../../../../shared/components/icons/video/IconReplay';
import { IconSoundOn } from '../../../../../shared/components/icons/video/IconSoundOn';
import { IconSoundOff } from '../../../../../shared/components/icons/video/IconSoundOff';
import { VideoAudioStatus, VideoPlayStatus } from '../../types';
import { hasAudioTrack } from '../../../../../shared/utils/video';

interface Props {
  videoRef: RefObject<HTMLVideoElement>;
  playStatus: VideoPlayStatus;
  audioStatus: VideoAudioStatus;
}

const buttonStyle = css`
  position: absolute;
  bottom: 4px;
  transition: background-color 0.2s ease-out;
  width: 40px;
  height: 40px;
  padding: 10px;
  background-color: transparent;
  border-radius: 20px;

  &:active,
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) calc(100% - 80px), rgba(0, 0, 0, 0.1) 100%);
`;

const PlayButton = styled.button`
  left: 4px;
  ${buttonStyle}
`;

const AudioButton = styled.button`
  right: 4px;
  ${buttonStyle}
`;

const PlayButtonInfo: Record<VideoPlayStatus, [ReactNode, (el: HTMLVideoElement) => void]> = {
  [VideoPlayStatus.NONE]: [<IconPlay key={'icon-play'} />, (el) => el.play()],
  [VideoPlayStatus.CAN_PLAY]: [<IconPlay key={'icon-play'} />, (el) => el.play()],
  [VideoPlayStatus.PLAYING]: [<IconPause key={'icon-pause'} />, (el) => el.pause()],
  [VideoPlayStatus.PAUSE]: [<IconPlay key={'icon-play'} />, (el) => el.play()],
  [VideoPlayStatus.ENDED]: [<IconReplay key={'icon-replay'} />, (el) => el.play()],
};

const AudioButtonInfo: Record<VideoAudioStatus, [ReactNode, (el: HTMLVideoElement) => void]> = {
  [VideoAudioStatus.MUTE]: [<IconSoundOff key={'icon-sound-off'} />, (el) => (el.muted = false)],
  [VideoAudioStatus.UN_MUTE]: [<IconSoundOn key={'icon-sound-on'} />, (el) => (el.muted = true)],
};

const VideoControls = ({ videoRef, playStatus, audioStatus }: Props) => {
  const [hasAudio, setHasAudio] = useState(true);

  const [playIcon, videoHandler] = useMemo(() => PlayButtonInfo[playStatus], [playStatus]);
  const [audioIcon, audioHandler] = useMemo(() => AudioButtonInfo[audioStatus], [audioStatus]);

  const handleVideoButton = () => {
    if (videoRef.current) {
      videoHandler(videoRef.current);
    }
  };

  const handleAudioButton = () => {
    if (videoRef.current) {
      audioHandler(videoRef.current);
    }
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    setHasAudio(hasAudioTrack(video));

    const handleAudioTrack = () => {
      setHasAudio(hasAudioTrack(video));
    };

    video.addEventListener('loadedmetadata', handleAudioTrack);

    return () => {
      video.removeEventListener('loadedmetadata', handleAudioTrack);
    };
  }, [videoRef]);

  return (
    <Wrapper>
      <PlayButton onClick={handleVideoButton}>{playIcon}</PlayButton>
      {hasAudio ? <AudioButton onClick={handleAudioButton}>{audioIcon}</AudioButton> : null}
    </Wrapper>
  );
};

export { VideoControls };
