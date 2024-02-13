/* eslint-disable no-promise-executor-return */
/* eslint-disable no-console */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Minimum length is 2 characters.',
    })
    .max(50, {
      message: 'Maximum limit is 50 characters.',
    }),
  email: z.string().email(),
  message: z
    .string()
    .min(2, {
      message: 'Minimum length is 2 characters',
    })
    .max(100, {
      message: 'Maximum limit is 100 characters.',
    }),
});

type FormFields = z.infer<typeof schema>;
// type FormFields = {
//   name: string;
//   email: string;
//   message: string;
// };

export default function page() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
      reset();
    } catch (e) {
      setError('root', {
        message: 'Something went wrong please try again later!',
      });
    }
  };
  return (
    <section className="min-h-screen font-Poppins">
      <h1 className="text-3xl text-center font-bold my-10">Contact Us</h1>

      <form
        onSubmit={handleSubmit(onSubmit as any)}
        className="max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              {...register('name')}
              className="input input-bordered text-[1.2rem]"
              type="text"
              name="name"
              placeholder="Enter name"
            />
            {errors?.name && (
              <p className="text-red-500 text-[.95rem]">
                {errors?.name?.message as string}
              </p>
            )}
          </div>
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
        <div className="grid gap-3">
          <label htmlFor="message">Message</label>
          <textarea
            {...register('message')}
            name="message"
            placeholder="Enter message"
            className="textarea input-bordered text-[1.2rem]"
            rows={4}
          />
          {errors?.message && (
            <p className="text-red-500">{errors?.message?.message as string}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-lg btn-ghost  mt-5 btn-outline text-[1.2rem]"
          >
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
        </div>
        {errors?.root && (
          <p className="text-red-500">{errors?.root?.message}</p>
        )}
      </form>
    </section>
  );
}
