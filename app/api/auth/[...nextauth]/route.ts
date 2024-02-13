/* eslint-disable no-console */
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

console.log('gid', process.env.GOOGLE_CLIENT_ID);
console.log('gids', process.env.GOOGLE_CLIENT_SECRET);
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Creds',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter password',
        },
      },
      async authorize(credentials) {
        const res = await fetch('http://localhost:3000/api/signin', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('credentials', credentials);
        const user = await res.json();
        console.log('user', user);
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true;
  //   },
  // },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
