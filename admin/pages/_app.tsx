import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AdminLayout from 'components/layout/AdminLayout';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    </SessionProvider>
  );
}

export default MyApp;
