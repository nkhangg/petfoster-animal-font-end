import {
    ApiGetAddresses,
    ApiGetAddressesById,
    ApiGetCurUser,
    ApiGetDefaultAddress,
    ApiHandleAddresses,
    ApiLogin,
    ApiRefreshVerifyCode,
    ApiRegister,
    ApiResetPassword,
    ApiUpdateCurUser,
    ApiVerifyCode,
    DataRequestUpdateUser,
} from '@/configs/types';
import axios from '../configs/axios';
import { setTokenToCookie } from '@/utils/cookie';
import { IInfoAddress, IProfile } from '@/configs/interface';
import { dataURLtoFile } from '@/utils/format';
import moment from 'moment';

export const login: ApiLogin = async (data) => {
    const res = await axios({
        method: 'POST',
        url: 'login',
        data,
    });

    if (!res) return null;

    setTokenToCookie(res?.data.token);
    return res?.data;
};
export const register: ApiRegister = async (data) => {
    const res = await axios({
        method: 'POST',
        url: 'register',
        data,
    });

    if (!res) return null;

    return res?.data;
};

export const curUser: ApiGetCurUser = async () => {
    const res = await axios({
        method: 'GET',
        url: 'user/profile',
    });

    if (!res) return null;

    return res?.data;
};

export const updateUser: ApiUpdateCurUser = async (data: DataRequestUpdateUser) => {
    console.log(data, { ...data, gender: data.gender === 'Male', avartar: data.avatar ? dataURLtoFile(data.avatar) : null, birthday: moment(data.birthday).format('D/MM/yyyy') });
    const res = await axios({
        method: 'POST',
        url: 'user/profile',
        headers: {
            'content-type': 'multipart/form-data',
        },
        data: {
            ...data,
            gender: data.gender === 'Male',
            avartar: data.avatar ? dataURLtoFile(data.avatar) : null,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const resetPassword: ApiResetPassword = async (email: string) => {
    const res = await axios({
        method: 'POST',
        url: 'forgot-password',
        data: {
            email,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const verifyCode: ApiVerifyCode = async (code: string) => {
    const res = await axios({
        method: 'GET',
        url: '/verify',
        params: {
            code,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const refreshVerifyCode: ApiRefreshVerifyCode = async (code: string) => {
    const res = await axios({
        method: 'GET',
        url: 'refresh-code',
        params: {
            code,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const getDefaultAddress: ApiGetDefaultAddress = async () => {
    const res = await axios({
        method: 'GET',
        url: 'user/addresses/default',
    });

    if (!res) return null;

    return res?.data;
};

export const getAddressesById: ApiGetAddressesById = async (id: number) => {
    const res = await axios({
        method: 'GET',
        url: 'user/addresses/' + id,
    });

    if (!res) return null;

    return res?.data;
};

export const getAddresses: ApiGetAddresses = async () => {
    const res = await axios({
        method: 'GET',
        url: 'user/addresses',
    });

    if (!res) return null;

    return res?.data;
};

export const addAddress: ApiHandleAddresses = async (data: IInfoAddress) => {
    const res = await axios({
        method: 'POST',
        url: 'user/addresses',
        data: {
            ...data,
            setDefault: data.isDefault,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const deleteAddress: ApiHandleAddresses = async (data: IInfoAddress) => {
    const res = await axios({
        method: 'DELETE',
        url: 'user/addresses/' + data.id,
    });

    if (!res) return null;

    return res?.data;
};

export const updateAddress: ApiHandleAddresses = async (data: IInfoAddress) => {
    const res = await axios({
        method: 'PUT',
        url: 'user/addresses/' + data.id,
        data: {
            ...data,
            setDefault: data.isDefault,
        },
    });

    if (!res) return null;

    return res?.data;
};
