import { ApiBestSellerType, ApiFilterPage, ApiGetUsers, ApiHistory, ApiLogin, ApiPayment, ApiTakeActionType, ApiTypesAndBrands } from '@/configs/types';

import axios from '../configs/axios';
import { setTokenToCookie } from '@/utils/cookie';
import { IDataFormPayment, IDataRequestFilter } from '@/configs/interface';

export const getUsers: ApiGetUsers = async () => {
    const res = await axios({
        method: 'GET',
        url: 'login',
    });

    if (!res) return null;

    return res?.data;
};

export const takeAction: ApiTakeActionType = async () => {
    const res = await axios({
        method: 'GET',
        url: 'take-action',
    });

    if (!res) return null;

    return res?.data;
};

export const bestSellers: ApiBestSellerType = async (page: number | undefined) => {
    const res = await axios({
        method: 'GET',
        url: 'take-action/best-sellers',
        params: {
            page: page || 0,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const otherHistory: ApiHistory = async (page: number | undefined) => {
    const res = await axios({
        method: 'GET',
        url: 'user/order/history',
        params: {
            page: page || 0,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const paymentsApi: ApiPayment = async (data: IDataFormPayment) => {
    const res = await axios({
        method: 'POST',
        url: 'user/order',
        data: {
            ...data,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const typesAndBrands: ApiTypesAndBrands = async () => {
    const res = await axios({
        method: 'GET',
        url: 'product/types-brands',
    });

    if (!res) return null;

    return res?.data;
};

export const filterPage: ApiFilterPage = async (data: IDataRequestFilter) => {
    const res = await axios({
        method: 'GET',
        url: 'filter-product/',
        params: data,
    });

    if (!res) return null;

    return res?.data;
};
