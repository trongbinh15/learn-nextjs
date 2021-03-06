import Head from 'next/head';
import React from 'react'
import { useSelector } from 'react-redux';
import { loadingSelector } from '../store/slices/baseSlice';
import { RootState } from '../store/store';
import NavBar from './navbar';
import Spinner from './spinner';


type Prop = {
	children: any
}

function Layout({ children }: Prop) {
	const loading = useSelector((state: RootState) => loadingSelector(state.base));
	return (
		<div className="relative h-screen p-6">
			<Head>
				<title>My App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavBar />
			<div style={{ height: 'calc(100vh - 128px)' }}>{children}</div>
			{loading && <div className="fixed bottom-0 left-0 flex items-center justify-center w-full h-screen bg-gray-200 opacity-50">
				<Spinner />
			</div>}
		</div >
	)
}

export default Layout;
