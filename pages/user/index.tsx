import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasksAsync } from '../store/slices/taskSlice'
import { deleteUserAsync, fetchUsersAsync, usersSelector } from '../store/slices/usersSlice'
import { RootState } from '../store/store'

function UsersComponent() {

	const dispatch = useDispatch();
	const router = useRouter();

	useEffect(() => {
		dispatch(fetchUsersAsync());
		dispatch(fetchTasksAsync());
	}, [dispatch]);

	const users = useSelector((state: RootState) => usersSelector(state.users));

	const deleteUser = (id: string) => {
		dispatch(deleteUserAsync(id));
	}

	return (
		<>
			<h1>User List</h1>
			<div className="user-list">
				<div className="add-new">
					<Link href='/new' passHref>
						<button className="btn">Add new</button>
					</Link>
				</div>
				<table>
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
									<div className="action-group">
										<Link href={`/${user.id}`} passHref>
											<FontAwesomeIcon icon={faEdit} className="btn edit" title="Edit user" />
										</Link>
										<FontAwesomeIcon icon={faTrash} className="btn delete" title="Delete user" onClick={() => deleteUser(user.id)} />
									</div>
								</td>
							</tr>)}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default UsersComponent

