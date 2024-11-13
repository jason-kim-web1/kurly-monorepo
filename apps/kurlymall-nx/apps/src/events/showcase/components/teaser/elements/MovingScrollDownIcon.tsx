import { motion } from 'framer-motion';

interface Props {
  className?: string;
}

const MovingScrollDownIcon = ({ className }: Props) => {
  return (
    <motion.svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      initial={{ y: 0 }}
      animate={{ y: -20 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
    >
      <path d="M7 13L12 18L17 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 6L12 11L17 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </motion.svg>
  );
};

export { MovingScrollDownIcon };
