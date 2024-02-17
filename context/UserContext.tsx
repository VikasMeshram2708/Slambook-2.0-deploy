'use client';

import { createContext } from 'react';

export type SlamsInputType = {
  id: number;
  title: string;
  message: string;
  User: number;
};

export type InitialSlamsType = {
  id: number;
  title: string;
  description: string;
};

export type UserInputType = {
  name?: String;
  email?: String;
  password?: String;

  signUp?: (param: UserInputType) => void;
  signIn?: (param: UserInputType) => void;
  storeSlams?: (param: SlamsInputType) => void;
  handleDelete?: (param: any) => void;
  initialSlams?: InitialSlamsType[];
};
const UserContext = createContext<UserInputType | null>(null);

export default UserContext;
