/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [alertBadge, setAlertBadge] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const msg201 = 'User Logged In Successfully';

  const msg403 =
    'Hey, try to login with valid credentails invalid key provided...';

  const msg422 =
    'Hey, try to  login with valid credentials email or password is invalid...';

  const handleForm = useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (email.length === 0) return;
      if (password.length === 0) return;
      const data = {
        email,
        password,
      };
      //   console.log(data);
      const response = await fetch('/api/auth/signIn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      //   console.log(json.token);
      if (response.status === 201) {
        localStorage.setItem('authToken', json.token);
        setAlertBadge(true);
        setAlertMsg(msg201);
        setTimeout(() => {
          navigate('/book');
        }, 2000);
      }
      if (response.status === 403) {
        // alert('');
        setAlertBadge(true);
        setAlertMsg(msg403);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
      if (response.status === 422) {
        // alert('');
        setAlertBadge(true);
        setAlertMsg(msg422);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    [email, password]
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
        <h1 className='form-label'>Sign In</h1>

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
          <Link to='/signUp'>New User</Link>
        </div>
        <button className='w-100 btn fs-3 rounded btn-primary' type='submit'>
          Sign In
        </button>
        <hr className='my-4' />
        <small className='text-muted'>
          By clicking Sign up, you agree to the terms of use.
        </small>
      </form>
    </>
  );
};

export default SignIn;
