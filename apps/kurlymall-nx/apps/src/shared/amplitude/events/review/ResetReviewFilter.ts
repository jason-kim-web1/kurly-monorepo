import { AmplitudeEvent } from '../../AmplitudeEvent';

/**
 * 후기 필터 초기화 시 발생하는 이벤트
 * 1. 필터 적용 후 필터 바텀시트에서 초기화 버튼 클릭 후 n개 후기보기 버튼을 클릭하는 경우
 * 2. 필터 적용이후 필터 바텀시트에서 필터 선택 해제하여 걸린 필터가 없는 상태에서 n개 후기보기 버튼을 클릭하는 경우
 * 3. 후기 리스트에서 적용된 큭 필터를 x로 지워서 남아있는 퀵 필터가 없는 경우
 * 4. 후기 리스트에서 퀵 필터 옆 초기화 버튼을 클리하는 경우
 * @extends AmplitudeEvent
 */
export class ResetReviewFilter extends AmplitudeEvent<void> {
  constructor() {
    super('reset_review_filter');
  }
}
