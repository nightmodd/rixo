import { forwardRef } from 'react';
import styles from './input.module.scss';
import clsx from 'clsx';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  label: string;
  id: string;
  error?: string;
  touched?: boolean;
}

const Input: React.FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, id, error, touched, placeholder = '', ...props }, ref) => {
    return (
      <>
        <div className={styles.input_container}>
          <input
            placeholder={placeholder}
            id={id}
            className={clsx([
              error && styles.error,
              !error && touched && styles.valid,
            ])}
            {...props}
            ref={ref}
          />
          <label htmlFor={id}>{label} </label>
        </div>

        {error && <p>{error}</p>}
      </>
    );
  }
);

export default Input;
