import { ICart, IDistrict, IDistrictOutside, IProvinceOutside, IProvinces, IWardOutside } from '@/configs/interface';
import { ApiGetShippingFee, DataFormShippingFee } from '@/configs/type-ousite';
import { AddressCodeType, ApiDistrictOutside, ApiProvinces, ApiProvincesOutside, ApiWardOutside } from '@/configs/types';
import { contants } from '@/utils/contants';
import { replaceValidDistrich } from '@/utils/format';
import axios from 'axios';

// address

export const getProvinces: ApiProvinces<IProvinces[]> = async (data?: string | number) => {
    const res = await axios({
        method: 'GET',
        url: contants.apis.provinces,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res) return null;

    return res?.data;
};

export const searchProvinces: ApiProvincesOutside = async (data?: string | number) => {
    const res = await axios({
        method: 'GET',
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province',
        headers: {
            'Content-Type': 'application/json',
            token: contants.apis.ghn.token,
        },
    });

    if (!res) return null;

    if (res?.data?.data) {
        return res?.data?.data.find((item: IProvinceOutside) => {
            return data && item.NameExtension.includes(data as string);
        });
    }

    return null;
};

export const getDistrichts: ApiProvinces<IProvinces> = async (data?: string | number) => {
    const res = await axios({
        method: 'GET',
        url: contants.apis.districts(data || 0),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res) return null;

    return res?.data;
};

export const searchDistrichts: ApiDistrictOutside = async (data: IProvinceOutside, district: string) => {
    const res = await axios({
        method: 'GET',
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district',
        headers: {
            'Content-Type': 'application/json',
            token: contants.apis.ghn.token,
        },
        params: {
            province_id: data.ProvinceID,
        },
    });

    if (!res) return null;

    if (res?.data.data) {
        return res?.data.data.find((item: IDistrictOutside) => {
            return item.NameExtension.includes(district);
        });
    }

    return null;
};

export const getWards: ApiProvinces<IDistrict> = async (data?: string | number) => {
    const res = await axios({
        method: 'GET',
        url: contants.apis.wards(data || 0),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!res) return null;

    return res?.data;
};

export const searchWards: ApiWardOutside = async (data: IDistrictOutside, ward: string) => {
    const res = await axios({
        method: 'GET',
        url: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward',
        headers: {
            'Content-Type': 'application/json',
            token: contants.apis.ghn.token,
        },
        params: {
            district_id: data.DistrictID,
        },
    });

    if (!res) return null;

    if (res?.data.data) {
        return res?.data.data.find((item: IWardOutside) => {
            return item.NameExtension.includes(ward);
        });
    }

    return null;
};

export const getShippingFee = async (
    data: AddressCodeType,
    totalAndWeight: {
        value: number;
        weight: number;
        quantity: number;
    },
) => {
    const res = await axios({
        method: 'POST',
        url: contants.apis.ghn.shippingFee,
        headers: {
            'Content-Type': 'application/json',
            token: contants.apis.ghn.token,
            shopId: contants.apis.ghn.clientId,
        },
        data: {
            service_id: 53320,
            service_type_id: null,
            to_district_id: data.district,
            to_ward_code: data.ward,
            weight: totalAndWeight.weight,
            insurance_value: 0,
            coupon: null,
        },
    });

    if (!res) return null;

    if (res?.data.data) {
        return res?.data.data.total;
    }

    return null;
};
