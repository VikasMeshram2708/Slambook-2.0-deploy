'use client';

import { createContext } from 'react';

export type UserInputType = {
  name?: String;
  email?: String;
  password?: String;

  signUp?: (param: UserInputType) => void;
  signIn?: (param: UserInputType) => void;
};
const UserContext = createContext<UserInputType | null>(null);

export default UserContext;
