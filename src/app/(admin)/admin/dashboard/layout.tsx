/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Favicon from '/public/favicon.ico';
import { DashboardLayout } from '@/components/layouts';

export const metadata: Metadata = {
    title: 'Dashboard | Petfoster',
    description: 'Generated by create next app',
    icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardLayout>{children}</DashboardLayout>
        </>
    );
}