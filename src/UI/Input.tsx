import styles from './input.module.scss';

type InputProps = {
    label: string;
    labelFor: string;
    type: 'text' | 'password';
    required?: boolean;
    register?: any;
    className?: string;

    //  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
let passwordCompare: any;

const Input: React.FC<InputProps> = (props) => {
    const { label, labelFor, type, required, register, className } = props;

    const onChangeHandler = (event: any) => {
        if (labelFor === 'name') {
            if (event.target.value.length < 3) {
                event.target.classList.add(styles.error);
                event.target.classList.remove(styles.valid);
            } else {
                event.target.classList.remove(styles.error);
                event.target.classList.add(styles.valid);
            }
        } else if (labelFor === 'email') {
            if (
                !event.target.value.match(
                    // eslint-disable-next-line no-control-regex
                    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
                )
            ) {
                event.target.classList.add(styles.error);
                event.target.classList.remove(styles.valid);
            } else {
                event.target.classList.remove(styles.error);
                event.target.classList.add(styles.valid);
            }
        } else if (labelFor === 'password') {
            if (event.target.value.length < 6) {
                event.target.classList.add(styles.error);
                event.target.classList.remove(styles.valid);
            } else {
                event.target.classList.remove(styles.error);
                event.target.classList.add(styles.valid);
                passwordCompare = event.target.value;
            }
        } else if (labelFor === 'confirmPassword') {
            if (event.target.value !== passwordCompare) {
                event.target.classList.add(styles.error);
                event.target.classList.remove(styles.valid);
            } else {
                event.target.classList.remove(styles.error);
                event.target.classList.add(styles.valid);
            }
        }
        if (event.target.value.length === 0) {
            event.target.classList.remove(styles.error);
            event.target.classList.remove(styles.valid);
        }
    };

    return (
        <div className={styles.input_container}>
            <input
                type={type}
                id={labelFor}
                required={required}
                onChange={(e) => console.log(e.target.value)}
                {...register(labelFor, {
                    required: true,
                    onChange: onChangeHandler,
                })}
                className={className}
            />
            <label htmlFor={labelFor}>{label} </label>
        </div>
    );
};

export default Input;
