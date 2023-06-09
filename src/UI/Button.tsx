import styles from './button.module.scss';

const Button: React.FC<{
    buttonDescription: string;
}> = (props) => {
    const { buttonDescription } = props;
    return <button className={styles.button}>{buttonDescription}</button>;
};

export default Button;
