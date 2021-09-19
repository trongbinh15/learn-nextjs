import axios from 'axios'
import { GetStaticProps } from 'next'
import React from 'react'
import { baseAPI } from '../../constant'
import { User } from '../../model/user.model'

type Prop = {
	users: User[]
}

function UsersComponent(props: Prop) {
	return (
		<div className="flex flex-col justify-start items-center bg-white rounded p-4 h-full">
			<h1 className="text-2xl m-5 text-gray-500">Users Page</h1>
			<div className="flex justify-center items-center border-4 border-gray-200 rounded p-3 overflow-auto w-3/4">
				<table className="table-auto border-collapse w-full">
					<thead>
						<tr>
							<th className="text-left">Name</th>
							<th className="text-left">Email</th>
							<th className="text-left">Phone</th>
							<th className="text-center">Action</th>
						</tr>
					</thead>
					<tbody>
						{props.users.map((user: User) => (
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.email}</td>
								<td>{user.phone}</td>
								<td className="items-center"><button>Delete</button></td>
							</tr>))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const res = await axios.get<User[]>(baseAPI + '/users');
	if (!res.data) {
		return {
			notFound: true,
		}
	}
	return {
		props: { users: res.data },
		revalidate: 1,
	}
}

export default UsersComponent

