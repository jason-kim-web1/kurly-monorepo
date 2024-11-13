import clsx from 'clsx';
import { PageControlsStyles } from '@thefarmersfront/kpds-css';

interface Props {
  className?: string;
  currentPage: number;
  lastPage: number;
  onChange: (nextPage: number) => void;
}

export const PageControls = ({ className, currentPage, lastPage, onChange }: Props) => {
  const handlePage = (nextPage: number) => {
    onChange(nextPage);
  };

  return (
    <div className={clsx(PageControlsStyles.root, className)}>
      <button
        className={clsx(
          PageControlsStyles.variants({
            type: 'prev',
            disabled: currentPage === 1,
          }),
        )}
        type={'button'}
        onClick={() => handlePage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <button
        className={clsx(
          PageControlsStyles.variants({
            type: 'next',
            disabled: currentPage === lastPage,
          }),
        )}
        type={'button'}
        onClick={() => handlePage(currentPage + 1)}
        disabled={currentPage === lastPage}
      />
    </div>
  );
};
