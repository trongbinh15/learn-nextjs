import Link from 'next/link'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticatedSelector, logoutAsync, usernameSelector } from '../store/slices/authSlice';
import { RootState } from '../store/store';

function NavBar() {
	const dispatch = useDispatch();
	const router = useRouter();

	const isAuthenticated = useSelector((state: RootState) => isAuthenticatedSelector(state.auth));
	const userName = useSelector((state: RootState) => usernameSelector(state.auth));

	useEffect(() => {
		if (isAuthenticated === false) {
			router.push('/login');
		}
	}, [isAuthenticated, router])

	const logoutHandler = () => {
		dispatch(logoutAsync());
	}

	return (
		<nav className='flex justify-between mb-4 bg-white rounded'>
			<ul className="sticky top-0 flex p-5 space-x-5">
				<li className="text-base font-medium text-gray-500 hover:text-gray-900">
					<Link href='/'>Home</Link>
				</li>
				<li className="text-base font-medium text-gray-500 hover:text-gray-900">
					<Link href='/user'>User</Link>
				</li>
			</ul>
			<div>
				{userName !== '' ? <span>{userName}</span> : ''}
				{isAuthenticated ? <button className="p-5 text-base font-medium" onClick={logoutHandler}>Logout</button> : ''}
			</div>
		</nav >
	)
}

export default NavBar;