'use client';
import React, { ChangeEvent, FocusEvent, FormEvent, FormEventHandler, InputHTMLAttributes, ReactNode, useState } from 'react';
import { RoudedButton, SocialButton, TextField, WrapperAnimation } from '@/components';
import { ContainerContent } from '@/components/common';
import { faSquareFacebook, faSquareGooglePlus } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Link from 'next/link';
export interface IBoxSignProps {
    onSubmit?: FormEventHandler<HTMLFormElement>;
    children: ReactNode;
    title: string;
    titleBtn?: string;
    link?: { link: string; content: string; contentLink: string };
    showForgot?: boolean;
}

export default function BoxSign({
    onSubmit,
    children,
    title,
    titleBtn = 'send',
    link = { link: '/register', contentLink: 'Sign up', content: 'Need an account?' },
    showForgot = true,
}: IBoxSignProps) {
    return (
        <ContainerContent className="pt-24 text-black-main">
            <Grid container>
                <Grid
                    component={'form'}
                    onSubmit={onSubmit}
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    sx={{
                        borderRight: { xs: 0, md: 1 },
                        borderColor: '#DBDBDB !important',
                        pr: { xs: 0, md: '20px' },
                        pl: { xs: 0, md: '10%' },
                    }}
                >
                    <Typography variant="h3" fontSize={{ xs: 18, md: 22, lg: 32 }} sx={{ mb: '30px' }} fontWeight={600} className="uppercase text-[#4D4D4D]">
                        {title}
                    </Typography>

                    {children}

                    <Stack direction={'row'} sx={{ justifyContent: 'space-between' }}>
                        <Typography variant="subtitle2" sx={{ mt: '20px', fontSize: { xs: '12px', md: '13px', lg: '14px' } }}>
                            {link.content}
                            <Link href={link.link} className="text-blue-primary hover:underline ml-1">
                                {link.contentLink}
                            </Link>
                        </Typography>
                        {showForgot && (
                            <Typography variant="subtitle2" sx={{ mt: '20px', fontSize: { xs: '12px', md: '13px', lg: '14px' } }}>
                                <Link href={'/profile/reset-password'} className="text-blue-primary hover:underline ml-1">
                                    Forgot password ?
                                </Link>
                            </Typography>
                        )}
                    </Stack>

                    <RoudedButton title={titleBtn} />
                </Grid>
                <Grid
                    item
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        pr: { xs: 0, md: '10%' },
                        pl: { xs: 0, md: '20px' },
                        mt: { xs: '20px', md: 0 },
                    }}
                    xs={12}
                    md={6}
                    lg={6}
                >
                    <Box component={'div'}>
                        <span className="text-center w-full block">Or sign in with</span>

                        <div className="grid grid-cols-2 items-center gap-2">
                            <SocialButton title="Facebook" icon={faSquareFacebook} />
                            <SocialButton title="Google" background="#0D9488" icon={faSquareGooglePlus} />
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </ContainerContent>
    );
}
