'use client';

/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import UserContext from './UserContext';

export default function UserState({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState('vikas');
  // const contextValue = useMemo(() => {
  //   const data = {
  //     name: 'vikas',
  //     email: 'vika@gmail.com',
  //   };
  //   return data;
  // }, []);

  return (
    <UserContext.Provider value={{ name }}>{children}</UserContext.Provider>
  );
}
