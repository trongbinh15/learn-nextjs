import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../../models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { addUserAsync, updateUserAsync, userByIdSelector } from '../../store/slices/usersSlice';
import { addTaskAsync, deleteTaskAsync, ITask, taskByUserIdSelector, updateTaskAsync } from '../../store/slices/taskSlice';
import { RootState } from '../../store/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';

function UserDetailComponent() {
	const dispatch = useDispatch();
	const nameRef = useRef<HTMLInputElement>(null);
	const phoneRef = useRef<HTMLInputElement>(null);
	const emailRef = useRef<HTMLInputElement>(null);
	const [isNew, setIsNew] = useState(true);
	const router = useRouter();
	const { id } = router.query;
	const user = useSelector((state: RootState) => userByIdSelector(state.users, id as string));
	const tasks = useSelector((state: RootState) => taskByUserIdSelector(state.tasks, id as string));

	useEffect(() => {
		nameRef.current?.focus();
		if (id !== 'new') {
			setIsNew(false);
		} else if (id === 'new') {
			setIsNew(true);
		}
	}, [id])

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const model: IUser = {
			id: isNew ? uuidv4() : user?.id || '',
			email: emailRef.current?.value || '',
			phone: phoneRef.current?.value || '',
			name: nameRef.current?.value || ''
		}

		if (isNew) {
			dispatch(addUserAsync(model));
		} else if (!isNew) {
			dispatch(updateUserAsync(model));
		}

		onBack();
	}

	const onBack = () => {
		router.push('/user');
	}

	const deleteTask = (id: string): void => {
		dispatch(deleteTaskAsync(id));
	}

	const addTask = () => {
		const taskName = prompt('Task:', 'New task');
		const model: ITask = {
			id: uuidv4(),
			name: taskName || '',
			userId: user?.id || ''
		}
		dispatch(addTaskAsync(model));
	}

	const updateTask = (task: ITask) => {
		const taskName = prompt('Task:', task.name);
		const model = { ...task, name: taskName || '' };
		dispatch(updateTaskAsync(model));
	}

	return (
		<div className='container flex flex-col items-center justify-center p-4 bg-white rounded'>
			<h1 className="text-xl">{isNew ? 'Add New User' : 'User Detail'}</h1>
			<div className="m-2">
				<form onSubmit={handleSubmit}>
					<div className="m-2">
						<label htmlFor="name" className="mr-2">
							Name:
						</label>
						<input type="text" defaultValue={user?.name} name="name" ref={nameRef} className='border rounded' />
					</div>

					<div className="m-2">
						<label htmlFor="phone" className='mr-2'>
							Phone:
						</label>
						<input type="text" defaultValue={user?.phone} name="phone" ref={phoneRef} className='border rounded' />
					</div>

					<div className="m-2">
						<label htmlFor="email" className='mr-2'>
							Email:
						</label>
						<input type="text" name="email" defaultValue={user?.email} ref={emailRef} className='border rounded' />
					</div>

					<div className="flex items-center justify-center space-x-2">
						<input type="submit" value="Save" className="p-2 text-center border-2 rounded" />
						<button onClick={onBack} className="p-2 text-center border-2 rounded">Back</button>
					</div>
				</form>
			</div>
			{isNew ? '' :
				<div className='w-1/2 m-2'>
					<table className='w-1/2'>
						<thead>
							<tr>
								<th>Task</th>
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map(task =>
								<tr key={task.id}>
									<td>{task.name}</td>
									<td>
										<div className="flex items-center justify-center space-x-2">
											<button onClick={() => updateTask(task)} className='w-4'>
												<FontAwesomeIcon icon={faEdit} size='sm' title="Edit task" />
											</button>
											<button onClick={() => deleteTask(task.id)} className='w-4'>
												<FontAwesomeIcon icon={faTrash} size='1x' title="Delete task" />
											</button>
										</div>
									</td>
								</tr>)}
						</tbody>
					</table>
					<button className="p-1 border rounded" onClick={() => addTask()}>Add task</button>
				</div>
			}
		</div >
	)
}

export default UserDetailComponent
