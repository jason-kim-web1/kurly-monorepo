import Button from '../../../shared/components/Button/Button';
import { useAppSelector } from '../../../shared/store';
import { DueDate, CancelHeaderText, HeaderSection, CancelButtonGroup } from '../shared/styled';
import UnsubscribeBenefits from './UnsubscribeBenefits';
import { CLASS_NAME_DEVICE } from '../shared/constants';
import useScrollTopFocus from '../../../shared/hooks/useScrollTopFocus';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipUnsubscribe } from '../../../shared/amplitude/events/membership';

interface ShowBenefitsProps {
  showStayMembership: () => void;
  nextProcess: () => void;
  coreBenefitValue: string;
}

export default function ShowBenefits({ showStayMembership, nextProcess, coreBenefitValue }: ShowBenefitsProps) {
  const { endBenefitDate } = useAppSelector(({ myMembership }) => ({
    benefits: myMembership.benefits,
    endBenefitDate: myMembership.endBenefitDate,
  }));

  useScrollTopFocus();

  const handleClickMyMembership = () => {
    amplitudeService.logEvent(
      new SelectMembershipUnsubscribe({ pageName: 'unsubscribe', message: '멤버십 혜택 계속 받기' }),
    );
    showStayMembership();
  };

  return (
    <>
      <HeaderSection>
        <CancelHeaderText>
          <span>잠시만요!</span>
        </CancelHeaderText>
        <CancelHeaderText>
          <span>월 최대 </span>
          <span className="purple">{coreBenefitValue}의 혜택</span>
          <span>을</span>
        </CancelHeaderText>
        <CancelHeaderText>
          <span>포기하시려고요?</span>
        </CancelHeaderText>
        <DueDate>
          <div className="info">
            <span className="text-lightgray">멤버십 혜택 만료 기간</span>
            <span className="text-gray">{endBenefitDate}</span>
          </div>
        </DueDate>
      </HeaderSection>
      <UnsubscribeBenefits />
      <CancelButtonGroup isSticky={false} className={CLASS_NAME_DEVICE}>
        <Button theme="tertiary" text="구독 해지하기" radius={6} onClick={nextProcess} />
        <Button theme="primary" text="멤버십 혜택 계속 받기" radius={6} onClick={handleClickMyMembership} />
      </CancelButtonGroup>
    </>
  );
}
