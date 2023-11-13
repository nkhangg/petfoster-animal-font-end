'use client';
import { useDebounce } from '@/hooks';
import Tippy from '@tippyjs/react/headless';
import React, { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState, Ref, FocusEvent, memo } from 'react';
import TextField from '../TextField';
import { IDistrict, IProvinces, IWard } from '@/configs/interface';
import classNames from 'classnames';
import Validate from '@/utils/validate';

export interface IAddressTippyProps {
    data: IProvinces[] | IDistrict[] | IWard[] | undefined | null;
    placeholder?: string;
    messageUndefined?: string;
    initData?: string;
    label?: string;
    name: 'province' | 'district' | 'ward';
    onValue?: (value: IProvinces | IDistrict | IWard | undefined) => void;
    onValidate?: (validateFuc: () => boolean) => void;
}

export default function AddressTippy({ data, placeholder, messageUndefined, initData, name, label, onValue, onValidate }: IAddressTippyProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [value, setValue] = useState(initData || '');
    const [width, setWidth] = useState(0);
    const [error, setError] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const handleClickItem = (item: string) => {
        setValue(item);
        setShowPopup(false);
        setError('');
    };

    const validate = () => {
        const { error, message } = Validate.address(value);

        setError(message);

        return error;
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { error, message } = Validate.address(e.target.value);

        setError(message);
    };

    useEffect(() => {
        if (!ref.current) return;

        setWidth(ref.current.clientWidth);
    }, [ref]);

    useEffect(() => {
        if (!onValue) return;

        if (!data) return;

        const item = data.find((i) => {
            return i.name === value;
        });

        onValue(item);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    useEffect(() => {
        if (data === null || !data) {
            setValue('');
            return;
        }
        if (!onValue) return;

        const item = data.find((i) => {
            return i.name === value;
        });

        onValue(item);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (!initData) return;
        setValue(initData);
    }, [initData]);

    useEffect(() => {
        if (!onValidate) return;

        onValidate(validate);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [validate]);

    const renderData = useCallback(() => {
        if (!data) return <li className="text-center">{messageUndefined || 'Please choose ' + (placeholder && placeholder.toLowerCase())}</li>;

        let curData = [...data];

        if (value.length > 0) {
            curData = data.filter((item) => {
                return item.name.toLowerCase().includes(value.toLowerCase());
            });
        }

        if (!curData.length) {
            return <li className="text-center">No results</li>;
        }

        return curData.map((item) => {
            return (
                <li onClick={() => handleClickItem(item.name)} className={classNames('py-[6px] hover:bg-[rgba(93,135,255,0.08)] px-[14px] text-sm cursor-pointer')} key={item.code}>
                    {item.name}
                </li>
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, data]);
    return (
        <div className="w-full">
            <Tippy
                interactive
                visible={showPopup}
                placement="bottom-start"
                onClickOutside={() => setShowPopup(false)}
                render={(attr) => {
                    return (
                        <div style={{ width: width }} tabIndex={-1} {...attr} className={'h-[240px] bg-white border border-gray-primary rounded py-2'}>
                            <ul
                                className={classNames('scroll overflow-y-auto w-full h-full', {
                                    'flex items-center justify-center': !data,
                                })}
                            >
                                {renderData()}
                            </ul>
                        </div>
                    );
                }}
            >
                <div ref={ref} className="w-full ">
                    <TextField
                        label={label}
                        message={error}
                        autoComplete={name}
                        onBlur={!showPopup ? handleBlur : undefined}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={placeholder}
                        onClick={() => setShowPopup(true)}
                        size="small"
                    />
                </div>
            </Tippy>
        </div>
    );
}
