'use client';
import React from 'react';
import { TextFieldProps, TextField as Tx } from '@mui/material';

export default function TextField(props: TextFieldProps) {
    return (
        <Tx
            sx={{
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        border: '1px solid #5FA503', // customized
                    },
                },
                '& .MuiOutlinedInput-root:hover': {
                    '& fieldset': {
                        border: '1px solid #5FA503', // customized
                    },
                },
                '& .MuiFormLabel-root': {
                    color: '#6C6C6C !important',
                    fontSize: '14px !important',
                },
            }}
            {...props}
            variant="outlined"
            fullWidth
        />
    );
}
