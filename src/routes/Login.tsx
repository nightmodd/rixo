import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthContext from '../context/auth-context';

import Input from '../UI/input';
import Button from '../UI/button';

import styles from './auth-pages.module.scss';


type FormData = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const { signin, googleSignIn } = useContext(AuthContext);

    //using zod for validation
    const schema: ZodType<FormData> = z.object({
        email: z.string().email('Please enter a valid email address'),
        password: z
            .string()
            .min(6)
            .max(20)
            .regex(/[A-Z]/, 'At least one uppercase letter')
            .regex(/[0-9]/, 'At least one number')
            .regex(/[!@#$%^&*]/, 'At least one special character'),
    });

    //using react-hook-form to get data from form
    const {
        register,
        handleSubmit,
        formState: { errors, touchedFields },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const signinWithGoogle = async () => {
        try {
            await googleSignIn();
            navigate('/');
        } catch (error: any) {
            setErrorMessage(error.message);
            console.log(error.message);
        }
    };

    const submitHandler = async (data: FormData) => {
        try {
            setErrorMessage('');
            await signin(data.email, data.password);
            navigate('/');
        } catch (error: any) {
            setErrorMessage(error.message);
            alert('Invalid email or password');
        }
    };

    return (
        <div className={styles.form_container}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    label="Email"
                    id="email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                    touched={touchedFields.email}
                ></Input>

                <Input
                    label="Password"
                    id="password"
                    type="password"
                    {...register('password')}
                    error={errors.password?.message}
                    touched={touchedFields.password}
                ></Input>

                <Button> Login </Button>
            </form>
            <br />
            <Button onClick={signinWithGoogle}> Login With Google </Button>
        </div>
    );
};

const LoginPage = () => {
    return (
        <div className={styles.outer_container}>
            <div className={styles.inner_container}>
                <span className={styles.span}>Login</span>
                <p>Please enter you login and password </p>
                <LoginForm />

                <div className={styles.navigation}>
                    <span>
                        Don't have an account?{' '}
                        <Link to="/Register" className={styles.link}>
                            Create Account
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
