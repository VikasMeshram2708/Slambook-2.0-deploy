import { cookies } from 'next/headers';
import Link from 'next/link';
import LogoutBtn from './LogoutBtn';

export default function Navbar() {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get('sbAuth')?.value;

  return (
    <div className="navbar px-3 bg-base-200">
      <div className="flex-1">
        <Link href="/" className="font-[700] text-[2rem] font-Dancing">
          SlamBook
        </Link>
      </div>
      <div className="flex-none gap-5">
        <ul className="flex text-[1.05rem] items-center gap-3">
          <li>
            <Link href="/pages/explore">Blog</Link>
          </li>
          <li>
            <Link href="/pages/about">About</Link>
          </li>
          <li>
            <Link href="/pages/contact">Contact</Link>
          </li>
        </ul>
        {cookieValue?.length ? (
          <LogoutBtn />
        ) : (
          <button
            type="button"
            className="btn btn-info btn-outline text-white font-[700] text-[1.2rem]"
          >
            <Link href="/pages/signin">Sign In</Link>
          </button>
        )}

        {/* {loggedIn ? (
          <>
            <div className="form-control">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-24 md:w-auto"
              />
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    width={500}
                    height={500}
                    className="rounded-full"
                    alt="Tailwind CSS Navbar component"
                    src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/profile" className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link href="/settings">Settings</Link>
                </li>
                <li>
                  <button type="button">Logout</button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-5">
            <button
              // onClick={handleLogin}
              onClick={() => signIn()}
              type="button"
              className="btn btn-info btn-outline text-white font-[700] text-[1.2rem]"
            >
              Sign In
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}
