import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import '@mantine/dates/styles.css';
import 'mantine-react-table/styles.css'; //import MRT styles
import '@mantine/spotlight/styles.css';
import '@mantine/carousel/styles.css';
import './globals.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress } from '@mantine/nprogress';
import QueryClientProvider from '@/components/layouts/QueryClientProvider';
import { ModalsProvider } from '@mantine/modals';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import SessionProvider from '@/components/layouts/SessionProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Shop NextJS',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <NextTopLoader color='#1677ff' showSpinner={false} />
          <ModalsProvider>
            <QueryClientProvider>
              <NavigationProgress />
              <Notifications limit={5} position='bottom-right' autoClose={3000} />
              <SessionProvider session={session}>{children}</SessionProvider>
            </QueryClientProvider>
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
