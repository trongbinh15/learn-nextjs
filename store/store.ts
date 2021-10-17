import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './slices/usersSlice';
import tasksReducer from './slices/taskSlice';
import baseSlice from './slices/baseSlice';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import authSlice from './slices/authSlice';


const bindMiddleware = (middleware: any[]) => {
	if (process.env.NODE_ENV !== 'production') {
		return composeWithDevTools(applyMiddleware(...middleware))
	}
	return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
	users: usersReducer,
	tasks: tasksReducer,
	base: baseSlice,
	auth: authSlice
});


const reducer = (state: any, action: any) => {
	if (action.type === HYDRATE) {

		let users = action.payload.users;
		let tasks = action.payload.tasks;

		if (state.users.users.length !== 0) {
			users = state.users;
		}

		if (state.tasks.tasks.length !== 0) {
			tasks = state.tasks;
		}

		const nextState = {
			...state, // use previous state
			...action.payload, // apply delta from hydration
			users,
			tasks
		}

		return nextState;

	} else {
		return combinedReducer(state, action)
	}
}

let store: any;

function initStore() {
	store = createStore(reducer, bindMiddleware([thunkMiddleware]));
	return store;
}

// // Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper(initStore, { debug: true });


