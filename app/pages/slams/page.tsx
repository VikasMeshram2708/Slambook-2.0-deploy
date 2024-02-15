'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function page() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = {
        title,
        message,
      };
      const response = await fetch('http://localhost:3000/api/slams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log('result-slams', result);
      console.log(data);
      toast.success('ok');
      // setTitle('');
      // setMessage('');
      // await new Promise(() => {
      //   window.location.reload();
      // });
    } catch (error) {
      toast.error(
        error instanceof Error ? error?.message : 'Error while storing salms',
      );
    }
  };
  return (
    <section className="font-Poppins min-h-screen">
      <form onSubmit={handleSubmit} className="card-body max-w-5xl mx-auto">
        <div className="form-control">
          <label className="title text-[1.2rem]">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
            placeholder="Enter title"
            className="input input-bordered mt-3 text-[1.2rem]"
            required
          />
        </div>
        <div className="form-control mt-5">
          <label className="message text-[1.2rem]">Message</label>
          <textarea
            value={message}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
            placeholder="Enter message"
            className="textarea input-bordered mt-3 text-[1.2rem]"
            required
            rows={5}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white text-xl" type="submit">
            Add
          </button>
        </div>
      </form>
      <Toaster />
    </section>
  );
}
