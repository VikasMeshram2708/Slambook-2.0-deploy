/* eslint-disable no-console */

'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

type FormFields = {
  name: string;
  email: string;
  message: string;
};

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <section className="min-h-screen font-Poppins">
      <h1 className="text-3xl text-center font-bold my-10">Contact Us</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              {...register('name', {
                required: 'Name is required',
                maxLength: 100,
                minLength: 2,
              })}
              className="input input-bordered text-[1.2rem]"
              type="text"
              name="name"
              placeholder="Enter name"
            />
            {errors?.name && (
              <p className="text-red-500 text-[.95rem]">
                {errors?.name?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              {...register('email', {
                required: 'Email is required',
              })}
              className="input input-bordered text-[1.2rem]"
              type="email"
              name="email"
              placeholder="Enter email"
            />
            {errors?.email && (
              <p className="text-red-500">{errors?.email?.message}</p>
            )}
          </div>
        </div>
        <div className="grid gap-3">
          <label htmlFor="message">Message</label>
          <textarea
            {...register('message', {
              required: 'Message is required',
              maxLength: 100,
            })}
            name="message"
            placeholder="Enter message"
            className="textarea input-bordered text-[1.2rem]"
            rows={4}
          />
          {errors?.message && (
            <p className="text-red-500">{errors?.message?.message}</p>
          )}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-lg btn-ghost  mt-5 btn-outline text-[1.2rem]"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
