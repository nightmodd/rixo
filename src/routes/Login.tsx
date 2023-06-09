import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';
import styles from './auth_Pages.module.scss';

const LoginPage = () => {
    return (
        <div className={styles.container}>
            <span>Login</span>
            <p>Please enter you login and password </p>
            <LoginForm />

            <div className={styles.register}>
                <span>
                    Don't have an account?{' '}
                    <Link to="/Register" className={styles.link}>
                        Create Account
                    </Link>
                </span>
            </div>
        </div>
    );
};

export default LoginPage;
