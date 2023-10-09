'use client';
import { bestSellers } from '@/apis/app';
import { Products } from '@/components';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { takeActionPageData } from '@/datas/take-action';
export default function LogicalTakeAction() {
    const [pageValue, setPageValue] = useState(1);

    const { data, isLoading, error } = useQuery({
        queryKey: ['product', pageValue],
        queryFn: () => bestSellers(pageValue),
    });

    return (
        <>
            <Products
                loading={isLoading}
                data={error ? takeActionPageData.bestSellers.data : data?.data.data || []}
                totalPage={error ? takeActionPageData.bestSellers.pages : data?.data.pages}
                title="BEST SELLERS"
                pagination
                onPage={(page) => {
                    setPageValue(page - 1);
                }}
            />
        </>
    );
}
