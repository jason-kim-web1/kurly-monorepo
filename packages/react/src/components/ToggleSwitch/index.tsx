import { createContext, useContext, PropsWithChildren, ComponentProps } from 'react';
import { ToggleSwitchStyles, Utils } from '@thefarmersfront/kpds-css';
import clsx from 'clsx';

export interface ToggleSwitchContext {
  isChecked: boolean;
  disabled: boolean;
  onChange(nextValue: boolean): void;
}

const initialContextState: ToggleSwitchContext = {
  isChecked: false,
  disabled: false,
  onChange: (nextValue) => {},
};

const ToggleSwitchContext = createContext<ToggleSwitchContext>(initialContextState);

export interface ToggleSwitchProps extends PropsWithChildren<ToggleSwitchContext> {
  inputProps?: Omit<ComponentProps<'input'>, 'className' | 'checked' | 'children' | 'disabled'>;
}

export const ToggleSwitch = ({ children, isChecked, disabled, onChange, inputProps }: ToggleSwitchProps) => {
  const handleChange = () => onChange(!isChecked);
  return (
    <ToggleSwitchContext.Provider value={{ isChecked, disabled, onChange }}>
      <button type="button" className={ToggleSwitchStyles.root} onClick={handleChange}>
        {children}
      </button>
      <input {...inputProps} checked={isChecked} className={Utils.visuallyHiddenCss} />
    </ToggleSwitchContext.Provider>
  );
};

export type ToggleSwitchLabelProps = {
  className?: string;
};

const Label = ({ children, className }: PropsWithChildren<ToggleSwitchLabelProps>) => {
  const { disabled } = useContext(ToggleSwitchContext);
  return (
    <span
      className={clsx(
        ToggleSwitchStyles.toggleSwitchLabelVariants({
          disabled,
        }),
        className,
      )}
    >
      {children}
    </span>
  );
};

export type ToggleSwitchTractProps = {
  className?: string;
};

const Track = ({ className, children }: PropsWithChildren<ToggleSwitchTractProps>) => {
  const { isChecked, disabled } = useContext(ToggleSwitchContext);
  return (
    <div
      className={clsx(
        ToggleSwitchStyles.toggleSwitchTrackVariants({
          isChecked,
          disabled,
        }),
        className,
      )}
    >
      {children}
    </div>
  );
};

export type ToggleSwitchThumbProps = {
  className?: string;
};

const Thumb = ({ className }: ToggleSwitchThumbProps) => {
  const { isChecked } = useContext(ToggleSwitchContext);
  return (
    <div
      className={clsx(
        ToggleSwitchStyles.toggleSwitchThumbVariants({
          isChecked,
        }),
        className,
      )}
    />
  );
};

ToggleSwitch.Label = Label;
ToggleSwitch.Track = Track;
ToggleSwitch.Thumb = Thumb;
