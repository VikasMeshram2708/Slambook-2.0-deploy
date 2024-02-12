'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Hero() {
  const router = useRouter();
  const handleRedirect = () => {
    router.push('/pages/explore');
  };
  return (
    <div className="items-center font-Poppins">
      <div className="flex items-center p-5 gap-10 max-w-[90%] justify-center mx-auto">
        <article className="prose">
          <h1 className="text-center font-Dancing">
            Welcome to
            {' '}
            <span className="text-primary"> Slambook</span>
          </h1>
          <p className="text-[1.1rem] max-w-4xl text-center">
            Welcome to Slambook, the platform where you can document and pursue
            your dreams, aspirations, and future ambitions. Explore a world of
            possibilities and plan your journey towards a brighter future.
          </p>
          <div className="flex gap-2 justify-center">
            <button onClick={handleRedirect} type="button" className="btn btn-primary">
              Explore More
            </button>
            <button type="button" className="btn btn-accent btn-outline">
              Get Started
            </button>
          </div>
        </article>
      </div>
    </div>
  );
}
