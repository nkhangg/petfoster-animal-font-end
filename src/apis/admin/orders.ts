import axios from '@/configs/axios';
import { IOrderAdminFillterForm } from '@/configs/interface';
import { ApiGetDetailFilterOrderAdmin, ApiGetFilterOrderAdmin, ApiGetOrders, ApiUpdateStatusOrder, UpdateStatusOrderType } from '@/configs/types';
import Validate from '@/utils/validate';

export const getOrdersAdmin: ApiGetOrders = async () => {
    const res = await axios({
        method: 'GET',
        url: 'admin/orders',
    });

    if (!res) return null;

    return res?.data;
};

export const getOrdersAdminWithFilter: ApiGetFilterOrderAdmin = async (data: IOrderAdminFillterForm, page: string | null) => {
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
            page: page ? parseInt(page) - 1 : 0,
        },
    });

    if (!res) return null;

    return res?.data;
};

export const getOrdersDetailAdminWithFilter: ApiGetDetailFilterOrderAdmin = async (id: number | undefined) => {
    if (id === 0) return;
    const res = await axios({
        method: 'GET',
        url: 'admin/orders/details/' + id,
    });

    if (!res) return null;

    return res?.data;
};

export const updateStatusOrder: ApiUpdateStatusOrder = async (data: UpdateStatusOrderType) => {
    const res = await axios({
        method: 'POST',
        url: 'admin/orders/status/' + data.id,
        data: {
            status: data.status === 'cancelled' ? 'cancelled_by_admin'.toLocaleUpperCase() : data.status.toLocaleUpperCase(),
            reason: data.reason,
        },
    });

    if (!res) return null;

    return res?.data;
};
