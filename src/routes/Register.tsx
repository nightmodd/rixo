import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '../config/firebase-config';
import AuthContext from '../context/auth-context';

import Input from '../UI/input';
import Button from '../UI/button';

import styles from './auth-pages.module.scss';

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm: React.FC = () => {
    const [, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();
    const { signup } = useContext(AuthContext);

    //using zod for validation
    const schema: ZodType<FormData> = z
        .object({
            name: z.string().min(3).max(50),
            email: z.string().email('Please enter a valid email address'),
            password: z
                .string()
                .min(6, 'Password must be at least 6 characters long')
                .max(20)
                .regex(/[A-Z]/, 'At least one uppercase letter')
                .regex(/[0-9]/, 'At least one number')
                .regex(/[!@#$%^&*]/, 'At least one special character'),

            confirmPassword: z
                .string()
                .min(6)
                .max(20)
                .regex(/[A-Z]/, 'At least one uppercase letter')
                .regex(/[0-9]/, 'At least one number')
                .regex(/[!@#$%^&*]/, 'At least one special character'),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });

    //using react-hook-form to get data from form
    const {
        handleSubmit,
        register,
        formState: { errors, touchedFields },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: 'onChange',
    });

    const submitHandler = async (data: FormData) => {
        try {
            setErrorMessage('');
            await signup(data.email, data.password, data);
            navigate('/');
        } catch (error: any) {
            setErrorMessage(error.message);
            alert(error.message);
        }
    };

    return (
        <div className={styles.form_container}>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Input
                    label="Full Name"
                    id="name"
                    type="text"
                    {...register('name')}
                    error={errors.name?.message}
                    touched={touchedFields.name}
                ></Input>

                <Input
                    label="Email"
                    id="email"
                    type="text"
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

                <Input
                    label="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    {...register('confirmPassword')}
                    error={errors.confirmPassword?.message}
                    touched={touchedFields.confirmPassword}
                ></Input>

                <Button> create account </Button>
            </form>
        </div>
    );
};

const RegisterPage = () => {
    console.log(auth?.currentUser?.email);
    return (
        <div className={styles.outer_container}>
            <div className={styles.inner_container}>
                <span> Register</span>
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
        </div>
    );
};

export default RegisterPage;
