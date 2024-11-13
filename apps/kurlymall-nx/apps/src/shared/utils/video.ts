interface VendorSpecificAudioProperties {
  mozHasAudio?: boolean;
  webkitAudioDecodedByteCount?: boolean;
  audioTracks?: unknown[];
}

const hasAudioTrack = (video: HTMLVideoElement & VendorSpecificAudioProperties) => {
  return (
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length)
  );
};

export { hasAudioTrack };
