/* eslint-disable no-promise-executor-return */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { RiEyeCloseFill, RiEyeFill } from 'react-icons/ri';
import { useContext, useState } from 'react';
import UserContext from '@/context/UserContext';
import { Toaster } from 'react-hot-toast';

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

type FormFields = z.infer<typeof schema>;

export default function SignIn() {
  // @ts-ignore
  const { signIn } = useContext(UserContext);
  const [toggleEye, setToggleEye] = useState(false);
  const {
    register,
    handleSubmit,
    // setError,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<FormFields> = async (data) => signIn(data);

  // const onSubmit: SubmitHandler<FormFields> = async (data) => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     console.log(data);
  //     reset();
  //   } catch (e) {
  //     setError('root', {
  //       message: 'Something went wrong please try again later!',
  //     });
  //   }
  // };
  return (
    <section className="min-h-screen font-Poppins">
      <h1 className="text-3xl text-center font-bold mt-10">Sign In</h1>

      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className="max-w-lg rounded glass outline p-5 mt-10 mx-auto"
      >
        <div className="grid gap-3 mb-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              className="input input-bordered text-[1.2rem]"
              type="email"
              name="email"
              placeholder="Enter email"
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message as string}</p>
            )}
          </div>
        </div>
        <div className="grid gap-3 relative">
          <label htmlFor="password">Password</label>
          <input
            {...register('password')}
            name="password"
            type={toggleEye ? 'text' : 'password'}
            placeholder="Enter password"
            className="textarea input-bordered text-[1.2rem]"
          />
          {errors?.password && (
            <p className="text-red-500">
              {errors?.password?.message as string}
            </p>
          )}
          {toggleEye ? (
            <RiEyeFill
              onClick={() => setToggleEye((prev) => !prev)}
              className="cursor-pointer absolute right-3 bottom-5"
            />
          ) : (
            <RiEyeCloseFill
              onClick={() => setToggleEye((prev) => !prev)}
              className="cursor-pointer absolute right-3 bottom-5"
            />
          )}
        </div>
        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-lg btn-ghost w-full  mt-5 btn-outline text-[1.2rem]"
          >
            {isSubmitting ? 'Loading...' : 'Sign In'}
          </button>
        </div>
        {errors?.root && (
          <p className="text-red-500">{errors?.root?.message}</p>
        )}
        <p className="text-lg mt-5">
          Not a User ?
          {' '}
          <span>
            <Link href="/pages/signup" className="font-[700]">
              Sign Up
            </Link>
          </span>
        </p>
      </form>
      <Toaster />
    </section>
  );
}
