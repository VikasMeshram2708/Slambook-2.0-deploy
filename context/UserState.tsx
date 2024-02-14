/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-promise-executor-return */

'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import UserContext, { UserInputType } from './UserContext';

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
  const [name, setName] = useState('vikas');
  const { setError, reset } = useForm({
    resolver: zodResolver(schema),
  });
  const signIn = async (param: UserInputType) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(param);
      reset();
    } catch (e) {
      setError('root', {
        message: 'Something went wrong please try again later!',
      });
    }
  };

  return (
    <UserContext.Provider value={{ name, signIn }}>
      {children}
    </UserContext.Provider>
  );
}
