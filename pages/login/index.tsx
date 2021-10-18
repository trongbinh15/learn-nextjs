import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import withSession from '../../lib/withSession';
import { clearAuthenticated, isAuthenticatedSelector, loginAsync, setAuthenticated } from '../../store/slices/authSlice';
import { RootState, wrapper } from '../../store/store';

function Login() {

  const [username, setUsername] = useState('');
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => isAuthenticatedSelector(state.auth));

  const signIn = (e: any) => {
    e.preventDefault();
    dispatch(loginAsync(username));
  }

  const handleChange = (event: any) => {
    setUsername(event.target.value);
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/', undefined, { shallow: true });
    }
  }, [isAuthenticated, router])

  return (
    <div className='flex flex-col items-center justify-center p-4 bg-white rounded'>
      <h1 className='text-xl'>Login</h1>
      <form onSubmit={signIn}>
        <div className='mb-4'>
          <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='username'>
            Username
          </label>
          <input className='w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username' onChange={handleChange} />
        </div>
        <div className='mb-6'>
          <label className='block mb-2 text-sm font-bold text-gray-700' htmlFor='password'>
            Password
          </label>
          <input className='w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='******************' />
        </div>
        <div className='flex items-center justify-between'>
          <input type='submit' className='px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline' value="Sign in" />
        </div>
      </form>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => withSession(async ({ req, res }: any) => {
  const user = req.session.get("user");

  if (user === undefined) {
    store.dispatch(clearAuthenticated());

    return {
      props: {
        user: null
      }
    }

  } else if (user) {
    store.dispatch(setAuthenticated({ isAuthenticated: true, userName: user.login }));

    return {
      props: { user: req.session.get("user") },
    };
  }
}));

export default Login
