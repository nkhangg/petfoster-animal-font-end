'use client';
import { BoxPost, BoxPostHighlight, InfinityPosts, LoadingSecondary, Post, PostDialog, PrimaryPostButton, SearchInput } from '@/components';
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { delay } from '@/utils/funtionals';
import { addPreviousUrl } from '@/utils/session';
import { usePathname, useRouter } from 'next/navigation';
import { links } from '@/datas/links';
import { useAppSelector } from '@/hooks/reduxHooks';
import { RootState } from '@/configs/types';
import { useQuery } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { hightlightPost } from '@/apis/posts';
export interface IArableSnapshotsPageProps {}

export default function ArableSnapshotsPage(props: IArableSnapshotsPageProps) {
    const pathname = usePathname();
    const router = useRouter();

    const [search, setSearch] = useState('');

    const rawData = useQuery({
        queryKey: ['boxPostHighlight'],
        queryFn: () => {
            return hightlightPost({});
        },
    });

    const data = useMemo(() => {
        if (rawData.data?.errors || !rawData.data?.data) return [];

        return rawData.data.data;
    }, [rawData]);

    //redux
    const { user } = useAppSelector((state: RootState) => state.userReducer);

    // modals state
    const [openPostModal, setOpenPostModal] = useState(false);

    const handleOpenPostModal = () => {
        if (!user) return handleNonLogin();
        setOpenPostModal(true);
    };

    const handleNonLogin = () => {
        addPreviousUrl(pathname);
        router.push(links.auth.login);
    };

    if (rawData.isError || rawData.data?.errors) {
        notFound();
    }

    return (
        <div className="pt-12">
            <div className="flex flex-col md:flex-row md:gap-0 gap-5 items-center justify-between mb-10">
                <PrimaryPostButton onClick={handleOpenPostModal} hover="up" title="New Post" size="md" variant="rouded-fill" />
                <form
                    onSubmit={(e) => {
                        e.preventDefault();

                        router.push(links.adorables.search + `?q=${search}`);
                    }}
                    className="w-full md:w-2/3 lg:w-1/3"
                >
                    <SearchInput
                        className="bg-[#F7F7F7] py-[15px] px-6 border-[#D6D6D6]"
                        classNameInput="bg-inherit placeholder:text-sm text-sm"
                        defaultStyle={false}
                        placeholder="Interested in..."
                        variant="circle"
                        value={search}
                        handleChange={(e) => setSearch(e.target.value)}
                        handleClose={() => setSearch('')}
                    />
                </form>
            </div>

            <BoxPostHighlight data={data} title="HIGHLIGHT POSTS" />

            <BoxPost title="OTHER POSTS" className="mt-20">
                <InfinityPosts />
            </BoxPost>

            {openPostModal && <PostDialog open={openPostModal} setOpen={setOpenPostModal} />}
        </div>
    );
}
