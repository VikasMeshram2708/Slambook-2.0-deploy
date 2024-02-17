/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-promise-executor-return */

'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import UserContext, { InitialSlamsType, SlamsInputType, UserInputType } from './UserContext';
import { sampleSlams } from './SampleSlam';

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
  const [initialSlams, setInitialSlams] = useState<InitialSlamsType[]>(sampleSlams);
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
        message: 'User loggin in failed please try again later!',
      });
    }
  };

  const signUp = async (param: UserInputType) => {
    try {
      console.log('signin-param', param);
      const response = await fetch('/api/signup', {
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
      toast.success(result.message);
      return await new Promise(() => {
        setTimeout(() => {
          router.push('/pages/signin');
        }, 3000);
      });
    } catch (e) {
      return setError('root', {
        message: 'User Registration failed please try again later.',
      });
    }
  };

  const handleDelete = (slamId: number) => {
    console.log('deleted-slam', slamId);
    const deletables = initialSlams?.filter((item) => item?.id === slamId);
    console.log('deletabled-slam', deletables);
    const filteredItems = initialSlams.filter((item) => item.id !== slamId);
    setInitialSlams(filteredItems);
    return filteredItems;
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
    <UserContext.Provider
      value={{
        name,
        signIn,
        storeSlams,
        signUp,
        handleDelete,
        initialSlams,
      }}
    >
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
