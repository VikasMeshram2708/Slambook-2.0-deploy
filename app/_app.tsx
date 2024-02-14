'use client';

import UserState from '@/context/UserState';
import { AppProps } from 'next/app';

export default function UserProvider({ Component, pageProps }: AppProps) {
  return (
    <UserState>
      <Component {...pageProps} />
    </UserState>
  );
}
