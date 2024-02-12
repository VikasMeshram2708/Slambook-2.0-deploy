import React from 'react';

export default function page() {
  return (
    <section className="font-Poppins min-h-screen">
      <form className="card-body max-w-5xl mx-auto">
        <div className="form-control">
          <label className="title text-[1.2rem]">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter title"
            className="input input-bordered mt-3 text-[1.2rem]"
            required
          />
        </div>
        <div className="form-control mt-5">
          <label className="message text-[1.2rem]">
            Message
          </label>
          <textarea
            placeholder="Enter message"
            className="textarea input-bordered mt-3 text-[1.2rem]"
            required
            rows={5}
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary text-white text-xl" type="button">Add</button>
        </div>
      </form>
    </section>
  );
}
