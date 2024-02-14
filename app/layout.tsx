import type { Metadata } from 'next';
import './globals.css';
import UserState from '@/context/UserState';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: 'Slambook - Save Your Future Ambitions',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="primary">
      <body>
        <UserState>
          <Navbar />
          {children}
        </UserState>
      </body>
    </html>
  );
}
