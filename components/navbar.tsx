import Link from 'next/link'
import React from 'react'

function NavBar() {
	return (
		<nav className='mb-4'>
			<ul className="sticky top-0 flex p-5 space-x-5 bg-white rounded">
				<li className="text-base font-medium text-gray-500 hover:text-gray-900">
					<Link href='/'>Home</Link>
				</li>
				<li className="text-base font-medium text-gray-500 hover:text-gray-900">
					<Link href='/user'>User</Link>
				</li>
				<li className="text-base font-medium text-gray-500 hover:text-gray-900">
					<Link href='/task'>Task</Link>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
