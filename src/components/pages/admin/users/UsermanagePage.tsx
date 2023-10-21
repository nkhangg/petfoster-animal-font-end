'use client';
import { deleteUser, usersManage } from '@/apis/admin/user';
import { Comfirm, Pagination, SekeletonTableItems } from '@/components';
import { DashboardCard } from '@/components/dashboard';
import { links } from '@/datas/links';
import { productManageListData } from '@/datas/product-manage-data';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { pushNoty } from '@/redux/slice/appSlice';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Box, Button, Grid, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const listHead = ['No', 'Avartar', 'Username', 'Fullname', 'Email', 'Gender', 'Phone', 'Role'];

export interface IUserManagePageProps {}

export default function UserManagePage(props: IUserManagePageProps) {
    const searchParam = useSearchParams();
    const prevPage = searchParam.get('page');
    const page = prevPage ? parseInt(prevPage) - 1 : 0;
    const baseUrl = links.admin + 'users?page=';

    const [openComfirm, setOpenComfirm] = useState({ open: false, comfirm: 'cancel' });
    const [loading, setLoading] = useState(false);

    const [idDelete, setIdDelete] = useState('');
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['userManagePage/users', page],
        queryFn: () => usersManage(page),
    });

    if (error) {
        dispatch(
            pushNoty({
                title: `Something went wrong. Can't get data !`,
                open: true,
                type: 'error',
            }),
        );

        return;
    }

    const handleDeleteUser = (id: string) => {
        setOpenComfirm({ ...openComfirm, open: true });
        setIdDelete(id);
    };
    return (
        <DashboardCard
            title="List users"
            action={
                <>
                    <Button>
                        <Link href={'/admin/dashboard/users/create'}>Create</Link>
                    </Button>
                </>
            }
        >
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                    <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                        <Table
                            aria-label="simple table"
                            sx={{
                                whiteSpace: 'nowrap',
                                mt: 2,
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    {listHead.map((item) => {
                                        return (
                                            <TableCell key={item}>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {item}
                                                </Typography>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.data.data &&
                                    !isLoading &&
                                    data?.data.data.map((item, index) => {
                                        return (
                                            <TableRow key={item.id} hover>
                                                <TableCell>
                                                    {/* no */}
                                                    <Typography
                                                        sx={{
                                                            fontSize: '15px',
                                                            fontWeight: '500',
                                                        }}
                                                    >
                                                        {index + 1}
                                                    </Typography>
                                                </TableCell>
                                                {/* avatart */}
                                                <TableCell align="left">
                                                    <Avatar src={item.avatar} variant="rounded" />
                                                </TableCell>

                                                {/* username */}
                                                <TableCell>
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.username}
                                                    </Typography>
                                                </TableCell>

                                                {/* fullname */}
                                                <TableCell align="left">
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.fullname}
                                                    </Typography>
                                                </TableCell>
                                                {/* email */}
                                                <TableCell align="left">
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.email}
                                                    </Typography>
                                                </TableCell>
                                                {/* gender */}
                                                <TableCell align="left">
                                                    <Typography color="textSecondary" variant="subtitle2" maxWidth={'200px'} fontWeight={400} className="truncate">
                                                        {item.gender ? 'Male' : 'Female'}
                                                    </Typography>
                                                </TableCell>
                                                {/* phone */}
                                                <TableCell align="center">{item.phone || 'Not yet'}</TableCell>
                                                {/* role */}
                                                <TableCell align="center">{item.role === '0' ? 'ROLE_USER' : item.role}</TableCell>

                                                <TableCell align="center">
                                                    <Button onClick={() => handleDeleteUser(item.id as string)}>
                                                        <FontAwesomeIcon className="text-red-400" icon={faTrash} />
                                                    </Button>
                                                    <Button>
                                                        <Link href={'/admin/dashboard/product/edit/' + item.id}>
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                {/* loading */}
                                {isLoading && <SekeletonTableItems />}
                            </TableBody>
                        </Table>

                        <Box pb={'4%'}>
                            {/* loading */}
                            {data?.data && data.data.pages > 1 && <Pagination baseHref={baseUrl} pages={data.data.pages} />}

                            {isLoading && <Skeleton variant="text" sx={{ fontSize: '1rem' }} />}
                        </Box>
                        <Comfirm
                            title={'Comfirm delete user'}
                            open={openComfirm.open}
                            setOpen={setOpenComfirm}
                            onComfirm={async (value) => {
                                if (value.comfirm === 'ok' && idDelete !== '') {
                                    try {
                                        setLoading(true);
                                        const response = await deleteUser(idDelete);
                                        setLoading(false);
                                        if (response.errors) {
                                            dispatch(
                                                pushNoty({
                                                    title: `Can't delete this product. try again`,
                                                    open: true,
                                                    type: 'error',
                                                }),
                                            );
                                            return;
                                        }
                                        refetch();
                                        if (page && data?.data.pages && page > data?.data.pages - 1) {
                                            router.push(links.admin + 'product');
                                        }
                                        dispatch(
                                            pushNoty({
                                                title: `${idDelete} deleted`,
                                                open: true,
                                                type: 'success',
                                            }),
                                        );
                                        return;
                                    } catch (error) {
                                        setLoading(false);
                                        dispatch(
                                            pushNoty({
                                                title: `Can't delete this product. try again`,
                                                open: true,
                                                type: 'error',
                                            }),
                                        );
                                    }
                                }
                            }}
                        />
                    </Box>
                </Grid>
            </Grid>
        </DashboardCard>
    );
}