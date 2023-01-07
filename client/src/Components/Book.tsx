/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BookBody from '../Interfaces/BookBody';

const Book = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');

  const [updateBtn, setUpdateBtn] = useState(false);
  const [alertBadge, setAlertBadge] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  const [updatorId, setUpdatorId] = useState<number>();

  const [items, setItems] = useState<BookBody[]>([]);

  const msg201 = 'Your New Slam Was Successfully Added...';
  const delMsg = 'Your  Slam Was Successfully Deleted...';
  const updatedMsg = 'Your Slam Was Successfully Updated...';

  const handleBookForm = useCallback(
    async (event: React.SyntheticEvent) => {
      event.preventDefault();
      if (title.length === 0) return;
      if (description.length === 0) return;
      if (tag.length === 0) return;
      const data = {
        title,
        tag,
        description,
      };
      // console.log(data);
      const response = await fetch('/api/slams/createSlam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authToken: localStorage.getItem('authToken') as string,
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      if (response.status === 201) {
        setAlertBadge(true);
        setAlertMsg(msg201);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    },
    [title, tag, description]
  );

  // fetch my slams
  const getMySlam = async () => {
    const response = await fetch('/api/slams/mySlams', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authToken: localStorage.getItem('authToken') as string,
      },
    });
    const json = await response.json();
    // console.log(json);
    setItems(json);
  };

  // Update My Slam
  const updateMySlam = async () => {
    const response = await fetch(`api/slams/updateSlam/${updatorId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authToken: localStorage.getItem('authToken') as string,
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json();
    console.log(json);
    if (response.status === 201) {
      setAlertBadge(true);
      setAlertMsg(updatedMsg);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  useEffect(() => {
    getMySlam();
    // removeMySlam();
    if (!localStorage.getItem('authToken')) {
      navigate('/');
    }
  }, []);

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
        onSubmit={handleBookForm}
        className='mt-5 container p-4 p-md-5 border rounded-3 bg-light'
      >
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='title'
            value={title}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setTitle(event.currentTarget.value);
            }}
            placeholder='title'
          />
          <label htmlFor='floatingInput'>Title</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='description'
            value={description}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setDescription(event.currentTarget.value);
            }}
            placeholder='description'
          />
          <label htmlFor='floatingInput'>Description</label>
        </div>
        <div className='form-floating mb-3'>
          <input
            type='text'
            className='form-control'
            id='tag'
            value={tag}
            onChange={(event: React.FormEvent<HTMLInputElement>) => {
              setTag(event.currentTarget.value);
            }}
            placeholder='tag'
          />
          <label htmlFor='floatingPassword'>Tag</label>
        </div>
        {!updateBtn ? (
          <button className='w-100 btn fs-3 rounded btn-primary' type='submit'>
            Add to Book
          </button>
        ) : (
          <button
            onClick={updateMySlam}
            className='w-100 btn fs-3 rounded btn-primary'
            type='button'
          >
            Update My Slam
          </button>
        )}
        <hr className='my-4' />
      </form>
      <div className='container mt-4'>
        <div className='row row-cols-1 row-cols-md-2 g-4'>
          {items.map((currElem) => {
            // console.log('elem', currElem.title);
            return (
              <div className='col' key={currElem._id}>
                <div className='card'>
                  <div className='card-body'>
                    <h5 className='card-title'>{currElem.title}</h5>
                    <hr />
                    <p className='card-text'>{currElem.description}</p>
                    <hr />
                    <button
                      onClick={async () => {
                        // setDeleteId(currElem._id);
                        const respnose = await fetch(
                          `api/slams/deleteMySlam/${currElem._id}`,
                          {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                              authToken: localStorage.getItem(
                                'authToken'
                              ) as string,
                            },
                          }
                        );
                        const json = await respnose.json();
                        console.log(json);
                        if (json.message === 'Success') {
                          setAlertBadge(true);
                          setAlertMsg(delMsg);
                          setTimeout(() => {
                            window.location.reload();
                          }, 2000);
                        }
                      }}
                      type='button'
                      className='btn btn-sm fs-4 rounded btn-danger'
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setUpdateBtn(true);
                        setTitle(currElem.title);
                        setDescription(currElem.description);
                        setTag(currElem.tag);
                        setUpdatorId(currElem._id);
                      }}
                      type='button'
                      className='mx-2 btn btn-sm fs-4 rounded btn-success'
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Book;
