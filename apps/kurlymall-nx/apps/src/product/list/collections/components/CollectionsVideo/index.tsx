import styled from '@emotion/styled';
import { useInView } from 'react-intersection-observer';

import { eq } from 'lodash';

import { useCollectionVideo } from '../../hook/useCollectionVideo';
import { VideoControls } from './VideoControls';
import NextImage from '../../../../../shared/components/NextImage';
import { VideoPlayStatus } from '../../types';

interface Props {
  videoSrc: string;
  thumbnailSrc: string;
}

const VideoWrapper = styled.div<{ isError: boolean }>`
  position: relative;
  display: ${({ isError }) => (isError ? 'none' : 'block')};
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  background-color: black;
  vertical-align: middle;
`;

const CollectionsVideo = ({ videoSrc, thumbnailSrc }: Props) => {
  const { ref: wrapperRef, inView } = useInView();
  const {
    ref,
    isPlayable,
    isError,
    setIsError,
    playStatus,
    audioStatus,
    eventHandlers: { handleVolumeChange, handleCanPlay, handlePlaying, handlePause, handleEnded },
  } = useCollectionVideo({
    inView,
    videoSrc,
  });

  const posterVisible = eq(playStatus, VideoPlayStatus.NONE) || eq(playStatus, VideoPlayStatus.ENDED);

  const handleError = () => {
    setIsError(false);
  };

  return (
    <VideoWrapper ref={wrapperRef} isError={isError}>
      <Video
        ref={ref}
        src={videoSrc}
        controls={false}
        playsInline
        muted
        autoPlay
        onPause={handlePause}
        onPlaying={handlePlaying}
        onCanPlay={handleCanPlay}
        onVolumeChange={handleVolumeChange}
        onEnded={handleEnded}
        onError={handleError}
      />

      {posterVisible ? <NextImage src={thumbnailSrc} alt={''} layout={'fill'} /> : null}
      {isPlayable ? <VideoControls videoRef={ref} playStatus={playStatus} audioStatus={audioStatus} /> : null}
    </VideoWrapper>
  );
};

export { CollectionsVideo };
