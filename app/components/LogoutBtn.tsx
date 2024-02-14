'use client';

import React from 'react';

export default function LogoutBtn() {
  const handleLogout = async () => {
    const response = await fetch('http://localhost:3000/api/logout');
    const result = await response.json();
    console.log(result);
    await new Promise(() => {
      window.location.reload();
    });
  };
  return (
    <button
      onClick={handleLogout}
      type="button"
      className="btn btn-info btn-outline text-white font-[700] text-[1.2rem]"
    >
      Logout
    </button>
  );
}
