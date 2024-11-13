import { motion, MotionStyle } from 'framer-motion';

interface VideoPlayerProps {
  className?: string;
  motionStyle?: MotionStyle;
  sourceURL: string;
}

const VideoPlayer = ({ className, motionStyle, sourceURL }: VideoPlayerProps) => {
  return (
    <motion.video css={className} style={motionStyle} autoPlay loop muted playsInline>
      <source src={sourceURL} type="video/mp4" />
    </motion.video>
  );
};

export { VideoPlayer };
