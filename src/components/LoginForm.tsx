import React from 'react';
import { useForm } from 'react-hook-form';
//import { ZodType, z } from 'zod';
//import { zodResolver } from '@hookform/resolvers/zod';

import Input from '../UI/Input';
import Button from '../UI/Button';

import './forms.scss';

type FormData = {
    email: string;
    password: string;
};

const LoginForm: React.FC = () => {
    //using zod for validation
  /*   const schema: ZodType<FormData> = z.object({
        email: z.string().email(),
        password: z.string().min(6).max(50),
    }); */

    //using react-hook-form to get data from form
    const {
        register,
        handleSubmit,
    } = useForm<FormData>();

    const submitHandler = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
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

            <Button buttonDescription="Login" />
        </form>
    );
};
export default LoginForm;
