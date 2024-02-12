import React from 'react';

export default function page() {
  return (
    <section className="min-h-screen font-Poppins">
      <h1>Contact Us</h1>

      <form className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              className="input input-bordered text-[1.2rem]"
              type="text"
              name="name"
              placeholder="Enter name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="input input-bordered text-[1.2rem]"
              type="text"
              name="email"
              placeholder="Enter email"
            />
          </div>
        </div>
        <div className="grid gap-3">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            placeholder="Enter message"
            className="textarea input-bordered"
            rows={4}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="btn btn-lg btn-ghost  mt-5 btn-outline text-[1.2rem]"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
