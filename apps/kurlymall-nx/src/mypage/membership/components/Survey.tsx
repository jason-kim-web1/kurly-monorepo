import { ChangeEvent, FormEvent, Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import { useDispatch } from 'react-redux';

import Button from '../../../shared/components/Button/Button';
import {
  SurveyForm,
  SurveyTitleSection,
  SurveySection,
  SurveyText,
  CancelButtonGroup,
  SurveyBenefitText,
} from '../shared/styled';
import Radio from '../../../shared/components/Input/Radio';
import InputGroup from '../../../shared/components/InputGroup/InputGroup';
import { loadCancelReasons } from '../shared/membership.slice';
import { useAppSelector } from '../../../shared/store';
import { isPC } from '../../../../util/window/getDevice';
import { CLASS_NAME_DEVICE, SURVEY_BENEFIT_TEXT } from '../shared/constants';
import { UnsubscribeConfirmMessage } from '../shared/type';

interface SurveyProps {
  submitSurveyResult: (id: number, opinion: string) => void;
}

const ColumnCss = css`
  flex-direction: column;
  ${isPC
    ? css`
        padding: 0;
      `
    : ''}
`;

export default function Survey({ submitSurveyResult }: SurveyProps) {
  const [detailedReason, setDetailedReason] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCancelReasons());
  }, [dispatch]);

  const cancelReasons = useAppSelector(({ myMembership }) => myMembership.cancelReasons);

  const etcReasonIndex = useMemo(() => cancelReasons.findIndex(({ reason }) => reason === '기타'), [cancelReasons]);

  const handleReason = useCallback(
    (newReason: { name: string; value: string }) => {
      const resultIndex = cancelReasons.findIndex(({ reason }) => reason === newReason.value);

      if (resultIndex < 0 || (resultIndex === etcReasonIndex && detailedReason.length < 1)) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }

      const index = cancelReasons.findIndex(({ reason }) => reason === newReason.value) || 0;

      setSelectedIndex(index);
    },
    [cancelReasons, etcReasonIndex, detailedReason.length],
  );

  const submit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (selectedIndex >= 0) {
        submitSurveyResult(cancelReasons[selectedIndex].id, selectedIndex === etcReasonIndex ? detailedReason : '');
      }
    },
    [cancelReasons, selectedIndex, detailedReason, submitSurveyResult, etcReasonIndex],
  );

  const updateReasonText = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setDetailedReason(event.target.value);
    setDisabled(event.target.value.length <= 0);
  }, []);

  const renderSelectedInfo = (id: number) => {
    const selectedBenefit = SURVEY_BENEFIT_TEXT[id];

    if (id === etcReasonIndex) {
      return (
        <SurveyText
          rows={2}
          id="reason-etc-text"
          placeholder="기타 사유를 작성해주세요 (필수)"
          onChange={updateReasonText}
          defaultValue={detailedReason}
          maxLength={200}
        />
      );
    }

    return (
      <>
        {selectedBenefit ? (
          <SurveyBenefitText>
            <div className="title">{selectedBenefit.title}</div>
            {selectedBenefit.text && <div className="text">{selectedBenefit.text}</div>}
            {selectedBenefit.list && (
              <ul className="list">
                {selectedBenefit.list.map((text) => (
                  <li key={text}>{text}</li>
                ))}
              </ul>
            )}
          </SurveyBenefitText>
        ) : null}
      </>
    );
  };

  return (
    <SurveyForm onSubmit={submit}>
      <SurveyTitleSection>
        <div className="main">어떤 점이 아쉬웠나요?</div>
        <div className="sub">더 나은 서비스를 위해 아래 설문을 작성해 주시면 큰 도움이 됩니다.</div>
      </SurveyTitleSection>
      <SurveySection>
        <InputGroup css={ColumnCss}>
          {cancelReasons.map(({ reason, id }) => (
            <Fragment key={`reason-${id}`}>
              <Radio
                label={reason}
                value={reason}
                name="reason"
                id={`reason-${id}`}
                onChange={handleReason}
                selectedValue={selectedIndex >= 0 ? cancelReasons[selectedIndex].reason : ''}
                className="survey-radio"
              />
              {selectedIndex === id - 1 && renderSelectedInfo(id - 1)}
            </Fragment>
          ))}
        </InputGroup>
      </SurveySection>
      <CancelButtonGroup isSticky className={CLASS_NAME_DEVICE}>
        <Button theme="primary" text={UnsubscribeConfirmMessage.SURVEY} radius={6} type="submit" disabled={disabled} />
      </CancelButtonGroup>
    </SurveyForm>
  );
}
