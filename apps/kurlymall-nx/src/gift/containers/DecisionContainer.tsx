import DecisionArea from '../components/mobile/Receiver/DecisionArea';

interface Props {
  handleAccepted(): void;
  handleRejected(): void;
}

export default function DecisionContainer({ handleAccepted, handleRejected }: Props) {
  return <DecisionArea onApproved={handleAccepted} onRejected={handleRejected} />;
}
