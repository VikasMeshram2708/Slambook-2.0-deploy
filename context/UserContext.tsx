'use client';

import { createContext } from 'react';

export type SlamsInputType = {
  id: number;
  title: string;
  message: string;
  User: number;
};

export type UserInputType = {
  name?: String;
  email?: String;
  password?: String;

  signUp?: (param: UserInputType) => void;
  signIn?: (param: UserInputType) => void;
  storeSlams?: (param: SlamsInputType) => void;
};
const UserContext = createContext<UserInputType | null>(null);

export default UserContext;
