/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertBadge, setAlertBadge] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const msg403 = 'Hey, Email is already in use';
  const msg201 = 'User Registered Successfully';

  const handleForm = useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (name.length === 0) return;
      if (email.length === 0) return;
      if (password.length === 0) return;
      const data = {
        name,
        email,
        password,
      };
      //   console.log(data);
      const response = await fetch('/api/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      await response.json();
      // console.log(json);
      if (response.status === 403) {
        setAlertBadge(true);
        setAlertMsg(msg403);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      if (response.status === 201) {
        setAlertBadge(true);
        setAlertMsg(msg201);
        setTimeout(() => {
          navigate('/signIn');
        }, 2000);
      }
    },
    [name, email, password]
  );

  return (
    <>
      {alertBadge ? (
        <div
          className='text-center alert alert-warning alert-dismissible fade show'
          role='alert'
        >
          <strong>{alertMsg}</strong>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='alert'
            aria-label='Close'
          ></button>
        </div>
      ) : (
        ''
      )}
      <form
        onSubmit={handleForm}
        className='mt-5 p-4 p-md-5 border rounded-3 bg-light container'
      >
        <h1 className='form-label'>Sign Up</h1>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setName(event.currentTarget.value);
            }}
            placeholder='name'
          />
          <label htmlFor='floatingInput'>Name</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='email'
            className='form-control'
            id='email'
            value={email}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setEmail(event.currentTarget.value);
            }}
            placeholder='name@example.com'
          />
          <label htmlFor='floatingInput'>Email address</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='password'
            className='form-control'
            id='password'
            value={password}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setPassword(event.currentTarget.value);
            }}
            placeholder='Password'
          />
          <label htmlFor='floatingPassword'>Password</label>
        </div>
        <div className='checkbox mb-3'>
          <Link to='/signIn'>Already a User</Link>
        </div>
        <button className='w-100 btn fs-3 rounded btn-primary' type='submit'>
          Sign up
        </button>
        <hr className='my-4' />
        <small className='text-muted'>
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignUp;
