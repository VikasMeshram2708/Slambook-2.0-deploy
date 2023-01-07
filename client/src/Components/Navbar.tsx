import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>
            SlamBook 2.0
          </Link>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarColor01'
            aria-controls='navbarColor01'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarColor01'>
            <ul className='navbar-nav me-auto'>
              {localStorage.getItem('authToken') ? (
                <li className='nav-item'>
                  <Link className='nav-link' to='/book'>
                    Book
                  </Link>
                </li>
              ) : (
                ''
              )}
              <li className='nav-item'>
                <Link className='nav-link' to='/about'>
                  About
                </Link>
              </li>
              <li className='nav-item'>
                <Link className='nav-link' to='/contact'>
                  Contact
                </Link>
              </li>
            </ul>
            {!localStorage.getItem('authToken') ? (
              <form className='d-flex'>
                <button
                  className='btn btn-danger rounded my-2 my-sm-0'
                  type='button'
                  onClick={() => {
                    navigate('/signUp');
                  }}
                >
                  Sign Up
                </button>
                <button
                  className='mx-3 btn btn-info rounded my-2 my-sm-0'
                  type='button'
                  onClick={() => {
                    navigate('/signIn');
                  }}
                >
                  Sign In
                </button>
              </form>
            ) : (
              <button
                className='mx-3 btn btn-danger rounded my-2 my-sm-0'
                type='button'
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
