'use client';
import { getReviews } from '@/apis/admin/reviews';
import { BoxTitle, LoadingSecondary, RowReview, Table } from '@/components';
import { HeadHistory, SortAdmin } from '@/components/common';
import { IOrderAdminFillterForm, IReviewAdminFillterForm, IRowStatusOrders } from '@/configs/interface';
import { dataHeadReviews } from '@/datas/header';
import { useDebounce } from '@/hooks';
import { contants } from '@/utils/contants';
import { useQuery } from '@tanstack/react-query';

import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const dataHeadTable = ['No', 'Id', 'Product', 'Image', 'Rate', 'Lastest', 'Reviews', 'Non Reviews', 'Action'];
const dataPopup = [
    {
        id: 'rate-asc',
        title: 'Rate asc',
    },
    {
        id: 'rate-desc',
        title: 'Rate desc',
    },
    {
        id: 'review-asc',
        title: 'Review asc',
    },
    {
        id: 'review-desc',
        title: 'Review desc',
    },
    {
        id: 'latest-asc',
        title: 'Latest asc',
    },
    {
        id: 'latest-desc',
        title: 'Latest desc',
    },
];

const iniData = {
    search: '',
    sort: '',
    minStar: '',
    maxStar: '',
};

export interface IReviewManamentPageProps {}

export default function ReviewManamentPage(props: IReviewManamentPageProps) {
    // router
    const router = useRouter();

    // states

    const [filter, setFilter] = useState<IReviewAdminFillterForm>(iniData);

    const searDebounce = useDebounce(filter.search, 600);

    const reviews = useQuery({
        queryKey: ['reviews/getReviews', { ...filter, search: searDebounce }],
        queryFn: () => getReviews({ ...filter, search: searDebounce }),
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFilter({
            ...filter,
            search: e.target.value,
        });
    };

    if (reviews.error) {
        toast.warn(contants.messages.errors.handle);
        router.back();
    }

    const data = reviews.data?.data;

    const dataMemo = useMemo(() => {
        if (!data) return [];
        return data;
    }, [data]);

    return (
        <BoxTitle mt="mt-0" mbUnderline="mb-0" border={false} title="REVIEW  MANAGEMENT" className="">
            <SortAdmin
                searchProps={{
                    handleClose: () => setFilter({ ...filter, search: '' }),
                    handleChange: handleChange,
                    value: filter.search,
                }}
                sortProps={{
                    onValue: (sort) => {
                        setFilter({
                            ...filter,
                            sort: sort.id,
                        });
                    },
                    styles: {
                        minWidth: 'min-w-[150px]',
                    },
                    data: dataPopup,
                    title: 'Sort by',
                }}
            />
            <HeadHistory
                onTab={(tab) => {
                    setFilter({
                        ...filter,
                        maxStar: tab.title === 'All' ? '' : tab.title,
                        minStar: tab.title === 'All' ? '' : parseInt(tab.title) - 1 + '',
                    });
                }}
                styles="border-bottom"
                iniData={dataHeadReviews}
                color="#FCBD18"
            />

            <div className="rounded-xl overflow-hidden border border-gray-primary relative">
                {data && (
                    <Table
                        styleHead={{
                            align: 'center',
                        }}
                        dataHead={dataHeadTable}
                    >
                        {dataMemo.map((item, index) => {
                            return <RowReview key={item.productId} index={index} data={item} />;
                        })}
                    </Table>
                )}
                {data && data.length <= 0 && (
                    <div className="flex items-center justify-center py-5 text-violet-primary">
                        <b>No suitable data found</b>
                    </div>
                )}

                {reviews.isLoading && (
                    <div className="w-full h-full flex items-center justify-center absolute inset-0 bg-[rgba(0,0,0,0.04)]">
                        <LoadingSecondary />
                    </div>
                )}
            </div>
        </BoxTitle>
    );
}