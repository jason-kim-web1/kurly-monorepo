import { useAppSelector } from '../../../shared/store';
import { removeCheckboxStatus, toggleCheckboxStatus } from '../services/checkboxStatus';
import { loadUserCheckboxStatus } from '../services/checkboxStatusStorage';

export default function useCheckboxStatus() {
  const { id } = useAppSelector(({ member }) => ({
    id: member.info?.id,
  }));
  const checkboxStatus = loadUserCheckboxStatus(id);

  const onToggleCheckboxStatus = ({ checked, dealProductNo }: { checked: boolean; dealProductNo: number }) => {
    if (id) {
      toggleCheckboxStatus({ id, checked, dealProductNo });
    }
  };

  const onDeleteCheckboxStatus = ({ dealProductNos }: { dealProductNos: number[] }) => {
    if (id) {
      removeCheckboxStatus({
        id,
        dealProductNos,
      });
    }
  };

  return {
    checkboxStatus,
    onToggleCheckboxStatus,
    onDeleteCheckboxStatus,
  };
}
