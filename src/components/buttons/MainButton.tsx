'use client';
import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { CustomButton, WrapperAnimation } from '..';

export interface IMainButtonProps {
    className?: string;
    title: string;
    width?: number | string;
    height?: number | string;
    background?: string;
    href?: string;
}

export default function MainButton({ className, title, width, height, background = 'bg-[#5FA503]', href }: IMainButtonProps) {
    return (
        <WrapperAnimation hover={{ y: -2 }}>
            <CustomButton
                href={href}
                style={width || height ? { width: width, height: height } : undefined}
                className={classNames(' text-1xl font-medium text-white py-[14px] px-8 rounded-md', {
                    [className ?? '']: Boolean(className),
                    'w-[188px]': !Boolean(width),
                    'h-[48px]': !Boolean(height),
                    [background]: true,
                })}
            >
                <span>{title.toUpperCase()}</span>
            </CustomButton>
        </WrapperAnimation>
    );
}
