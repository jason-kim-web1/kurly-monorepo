const enum VideoPlayStatus {
  NONE = 'NONE',
  CAN_PLAY = 'CAN_PLAY',
  PLAYING = 'PLAYING',
  PAUSE = 'PAUSE',
  ENDED = 'ENDED',
}

const enum VideoAudioStatus {
  MUTE = 'MUTE',
  UN_MUTE = 'UN_MUTE',
}

export { VideoAudioStatus, VideoPlayStatus };
