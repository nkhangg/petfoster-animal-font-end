import axios from '@/configs/axios';
import { IOrderAdminFillterForm } from '@/configs/interface';
import { ApiGetFilterOrderAdmin, ApiGetOrders } from '@/configs/types';
import Validate from '@/utils/validate';

export const getOrdersAdmin: ApiGetOrders = async () => {
    const res = await axios({
        method: 'GET',
        url: 'admin/orders',
    });

    if (!res) return null;

    return res?.data;
};

export const getOrdersAdminWithFilter: ApiGetFilterOrderAdmin = async (data: IOrderAdminFillterForm) => {
    const res = await axios({
        method: 'GET',
        url: 'admin/orders/filter',
        params: {
            username: !Validate.isNumber(data.search) ? data.search : '',
            status: data.status,
            orderId: Validate.isNumber(data.search) ? data.search : '',
            sort: data.sort,
            maxDate: data.dateEnd,
            minDate: data.dateStart,
        },
    });

    if (!res) return null;

    return res?.data;
};
