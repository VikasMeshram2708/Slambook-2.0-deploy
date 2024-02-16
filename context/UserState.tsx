/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-promise-executor-return */

'use client';

import { useContext, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import UserContext, { SlamsInputType, UserInputType } from './UserContext';

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, {
      message: 'Minimum length is 6 characters',
    })
    .max(100, {
      message: 'Maximum limit is 100 characters.',
    }),
});

export default function UserState({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [name, setName] = useState('vikas');
  const { setError, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const signIn = async (param: UserInputType) => {
    try {
      console.log('signin-param', param);
      const response = await fetch('/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(param),
      });
      reset();
      const result = await response.json();
      console.log('user-data-reponse', result);
      console.log(param);
      if (!response.ok) {
        return toast.error(result.message);
      }

      setCookie(null, 'sbAuth', JSON.stringify(result.responseData), {
        maxAge: 30 * 60,
        path: '/',
      });
      router.push('/pages/slams');
      return toast.success(result.message);
    } catch (e) {
      return setError('root', {
        message: 'Something went wrong please try again later!',
      });
    }
  };

  const storeSlams = (data: SlamsInputType) => {
    try {
      console.log('stored-slams', data);
      return toast.success('Your slam was successfully stored.');
    } catch (error) {
      return setError('root', {
        message: 'Something went wrong please try again later!',
      });
    }
  };

  return (
    <UserContext.Provider value={{ name, signIn, storeSlams }}>
      {children}
    </UserContext.Provider>
  );
}

// export function useUserContext() {
//   const context = useContext(UserContext);
//   if (!context === undefined) {
//     throw new Error('useUserContext must be used witht a UserStateProvider');
//   }
//   return context;
// }
