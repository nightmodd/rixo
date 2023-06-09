import React from 'react';
import { useForm } from 'react-hook-form';
import { ZodType, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../UI/Input';
import Button from '../UI/Button';

import './forms.scss';

type FormData = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

const RegisterForm: React.FC = () => {
    //using zod for validation
    const schema: ZodType<FormData> = z
        .object({
            name: z.string().min(3).max(50),
            email: z.string().email(),
            password: z.string().min(6).max(50),
            confirmPassword: z.string().min(6).max(50),
        })
        .refine((data) => data.password === data.confirmPassword, {
            message: 'Passwords do not match',
            path: ['confirmPassword'],
        });

    //using react-hook-form to get data from form
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const submitHandler = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <Input
                label="Full Name"
                labelFor="name"
                type="text"
                required={true}
                register={register}
            ></Input>

            <Input
                label="Email"
                labelFor="email"
                type="text"
                required={true}
                register={register}
            ></Input>

            <Input
                label="Password"
                labelFor="password"
                type="password"
                required={true}
                register={register}
            ></Input>

            <Input
                label="Confirm Password"
                labelFor="confirmPassword"
                type="password"
                required={true}
                register={register}
            ></Input>
           {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            <Button buttonDescription="create account" />
        </form>
    );
};
export default RegisterForm;
