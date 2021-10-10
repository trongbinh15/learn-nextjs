import Link from 'next/link'
import React from 'react'
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { logoutAsync } from '../store/slices/authSlice';
import withSession from '../lib/withSession';
import { GithubUserModel } from '../models/user.model';

type Prop = {
	user: GithubUserModel
}

function NavBar(prop: any) {
	const { user } = prop;
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logoutAsync());
		Router.reload();
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
			{user ? <button className="p-5 text-base font-medium" onClick={logoutHandler}>Logout</button> : ''}
		</nav >
	)
}

export default NavBar;