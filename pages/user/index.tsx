import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useAuthenticated from '../../hooks/useAuthenticated';
import withSession from '../../lib/withSession';
import { fetchTasksAsync } from '../../store/slices/taskSlice'
import { deleteUserAsync, fetchUsersAsync, usersSelector } from '../../store/slices/usersSlice'
import { RootState } from '../../store/store'

function UsersComponent(user: any) {
	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(fetchUsersAsync());
		dispatch(fetchTasksAsync());
	}, [dispatch]);

	// useEffect(() => {
	// 	if (!isAuthenticated) {
	// 		router.push('/login');
	// 	}
	// }, [isAuthenticated, router]);

	const users = useSelector((state: RootState) => usersSelector(state.users));

	const deleteUser = (id: string) => {
		dispatch(deleteUserAsync(id));
	}

	// eslint-disable-next-line react/display-name
	const EditButton = React.forwardRef<HTMLAnchorElement, any>(({ onClick, href }, ref) => {
		return (
			<a href={href} onClick={onClick} ref={ref} className='w-4'>
				<FontAwesomeIcon icon={faEdit} className="btn edit" title="Edit user" />
			</a>
		)
	})


	return (
		<div className='flex flex-col items-center justify-center p-4 bg-white rounded'>
			<h1 className='text-xl'>User List</h1>
			<div className="m-2">
				<Link href={{ pathname: `/user/new` }} passHref>
					<button className="p-1 border-2 border-blue-300 rounded hover:border-blue-800 w-max">Add new</button>
				</Link>
				<table className='mt-5'>
					<thead>
						<tr>
							<th>User Name</th>
							<th>Phone</th>
							<th>Email</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user =>
							<tr key={user.id}>
								<td>{user.name}</td>
								<td>{user.phone}</td>
								<td>{user.email}</td>
								<td width="100px" >
									<div className="flex items-center justify-center space-x-2">
										<Link href={{ pathname: `/user/${user.id}` }} passHref>
											<EditButton />
										</Link>
										<button className='w-4'>
											<FontAwesomeIcon icon={faTrash} className="btn delete" title="Delete user" onClick={() => deleteUser(user.id)} />
										</button>
									</div>
								</td>
							</tr>)}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default UsersComponent

export const getServerSideProps = withSession(async ({ req, res }: any) => {
	const user = req.session.get("user");

	if (user === undefined) {
		res.setHeader("location", "/login");
		res.statusCode = 302;
		res.end();
		return { props: {} };
	}

	return {
		props: { user: req.session.get("user") },
	};
});
