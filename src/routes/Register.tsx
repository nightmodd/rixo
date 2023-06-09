import RegisterForm from '../components/RegisterForm';
import { Link } from 'react-router-dom';
import styles from './auth_Pages.module.scss';

const RegisterPage = () => {
    return (
        <div className={styles.container}>
            <span>Register</span>
            <p>Please enter your details </p>
            <RegisterForm />

            <div className={styles.register}>
                <span>
                    Already have an account?{' '}
                    <Link to="/Login" className={styles.link}>
                        Login
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default RegisterPage;
