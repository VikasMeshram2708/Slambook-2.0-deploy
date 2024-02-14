'use client';

import { createContext } from 'react';

type User = {
  name?: String;
  email?: String;
  password?: String;

  signup?: () => boolean;
  signin?: () => boolean;
};
const UserContext = createContext<User | null>(null);

export default UserContext;
