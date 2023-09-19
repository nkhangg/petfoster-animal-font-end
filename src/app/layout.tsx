/* eslint-disable @next/next/no-img-element */
import ThemeRegistry from '@/theme/ThemeRegistry';
import type { Metadata } from 'next';
import Favicon from '/public/favicon.ico';
import '../styles/globals.css';
import { Providers } from '@/redux/provider';
import { Container } from '@mui/material';


export const metadata: Metadata = {
    title: 'Home page | Petfoster',
    description: 'Generated by create next app',
    icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <Providers>
                <ThemeRegistry>
                    <body>

                        <Container>{children}</Container>
                        <Footer />
                    </body>
                </ThemeRegistry>
            </Providers>
        </html>
    );
}
