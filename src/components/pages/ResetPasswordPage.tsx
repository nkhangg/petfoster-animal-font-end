'use client';
import React, { ChangeEvent, FocusEvent, FormEvent, FormEventHandler, InputHTMLAttributes, useState } from 'react';
import { BoxSign, LoadingPrimary, SocialButton, TextField, WrapperAnimation } from '@/components';
import { ContainerContent } from '@/components/common';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import Validate from '@/utils/validate';
import { resetPassword } from '@/apis/user';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { pushNoty } from '@/redux/slice/appSlice';
import { useRouter } from 'next/navigation';
export interface IResetPasswordProps {}

export default function ResetPassword(props: IResetPasswordProps) {
    //redux
    const dispatch = useAppDispatch();

    // router

    const router = useRouter();

    const [loading, setloading] = useState(false);

    const [email, setEmail] = useState('');

    const [error, setError] = useState('');

    const validate = () => {
        let flag = false;

        const { message, error } = Validate.email(email);

        if (error) {
            setError(message);
            flag = error;
        } else {
            setError('');
        }

        return flag;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validate()) return;

        try {
            setloading(true);
            const response = await resetPassword(email);
            setloading(false);
            if (!response.data) {
                if (response.status === 404) {
                    setError(response.message);
                    return;
                }

                const errorMess = response.errors as { email: string };
                setError(errorMess.email);

                return;
            }

            dispatch(
                pushNoty({
                    title: `New password has been sent to email ${email}. Please check your email ❤️❤️❤️`,
                    type: 'success',
                    open: true,
                    autohide: 4000,
                }),
            );
            router.push('/login');
        } catch (error) {
            setloading(false);
            dispatch(
                pushNoty({
                    title: 'Internal Server Errors !',
                    type: 'error',
                    open: true,
                }),
            );
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        validate();
    };
    return (
        <BoxSign showForgot={false} title="RESET PASSWORD" onSubmit={handleSubmit}>
            <Typography
                variant="subtitle1"
                fontSize={{ xs: 12, md: 13, lg: 14 }}
                className=" text-[#6C6C6C]"
                sx={{
                    mb: '20px',
                    mt: '-26px',
                }}
            >
                {"Just enter your email address below and we'll send you a link to reset your password!"}
            </Typography>

            <TextField message={error} onBlur={handleBlur} value={email} onChange={handleChange} type="email" name="email" label={'Email'} size="small" fullWidth />

            {loading && <LoadingPrimary />}
        </BoxSign>
    );
}
